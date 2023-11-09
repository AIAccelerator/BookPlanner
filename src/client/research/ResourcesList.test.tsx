import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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
