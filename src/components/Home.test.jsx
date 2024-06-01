import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('App', () => {
  it('renders the App component', () => {
    render(<Home />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
