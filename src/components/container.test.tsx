import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import Container from '@app/components/container';

test('snapshot', () => {
  const result = renderer
    .create(
      <Container>
        <p>Hello World</p>
      </Container>
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
