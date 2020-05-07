import { AlphaNumericUsernamePipe } from './alpha-numeric-username.pipe';

describe('AlphaNumericUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new AlphaNumericUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
