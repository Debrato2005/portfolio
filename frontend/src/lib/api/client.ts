export class RequestError extends Error {
  readonly status: number | null;
  constructor(status: number | null = null) {
    super('The request failed. Try again.');
    this.name = 'RequestError';
    this.status = status;
  }
}
export async function getJson<T>(
  url: string,
  parse: (value: unknown) => T,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...(signal ? { signal } : {}),
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new RequestError();
  }
  if (!response.ok) throw new RequestError(response.status);
  try {
    const value: unknown = await response.json();
    return parse(value);
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new RequestError(response.status);
  }
}
