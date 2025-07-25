import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the app with a header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check for a header element
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Or check for a specific element that should always be present
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});
