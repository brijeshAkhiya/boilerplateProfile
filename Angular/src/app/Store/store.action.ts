import { createAction, props } from '@ngrx/store';

export const loginApi = createAction('[Login Api] Sending Data to backend', props<{data: any}>());
export const loginApiSuccess = createAction('[Login Api] For storing success data', props<{data: any}>());
export const profileApi = createAction('[User Profile Api] For getting user profile data');
export const profileApiSuccess = createAction('[User Profile Api] After getting user data', props<{data: any}>());
export const editProfileApi = createAction('[Edit Profile] For editing user data', props<{data: any}>());
export const editProfileApiSuccess = createAction('[Edit Profile] For handleing updated data', props<{data: any}>());
export const changePasswordApi = createAction('[Change Password] For changing password', props<{data: any}>());
export const changePasswordApiSuccess = createAction('[Change Password] After changing password', props<{data: any}>());
export const signupApi = createAction('[Signup Api] For user signup', props<{data: any}>());
export const signupApiSuccess = createAction('[Signup Api] After signup data handleing', props<{data: any}>());
// tslint:disable-next-line: max-line-length
export const resetPasswordEmailApi = createAction('[Reset Password Link] Reset password api link is sent through email', props<{data: any}>());
export const resetPasswordEmailApiSuccess = createAction('[Reset Password Link] After the mail is sent', props<{data: any}>());
export const resetPasswordApi = createAction('[Change Password1] For changing password', props<{data: any}>());
export const resetPasswordApiSuccess = createAction('[Change Password1] After changing password', props<{data: any}>());
export const apiError = createAction('[Api Error] For handleing api error', props<{err: any}>());
