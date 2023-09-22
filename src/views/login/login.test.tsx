// Login.test.js
import React from 'react';
import { render, fireEvent, waitFor,act } from '@testing-library/react';
import axios from 'axios'; // You can use a testing library like Axios Mock Adapter for mocking HTTP requests
import Login from './index'; // Replace with the correct path to your Login component file
import {BrowserRouter} from 'react-router-dom'
import MockAdapter from 'axios-mock-adapter';


const mockedAxios = new MockAdapter(axios);
test('renders the login form', () => {
  const { getByText, getByPlaceholderText,getByTestId } = render(<BrowserRouter><Login /> </BrowserRouter>);

  // Check if the form elements are present
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('handles form submission', async () => {
  const { getByPlaceholderText, getByText } = render(<BrowserRouter><Login /></BrowserRouter>);

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  // Fill in the form
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Mock a successful request
  mockedAxios.onPost('http://localhost:3000/api/auth/login').reply(200, {
    user: { id: 1, username: 'testuser' },
  });

  // Submit the form
  fireEvent.click(loginButton);
  const closestForm = loginButton.closest('form');
  expect(closestForm).toBeInTheDocument();

});
test('handles form submission and api call', async () => {
  const { getByPlaceholderText, getByText,queryByText } = render(<BrowserRouter><Login /></BrowserRouter>);

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  // Fill in the form
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Mock a successful request
  mockedAxios.onPost('http://localhost:3000/api/auth/login').reply(200, {
    user: { id: 1, username: 'testuser' },
  });

  // Submit the form
  await act(async () => {
    // Submit the form
    fireEvent.click(loginButton);
  });
  // Wait for the login to complete (you might need to adjust the timing)
  await waitFor(() => {
    // For example, you can check if the user is logged in
    const emailInputAfterLogin = queryByText('Email');
    const passwordInputAfterLogin = queryByText('Password');

    expect(emailInputAfterLogin).not.toBeInTheDocument();
    expect(passwordInputAfterLogin).not.toBeInTheDocument();
  });
});