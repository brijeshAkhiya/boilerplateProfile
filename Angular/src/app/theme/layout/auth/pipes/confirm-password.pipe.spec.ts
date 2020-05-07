import { ConfirmPasswordPipe } from './confirm-password.pipe';

describe('ConfirmPasswordPipe', () => {
  it('create an instance', () => {
    const pipe = new ConfirmPasswordPipe();
    expect(pipe).toBeTruthy();
  });
});
