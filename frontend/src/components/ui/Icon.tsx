type IconName =
  | 'magnifying-glass'
  | 'sun'
  | 'moon'
  | 'desktop'
  | 'arrow-up-right'
  | 'arrow-right'
  | 'github-logo'
  | 'linkedin-logo'
  | 'envelope-simple'
  | 'camera'
  | 'caret-left'
  | 'caret-right'
  | 'laptop'
  | 'map-pin'
  | 'graduation-cap'
  | 'coffee'
  | 'arrow-up'
  | 'git-branch'
  | 'users'
  | 'user-plus';
export function Icon({ name }: { name: IconName }) {
  return (
    <span
      className="icon"
      aria-hidden="true"
      style={{ maskImage: `url(/icons/${name}.svg)` }}
    />
  );
}
