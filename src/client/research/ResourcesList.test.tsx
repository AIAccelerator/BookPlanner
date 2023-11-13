import { describe, it, expect, vi } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResourcesList from './ResourcesList';

global.IS_REACT_ACT_ENVIRONMENT = true;
const mockResources = [
  { id: 1, title: 'Resource 1', description: 'Description 1', type: 'url', url: 'http://example.com' },
  { id: 2, title: 'Resource 2', description: 'Description 2', type: 'pdf', url: 'http://example.com/pdf' },
]

vi.mock('@wasp/queries', () => ({
  useQuery: vi.fn().mockImplementation((queryKey, queryFn, options) => {
    switch (options.testState) {
      case 'loading':
        return { data: null, error: null, isLoading: true };
      case 'error':
        return { data: null, error: { message: 'Test error' }, isLoading: false };
      default:
        // Replace with your mock data
        return {
          data: { 
            resources: mockResources,
            totalResources: mockResources.length
          },
          error: null,
          isLoading: false,
        };
    }
  }),
}));


const queryClient = new QueryClient();

describe('ResourcesList', () => {

  it('renders loading state', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ResourcesList />
      </QueryClientProvider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
    cleanup();
  });

  it('renders resources list successfully', async () => {
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <ResourcesList />
      </QueryClientProvider>
    );

    // Wait for the loading state to disappear
    await waitFor(() => expect(queryByText('Loading...')).not.toBeInTheDocument());

    // Now that loading is complete, perform your assertions
    expect(getByText('Resource 1')).toBeInTheDocument();
    expect(getByText('Resource 2')).toBeInTheDocument();
    cleanup();
  });

});
