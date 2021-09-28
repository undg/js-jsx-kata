import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {act} from 'react-dom/test-utils';

test('renders learn react link', () => {
  const {getByTestId} = render(<App />);
  const form = getByTestId('form');
  expect(form).toBeInTheDocument();

  const input = getByTestId('form-input');
  expect(input).toBeInTheDocument();

  // fireEvent.change(input, {
  //   target: {value: 'internet'}
  // })

  // fireEvent.submit(form)

  // const McAfee = screen.getByText("McAfee");
  // expect(McAfee).toBeInTheDocument()
});
