import { AlphaNumbericPasswordPipe } from './alpha-numberic-password.pipe';

describe('AlphaNumbericPasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new AlphaNumbericPasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
