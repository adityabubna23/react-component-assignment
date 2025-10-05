// Import necessary tools from the testing libraries
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Import the component you want to test
import { InputField } from './InputField';

// 'describe' creates a test suite, a container for related tests
describe('InputField Component', () => {

  // 'it' or 'test' defines an individual test case
  it('should render without crashing', () => {
    // 'render' puts the component into a virtual screen for testing
    render(<InputField />);
  });

  it('should display the label correctly', () => {
    const labelText = 'Test Label';
    render(<InputField label={labelText} />);

    // 'screen.getByText' finds an element on the virtual screen with the given text
    // 'expect(...).toBeInTheDocument()' checks if that element was found
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<InputField placeholder="test-input" disabled={true} />);

    // We find the input by its placeholder text
    const inputElement = screen.getByPlaceholderText('test-input');

    // 'expect(...).toBeDisabled()' checks if the element has the disabled attribute
    expect(inputElement).toBeDisabled();
  });

});