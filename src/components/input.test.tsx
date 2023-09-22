import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Input } from '@app/components';

test('snapshot — vanilla', () => {
  const result = renderer
    .create(<Input label="Name" placeholder="Jon Snow" />)
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — vanilla + required', () => {
  const result = renderer
    .create(<Input required label="Name" placeholder="Jon Snow" />)
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — helptext', () => {
  const result = renderer
    .create(
      <Input
        label="Name"
        defaultValue="Arya"
        helpText="What would you like us to call you?"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — disabled', () => {
  const result = renderer
    .create(
      <Input
        disabled
        label="Name"
        defaultValue="Arya"
        helpText="What would you like us to call you?"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — error', () => {
  const result = renderer
    .create(
      <Input
        label="Name"
        error="First name cannot contain mathematical equations"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
