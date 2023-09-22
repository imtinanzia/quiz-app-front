import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Main from './index'; // Replace with the correct path to your Main component file
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

const mockedAxios = new MockAdapter(axios);

test('renders the Main component and checks for question and options', async () => {
  const { getByText, getByRole } = render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );

  // Wait for the API call to complete (you might need to adjust the timing)
  await waitFor(() => {
    // Check if the question is present
    const questionElement = getByText(
      /Which one is the capital city of /i,
      { exact: false } // Set exact to false to allow partial matching
    );
    expect(questionElement).toBeInTheDocument();

    // Check if options buttons are present
    const optionAButton = getByRole('button', { name: 'Option A' });
    const optionBButton = getByRole('button', { name: 'Option B' });
    const optionCButton = getByRole('button', { name: 'Option C' });

    expect(optionAButton).toBeInTheDocument();
    expect(optionBButton).toBeInTheDocument();
    expect(optionCButton).toBeInTheDocument();
  },{timeout:1000});
});

test('handles form submission and shows the result', async () => {
  const { getByRole, getByText } = render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );

  // Mock the API response for fetching countries
  const mockCountries = [
    { name: 'Country A', capital: 'Capital A' },
    { name: 'Country B', capital: 'Capital B' },
    { name: 'Country C', capital: 'Capital C' },
  ];

  mockedAxios.onGet('http://localhost:3000/api/auth/countries').reply(200, {
    countries: mockCountries,
  });

  // Wait for the API call to complete (you might need to adjust the timing)
  await waitFor(() => {
    // Click on an option button to select an answer
    const optionAButton = getByRole('button', { name: 'Option A' });
    fireEvent.click(optionAButton);

    // Click the submit button
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
  });

  // Wait for the result message to appear (you might need to adjust the timing)
  await waitFor(() => {
    // Check if the result message is displayed
    const resultMessage = getByText(/Wrong Answer/i); // Replace with the expected result message
    expect(resultMessage).toBeInTheDocument();
  });
});
