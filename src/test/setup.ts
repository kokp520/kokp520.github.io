import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock URL.createObjectURL and revokeObjectURL for tests
if (!globalThis.URL.createObjectURL) {
  globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
}
if (!globalThis.URL.revokeObjectURL) {
  globalThis.URL.revokeObjectURL = vi.fn();
}

// Mock HTMLMediaElement play/pause
Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockImplementation(() => Promise.resolve()),
});

Object.defineProperty(globalThis.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn(),
});
