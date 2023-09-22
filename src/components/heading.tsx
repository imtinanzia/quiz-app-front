import React from 'react';
import { collapse } from '@growthops/ext-ts';

type Variant =
  | 'headline'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'subheading';

type SemanticElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type HeadingProps = {
  variant: Variant;
  label: string;
  element?: SemanticElement;
  className?: string;
};

const Heading = ({
  variant,
  label,
  element = 'p',
  className = '',
}: HeadingProps): JSX.Element => {
  const sharedProps = {
    className: collapse([variant, className]),
  };

  switch (element) {
    case 'h1':
      return <h1 {...sharedProps}>{label}</h1>;
    case 'h2':
      return <h2 {...sharedProps}>{label}</h2>;
    case 'h3':
      return <h3 {...sharedProps}>{label}</h3>;
    case 'h4':
      return <h4 {...sharedProps}>{label}</h4>;
    case 'h5':
      return <h5 {...sharedProps}>{label}</h5>;
    case 'h6':
      return <h6 {...sharedProps}>{label}</h6>;
    case 'p':
      return <p {...sharedProps}>{label}</p>;
    case 'span':
      return <span {...sharedProps}>{label}</span>;
    default:
      // Ensure exhaustive case handling.
      ((_: never): never => {
        throw new Error('Unhandled');
      })(element);
  }
};

export default Heading;

export type { Variant, SemanticElement, HeadingProps };
