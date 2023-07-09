import { render, screen } from '@testing-library/react';
import DropDown from "../components/DropDown";

test('Categories dropdown has correct label.', () => {
  render(<DropDown label='Categories' callback={null} options={[]} />);
  const linkElement = screen.getByText('Categories');
  expect(linkElement).toBeInTheDocument();
});

