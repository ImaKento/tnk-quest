import { render, screen } from '@testing-library/react';
import TnkQuestApp from './TnkQuestApp';

test('renders TnkQuest header', () => {
  render(<TnkQuestApp />);
  const linkElement = screen.getByText(/TnkQuest/i);
  expect(linkElement).toBeInTheDocument();
});
