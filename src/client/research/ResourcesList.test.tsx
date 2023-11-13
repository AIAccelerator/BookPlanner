import { describe, it, expect, vi } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResourcesList from './ResourcesList';

// Manually set IS_REACT_ACT_ENVIRONMENT due to lack of support for beforeAll/afterAll hooks
if (typeof global.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
  global.IS_REACT_ACT_ENVIRONMENT = true;
}
const mockResources = [
  { id: 1, title: 'Resource 1', description: 'Description 1', type: 'url', url: 'http://example.com' },
  { id: 2, title: 'Resource 2', description: 'Description 2', type: 'pdf', url: 'http://example.com/pdf' },
]

vi.mock('@wasp/queries', () => ({
  useQuery: vi.fn().mockImplementation((queryKey, options) => {
    switch (options?.testState) {
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
  // afterEach hook removed due to lack of support in the test runner

  it('renders loading state', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ResourcesList testState="loading" />
      </QueryClientProvider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();
    cleanup();
  });

  it('renders resources list successfully', async () => {
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <ResourcesList testState="success" />
      </QueryClientProvider>
    );

    // Wait for the loading state to disappear using waitFor
    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Now that loading is complete, perform your assertions
    expect(getByText('Resource 1')).toBeInTheDocument();
    expect(getByText('Resource 2')).toBeInTheDocument();
    cleanup();
  });

});
