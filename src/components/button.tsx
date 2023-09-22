import React, { forwardRef, useMemo } from 'react';
import { isNil } from 'remeda';
import { collapse } from '@growthops/ext-ts';

type Variant = 'primary' | 'secondary' | 'tertiary';

type Size = 'small' | 'regular' | 'large';

type IconAlignment = 'left' | 'right';

type Icon = {
  svg: React.ElementType;
  alignment?: IconAlignment;
  className?: string;
};

type BaseButtonProps = {
  label: string;
  className?: string;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
};

type SemanticButtonProps = BaseButtonProps &
  React.ComponentPropsWithoutRef<'button'>;

type LinkButtonProps = BaseButtonProps & React.ComponentPropsWithoutRef<'a'>;

const baseClasses =
  'inline-flex items-center hover:bg-gray-400 justify-center text-center rounded-[10px] !leading-none';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-500 text-white text-center',
  secondary: 'bg-true-gray-300 text-true-gray-600 text-center',
  tertiary: 'border border-white text-white',
};

const sizeClasses: Record<Size, string> = {
  large: 'px-8 py-5 heading-four space-x-4',
  regular: 'px-6 py-4 text-regular space-x-3 text-center',
  small: 'px-5 py-3 text-small space-x-2',
};

const iconClasses: Record<Size, string> = {
  large: 'w-7',
  regular: 'w-5',
  small: 'w-4',
};

const generateIcon = (
  icon: Icon | undefined,
  alignment: IconAlignment,
  classes: string,
  alignmentAdjustmentClasses: string
) => {
  if (!isNil(icon) && (icon?.alignment ?? 'left') === alignment) {
    return (
      <icon.svg className={collapse([classes, alignmentAdjustmentClasses])} />
    );
  }
};

const useClasses = (
  variant: Variant,
  size: Size,
  className: string | undefined,
  icon: Icon | undefined
) =>
  useMemo(
    () => ({
      root: collapse([
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className ?? '',
      ]),
      icon: collapse([iconClasses[size], icon?.className ?? '']),
    }),
    [variant, size, className, icon?.className]
  );

const useIcons = (icon: Icon | undefined, classes: string) =>
  useMemo(
    () => ({
      left: generateIcon(icon, 'left', classes, '-ml-2'), // -ml-* here to visually weight the icon appropriately.
      right: generateIcon(icon, 'right', classes, '!-mr-2'), // !-mr-* here to visually weight the icon appropriately.
    }),
    [icon, classes]
  );

const Semantic = ({
  label,
  variant = 'primary',
  size = 'regular',
  className,
  icon,
  ...intrinsicButtonProps
}: SemanticButtonProps): JSX.Element => {
  const classes = useClasses(variant, size, className, icon);
  const icons = useIcons(icon, classes.icon);

  return (
    <button className={classes.root} {...intrinsicButtonProps} type="button">
      {icons.left}
      <span>{label}</span>
      {icons.right}
    </button>
  );
};

const Link = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      label,
      variant = 'primary',
      size = 'regular',
      className,
      icon,
      ...intrinsicAnchorProps
    }: LinkButtonProps,
    ref
  ): JSX.Element => {
    const classes = useClasses(variant, size, className, icon);
    const icons = useIcons(icon, classes.icon);

    return (
      <a
        ref={ref}
        className={classes.root}
        {...intrinsicAnchorProps}
        rel="noreferrer"
      >
        {icons.left}
        <span>{label}</span>
        {icons.right}
      </a>
    );
  }
);

const Button = {
  Semantic,
  Link,
};

export default Button;

export type {
  Variant,
  Size,
  IconAlignment,
  Icon,
  BaseButtonProps,
  SemanticButtonProps,
  LinkButtonProps,
};
