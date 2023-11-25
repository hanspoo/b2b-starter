import { persistor } from './app/store';
describe('reductor', () => {
  it('should work', () => {
    expect(persistor).toBeTruthy();
  });
});
