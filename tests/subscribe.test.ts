import { handler } from '../src/handlers/subscribe';

test('returns 400 if required fields are missing', async () => {
  const result = await handler({ body: '{}' } as any);
  expect(result.statusCode).toBe(400);
});