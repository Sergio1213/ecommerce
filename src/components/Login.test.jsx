import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('renders the App component', () => {
    render(<Login />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
