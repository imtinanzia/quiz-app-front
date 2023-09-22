import React from 'react';
import { collapse } from '@growthops/ext-ts';

type Variant = 'text-lead' | 'text-regular' | 'text-small' | 'text-xsmall';

type SemanticElement = 'p' | 'span';

type TextProps = {
  variant?: Variant;
  children: string;
  element?: SemanticElement;
  className?: string;
};

const Text = ({
  variant = 'text-regular',
  children,
  element = 'p',
  className = '',
}: TextProps): JSX.Element => {
  const sharedProps = {
    className: collapse([variant, className]),
  };

  switch (element) {
    case 'p':
      return <p {...sharedProps}>{children}</p>;
    case 'span':
      return <span {...sharedProps}>{children}</span>;
    default:
      // Ensure exhaustive case handling.
      ((_: never): never => {
        throw new Error('Unhandled');
      })(element);
  }
};

export default Text;

export type { Variant, SemanticElement, TextProps };
