import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';

// Set up the test environment for React
global.IS_REACT_ACT_ENVIRONMENT = true;
import ResourcesList from './ResourcesList';

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
