import { render, screen } from '@testing-library/react';
import Productlist from './Productlist';

describe('Home', () => {
  it('renders the App component', () => {
    render(<Productlist />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
