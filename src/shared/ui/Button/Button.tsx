import React from 'react';
import s from './Button.module.scss';

type Size = 'md' | 'lg' | 'xxl';
type Variant = 'solid' | 'link' | 'primary' | 'glass';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
  block?: boolean;
};

export default function Button({
  size = 'lg',
  variant = 'glass',
  block,
  className,
  children,
  ...rest
}: Props) {
  const sizeClass = s[size] ?? '';
  const variantClass = s[variant] ?? '';
  const blockClass = block ? s.block : '';

  return (
    <button
      className={[s.btn, sizeClass, variantClass, blockClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
