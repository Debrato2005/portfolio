from pathlib import Path
import hashlib
import json
import sys

root = Path(__file__).resolve().parents[1]
lock = json.loads((root / 'skills-lock.json').read_text())
errors = []
for name, entry in lock['skills'].items():
    folder = root / entry['installedPath']
    if not (folder / 'SKILL.md').is_file():
        errors.append(f'{name}: missing SKILL.md')
    files = {}
    for path in sorted(folder.rglob('*')):
        if path.is_symlink():
            errors.append(f'{name}: symlink forbidden')
        elif path.is_file() and '__pycache__' not in path.parts and path.suffix != '.pyc':
            files[str(path.relative_to(folder))] = hashlib.sha256(path.read_bytes()).hexdigest()
    digest = hashlib.sha256(json.dumps(files, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    if files != entry['files'] or digest != entry['computedHash']:
        errors.append(f'{name}: bundle changed; review and update lock')
if errors:
    print('\n'.join(errors), file=sys.stderr)
    sys.exit(1)
print(f"Skill integrity passed: {len(lock['skills'])} local bundles.")
