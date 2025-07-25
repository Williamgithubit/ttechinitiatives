import { expect, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { configure } from '@testing-library/react';

// Extend Vitest with jest-dom matchers
expect.extend(matchers);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Configure test-id attribute
configure({ testIdAttribute: 'data-testid' });

// Mock global objects
global.IS_REACT_ACT_ENVIRONMENT = true;
