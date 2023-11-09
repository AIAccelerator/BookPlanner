import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ResourcesList from './ResourcesList';

describe('ResourcesList', () => {
  it('renders without crashing', () => {
    render(<ResourcesList />);
  });
});
