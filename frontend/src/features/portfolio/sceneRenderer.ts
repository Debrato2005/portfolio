import {
  sceneArtwork,
  type SceneSettings,
  type SceneTheme,
} from './sceneArtwork';
import { sceneFragmentShader, sceneVertexShader } from './sceneShaders';

type Point = { x: number; y: number };

/** Owns exactly one WebGL context; every allocation/listener has a matching disposer. */
export function createSceneRenderer(
  canvas: HTMLCanvasElement,
  host: HTMLDivElement,
  settings: SceneSettings,
) {
  const dispose: (() => void)[] = [];
  let disposed = false;
  const cleanup = () => {
    disposed = true;
    for (const release of dispose.reverse()) release();
  };
  try {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    if (!gl) throw new Error('WebGL unavailable');
    dispose.push(() => gl.getExtension('WEBGL_lose_context')?.loseContext());
    function shader(type: number, source: string) {
      const value = gl!.createShader(type);
      if (!value) throw new Error('Shader allocation failed');
      dispose.push(() => gl!.deleteShader(value));
      gl!.shaderSource(value, source);
      gl!.compileShader(value);
      if (!gl!.getShaderParameter(value, gl!.COMPILE_STATUS))
        throw new Error('Scene shader compilation failed');
      return value;
    }
    const program = gl.createProgram();
    if (!program) throw new Error('Program allocation failed');
    dispose.push(() => gl.deleteProgram(program));
    gl.attachShader(program, shader(gl.VERTEX_SHADER, sceneVertexShader));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, sceneFragmentShader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error('Scene program linking failed');
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error('Buffer allocation failed');
    dispose.push(() => gl.deleteBuffer(buffer));
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const attribute = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = Object.fromEntries(
      ['uSize', 'uImageSize', 'uPosition', 'uTime', 'uStrength'].map((name) => [
        name,
        uniform(name),
      ]),
    );
    gl.uniform1f(uniform('uNoise'), settings.noiseIntensity);
    gl.uniform1f(uniform('uRadius'), settings.revealRadius);
    gl.uniform1f(uniform('uSoftness'), settings.edgeSoftness);
    function texture(unit: number, name: string) {
      const value = gl!.createTexture();
      if (!value) throw new Error('Texture allocation failed');
      dispose.push(() => gl!.deleteTexture(value));
      gl!.activeTexture(gl!.TEXTURE0 + unit);
      gl!.bindTexture(gl!.TEXTURE_2D, value);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.uniform1i(uniform(name), unit);
      // Complete samplers even before either artwork finishes decoding.
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        1,
        1,
        0,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255]),
      );
      return value;
    }
    const sketch = texture(0, 'uSketch');
    const color = texture(1, 'uColor');
    const trail = texture(2, 'uTrail');
    const mask = document.createElement('canvas');
    const ctx = mask.getContext('2d');
    if (!ctx) throw new Error('Trail canvas unavailable');
    let width = 1,
      height = 1,
      frame = 0,
      previousTime = 0,
      lastInput = -Infinity;
    let visible = true,
      ready = false,
      contextLost = false;
    let previous: Point | undefined;
    const pending: Point[] = [];
    const theme = (): SceneTheme =>
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    let currentTheme = theme();
    let generation = 0;
    const pairs = new Map<SceneTheme, Promise<HTMLImageElement[]>>();
    function loadPair(value: SceneTheme) {
      let promise = pairs.get(value);
      if (!promise) {
        promise = Promise.all(
          Object.values(sceneArtwork[value]).map((url) => {
            const image = new Image();
            image.decoding = 'async';
            image.src = url;
            return image.decode().then(() => image);
          }),
        );
        pairs.set(value, promise);
      }
      return promise;
    }
    function upload(unit: number, value: WebGLTexture, image: TexImageSource) {
      gl!.activeTexture(gl!.TEXTURE0 + unit);
      gl!.bindTexture(gl!.TEXTURE_2D, value);
      gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        image,
      );
    }
    function draw(strength = 0, time = 0) {
      if (!ready || disposed || gl!.isContextLost()) return;
      gl!.uniform1f(uniforms.uTime!, time / 1000);
      gl!.uniform1f(uniforms.uStrength!, strength);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      pending.length = 0;
      previous = undefined;
      lastInput = -Infinity;
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = '#000';
      ctx!.fillRect(0, 0, mask.width, mask.height);
      upload(2, trail, mask);
      draw();
      host.dataset.animating = 'false';
    }
    function resize() {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(
        devicePixelRatio || 1,
        settings.maxPixelRatio,
        Math.sqrt(settings.maxPixels / (width * height)),
      );
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(uniforms.uSize!, width, height);
      // CSS object-position uses top-left coordinates; GL textures use bottom-left.
      const style = getComputedStyle(host);
      gl!.uniform2f(
        uniforms.uPosition!,
        parseFloat(style.getPropertyValue('--scene-x')) / 100,
        1 - parseFloat(style.getPropertyValue('--scene-y')) / 100,
      );
      const scale = settings.maskResolution / Math.max(width, height);
      mask.width = Math.max(1, Math.round(width * scale));
      mask.height = Math.max(1, Math.round(height * scale));
      reset();
    }
    async function selectTheme() {
      const request = ++generation;
      ready = false;
      canvas.style.opacity = '0';
      reset();
      if (contextLost) return;
      try {
        const [front, back] = await loadPair(currentTheme);
        if (
          disposed ||
          contextLost ||
          gl!.isContextLost() ||
          request !== generation ||
          !front ||
          !back
        )
          return;
        upload(0, sketch, front);
        upload(1, color, back);
        gl!.uniform2f(
          uniforms.uImageSize!,
          front.naturalWidth,
          front.naturalHeight,
        );
        ready = true;
        draw();
        canvas.style.opacity = '1';
        host.dataset.renderer = 'webgl';
        // Warm the other pair only after the visible artwork is ready; no extra GPU textures.
        void loadPair(currentTheme === 'light' ? 'dark' : 'light').catch(
          () => {},
        );
      } catch {
        if (disposed || request !== generation) return;
        host.dataset.renderer = 'static';
      }
    }
    function tick(now: number) {
      frame = 0;
      if (!ready || !visible || document.hidden || disposed) return;
      const idle = (now - lastInput) / 1000;
      if (idle >= settings.trailPersistence + settings.fadeDuration) {
        reset();
        return;
      }
      const dt = Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = `rgba(0,0,0,${1 - Math.exp((-dt * 2.4) / settings.fadeDuration)})`;
      ctx!.fillRect(0, 0, mask.width, mask.height);
      if (pending.length) {
        const scale = mask.width / width;
        ctx!.globalCompositeOperation = 'lighten';
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';
        ctx!.shadowBlur =
          settings.revealRadius * settings.edgeSoftness * scale * 0.5;
        ctx!.beginPath();
        const start = previous ?? pending[0]!;
        ctx!.moveTo(start.x * scale, start.y * scale);
        let control = start;
        for (const point of pending) {
          ctx!.quadraticCurveTo(
            control.x * scale,
            control.y * scale,
            ((control.x + point.x) * scale) / 2,
            ((control.y + point.y) * scale) / 2,
          );
          control = point;
        }
        ctx!.lineTo(control.x * scale + 0.01, control.y * scale);
        // Nested, blurred strokes produce a soft pigment field before domain warping.
        // A single opaque stroke leaves an unnaturally hard circular boundary.
        for (let layer = 0; layer < 6; layer++) {
          const t = layer / 5;
          const shade = Math.round(255 * (0.12 + 0.88 * t));
          ctx!.strokeStyle =
            ctx!.shadowColor = `rgb(${shade},${shade},${shade})`;
          ctx!.lineWidth =
            settings.revealRadius *
            2 *
            scale *
            (1.2 - settings.edgeSoftness * t);
          ctx!.stroke();
        }
        ctx!.shadowBlur = 0;
        previous = control;
        pending.length = 0;
      }
      upload(2, trail, mask);
      const t = Math.max(
        0,
        (idle - settings.trailPersistence) / settings.fadeDuration,
      );
      draw(1 - t * t * (3 - 2 * t), now);
      frame = requestAnimationFrame(tick);
    }
    function pointer(event: PointerEvent) {
      if (!ready || !visible || document.hidden || !event.isPrimary) return;
      if (
        event.type !== 'pointerdown' &&
        event.pointerType !== 'mouse' &&
        !event.buttons
      )
        return;
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left,
        y = event.clientY - rect.top;
      if (x < 0 || x > width || y < 0 || y > height) {
        previous = undefined;
        return;
      }
      // Bound queued work during event bursts. Consecutive points are joined, never isolated dabs.
      pending.push({ x, y });
      if (pending.length > 64) pending.splice(1, 1);
      lastInput = performance.now();
      if (!frame) {
        previousTime = lastInput - 16;
        host.dataset.animating = 'true';
        frame = requestAnimationFrame(tick);
      }
    }
    function release() {
      previous = undefined;
    }
    function suspend() {
      if (document.hidden) reset();
    }
    function lost(event: Event) {
      event.preventDefault();
      contextLost = true;
      generation++;
      ready = false;
      canvas.style.opacity = '0';
      reset();
      host.dataset.renderer = 'static';
    }
    function listen(target: EventTarget, type: string, handler: EventListener) {
      target.addEventListener(type, handler, {
        passive: type !== 'webglcontextlost',
      });
      dispose.push(() => target.removeEventListener(type, handler));
    }
    listen(window, 'pointermove', pointer as EventListener);
    listen(window, 'pointerdown', pointer as EventListener);
    listen(window, 'pointerup', release);
    listen(window, 'pointercancel', release);
    listen(window, 'blur', reset);
    listen(window, 'scroll', release);
    listen(document, 'visibilitychange', suspend);
    listen(canvas, 'webglcontextlost', lost);
    const observer = new MutationObserver(() => {
      const next = theme();
      if (next === currentTheme) return;
      currentTheme = next;
      void selectTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    dispose.push(() => observer.disconnect());
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (!visible) reset();
    });
    intersection.observe(host);
    dispose.push(() => intersection.disconnect());
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(host);
    dispose.push(() => sizeObserver.disconnect());
    dispose.push(() => {
      cancelAnimationFrame(frame);
      pairs.clear();
    });
    resize();
    void selectTheme();
    return cleanup;
  } catch (error) {
    cleanup();
    throw error;
  }
}
