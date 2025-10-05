import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'], // This enables automatic documentation in Storybook
  argTypes: { // This adds controls to the Storybook UI
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic default story
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'user@example.com',
  },
};

// Story for the Invalid state
export const Invalid: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'user@example.com',
    invalid: true,
    errorMessage: 'This email is invalid.',
  },
};

// Story for the Disabled state
export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Cannot be edited',
    disabled: true,
  },
};

// Story for the Filled variant
export const Filled: Story = {
  args: {
    label: 'First Name',
    placeholder: 'John Doe',
    variant: 'filled',
  },
};