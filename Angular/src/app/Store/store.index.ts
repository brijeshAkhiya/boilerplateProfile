// tslint:disable-next-line: max-line-length
import { loginApi, loginApiSuccess, signupApi, signupApiSuccess, profileApi, profileApiSuccess, apiError, editProfileApi, editProfileApiSuccess, changePasswordApi, changePasswordApiSuccess } from './store.action';
import { reducer } from './store.reducer';
export const fromroot = {
  loginApi,
  loginApiSuccess,
  profileApi,
  profileApiSuccess,
  apiError,
  reducer,
  editProfileApi,
  editProfileApiSuccess,
  changePasswordApi,
  changePasswordApiSuccess,
  signupApi,
  signupApiSuccess
};
