import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Signup from './index'; // Replace with the correct path to your Signup component file
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

const mockedAxios = new MockAdapter(axios);

test('renders the signup form', () => {
  const { getByText, getByPlaceholderText } = render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  // Check if the form elements are present
  const nameInput = getByPlaceholderText('FullName');
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const signupButton = getByText('Sign up');

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('handles form submission and signup API call', async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  const nameInput = getByPlaceholderText('FullName');
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const signupButton = getByText('Sign up');

  // Fill in the form
  fireEvent.change(nameInput, { target: { value: 'Test User' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Mock a successful signup request
  mockedAxios.onPost('http://localhost:3000/api/auth/register').reply(200, {
    user: { id: 1, username: 'testuser' },
  });

  // Submit the form
  await act(async () => {
    fireEvent.click(signupButton);
  });

  // Wait for the signup to complete (you might need to adjust the timing)
  await waitFor(() => {
    // For example, you can check if the user is redirected to the login page
    const loginButton = queryByText('Login');
    expect(loginButton).toBeInTheDocument();
  });
});
