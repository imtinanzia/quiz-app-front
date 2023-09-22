import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Button } from '@app/components';
import type { Variant, Size, IconAlignment } from '@app/components/button';

const variants: Variant[] = ['primary', 'secondary', 'tertiary'];
const sizes: Size[] = ['small', 'regular', 'large'];
const iconAlignments: IconAlignment[] = ['left', 'right'];

test('snapshots — semantic', () => {
  for (const variant of variants) {
    for (const size of sizes) {
      for (const iconAlignment of iconAlignments) {
        const result = renderer
          .create(
            <Button.Semantic
              label="Click me"
              variant={variant}
              size={size}
              icon={{ svg: CheckCircleIcon, alignment: iconAlignment }}
            />
          )
          .toJSON();

        expect(result).toMatchSnapshot();
      }
    }
  }
});

test('snapshots — link', () => {
  for (const variant of variants) {
    for (const size of sizes) {
      for (const iconAlignment of iconAlignments) {
        const result = renderer
          .create(
            <Button.Link
              label="Click me"
              variant={variant}
              size={size}
              icon={{ svg: CheckCircleIcon, alignment: iconAlignment }}
            />
          )
          .toJSON();

        expect(result).toMatchSnapshot();
      }
    }
  }
});
