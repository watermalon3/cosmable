import { render, screen } from '@testing-library/react';
import NotFoundPage from "./Components/404/NotFoundPage";

describe('NotFoundPage', () => {
  it('renders the not found message', () => {
    render(<NotFoundPage />);
    const headingElement = screen.getByText(/404 Page Not Found/i);
    const messageElement = screen.getByText(
      /The page you are looking for could not be found/i
    );
    expect(headingElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });
});
