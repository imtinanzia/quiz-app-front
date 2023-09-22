import { collapse } from '@growthops/ext-ts';
import React, { useMemo } from 'react';

type ContainerProps = {
  children: boolean | JSX.Element | Array<boolean | JSX.Element>;
  className?: string;
};

const Container = ({ className = '', children }: ContainerProps) => {
  const classes = useMemo(
    () => ({
      root: collapse(['container', className]),
    }),
    [className]
  );

  return <div className={classes.root}>{children}</div>;
};

export default Container;

export type { ContainerProps };
