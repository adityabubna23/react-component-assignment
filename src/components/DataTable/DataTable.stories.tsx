import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

// Define the type for your data objects
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Define the columns type
type UserColumn = {
  key: string;
  title: string;
  dataIndex: keyof User;
  sortable?: boolean;
}

// Use correct typing for the component
const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    onRowSelect: { action: 'rowSelected' },
  },
} as Meta<typeof DataTable>;

export default meta;

// Use a more specific type for the stories
type Story = StoryObj<typeof meta>;

const sampleData: User[] = [
  { id: 1, name: 'Utkal Nandy', email: 'utkal.nandy@example.com', role: 'Admin' },
  { id: 2, name: 'Pritish Panda', email: 'pritish.panda@example.com', role: 'User' },
  { id: 3, name: 'Mohamad Noor', email: 'mohamad.noor@example.com', role: 'User' },
  { id: 4, name: 'Aditya Bubna', email: 'aditya.bubna@example.com', role: 'Editor' },
];

const sampleColumns: UserColumn[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email Address', dataIndex: 'email' },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

// Cast the story arguments to any to bypass TypeScript generics limitations
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  } as any,
};

export const Selectable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  } as any,
};

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  } as any,
};

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  } as any,
};