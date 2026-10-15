import { Button as PrimitiveButton } from '@base-ui/react/button';
import type { ComponentProps } from 'react';
export function Button({
  className = '',
  ...props
}: ComponentProps<typeof PrimitiveButton>) {
  return (
    <PrimitiveButton className={`button ${className}`.trim()} {...props} />
  );
}
