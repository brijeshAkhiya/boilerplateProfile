import { createReducer, State, on, Action } from '@ngrx/store';

// tslint:disable-next-line: max-line-length
import { loginApi, loginApiSuccess, profileApi, profileApiSuccess, apiError, editProfileApi, editProfileApiSuccess, changePasswordApi, changePasswordApiSuccess, signupApi, signupApiSuccess } from './store.action';

const initialState = null;
const reducerFunction = createReducer(
  initialState,
  on(loginApi, (state, action) => state),
  on(loginApiSuccess, (state, action) => action.data),
  on(profileApi, (state, action) => state),
  on(profileApiSuccess, (state, action) => action.data),
  on(editProfileApi, (state, action) => state),
  on(editProfileApiSuccess, (state, action) => action.data),
  on(changePasswordApi, (state, action) => state),
  on(changePasswordApiSuccess, (state, action) => action.data),
  on(signupApi, (state, action) => state),
  on(signupApiSuccess, (state, action) => action.data),
  on(apiError, (state, action) => action.err)
);

export function reducer(state: State<any> | undefined, action: Action) {
  return reducerFunction(state, action);
}
