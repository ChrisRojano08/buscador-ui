import { render, screen } from '@testing-library/react';
import App from './App';

/* global test, expect */
test('renders learn react link', () => {
	const React = require('react');

	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
