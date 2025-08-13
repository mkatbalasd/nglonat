import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './test-utils/msw';

beforeAll(() => server.listen());

// محاكاة الدالة window.scrollTo لتجنب أخطاء في بيئة الاختبار
beforeEach(() => {
  window.scrollTo = vi.fn();
});

afterEach(() => {
  // إعادة تعيين المحاكاة بعد كل اختبار لضمان العزل بين الاختبارات
  (window.scrollTo as Mock).mockReset();
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
