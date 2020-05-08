import { AlphaNumbericUsernamePipe } from './alpha-numberic-username.pipe';

describe('AlphaNumbericUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new AlphaNumbericUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
