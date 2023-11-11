// Set up the test environment for React
global.IS_REACT_ACT_ENVIRONMENT = true;
// Removed duplicate import

// Mock the useQuery hook if it's used in the ResourcesList component
jest.mock('@wasp/queries', () => ({
  useQuery: jest.fn(() => ({ data: [], error: null })),
}));

describe('ResourcesList', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<ResourcesList />);
  });
});
import { render, cleanup } from '@testing-library/react';
import { useQuery } from '@wasp/queries';
import ResourcesList from './ResourcesList';

// Mock data for resources
const mockResources = [
  { id: 1, title: 'Resource 1', description: 'Description 1', type: 'url', url: 'http://example.com' },
  { id: 2, title: 'Resource 2', description: 'Description 2', type: 'pdf', url: 'http://example.com/pdf' },
];

// Mock the useQuery hook
vi.mock('@wasp/queries', () => ({
  useQuery: vi.fn(() => ({
    data: { resources: mockResources, totalResources: mockResources.length },
    error: null,
    isLoading: false,
  })),
}));

describe('ResourcesList', () => {
  afterEach(cleanup);

  it('renders resources list successfully', () => {
    const { getByText } = render(<ResourcesList />);
    expect(getByText('Resource 1')).toBeInTheDocument();
    expect(getByText('Resource 2')).toBeInTheDocument();
  });

  // Add more positive test cases as needed
});
