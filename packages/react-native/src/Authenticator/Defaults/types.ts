import type {
  AuthenticatorComponentOverrides,
  AuthenticatorComponentDefaults,
} from '@aws-amplify/ui-react-core';
import type { RadioFieldOptions, TextFieldOptionsType } from '../hooks';

// TODO fill these interfaces with custom style override types
export interface ConfirmResetPasswordStyle {}
export interface ConfirmSignInStyle {}
export interface ConfirmSignUpStyle {}
export interface ConfirmVerifyUserStyle {}
export interface ForceNewPasswordStyle {}
export interface ForgotPasswordStyle {}
export interface SetupTotpStyle {}
export interface SignInStyle {}
export interface SignUpStyle {}
export interface VerifyUserStyle {}
export interface SetupEmailStyle {}
export interface SelectMfaTypeStyle {}

export type DefaultComponents<
  FieldType = {},
  Props = {},
> = AuthenticatorComponentDefaults<FieldType, Props>;

export type DefaultConfirmResetPasswordProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ConfirmResetPasswordStyle }
  >['ConfirmResetPassword']
>;

export type DefaultConfirmSignInProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ConfirmSignInStyle }
  >['ConfirmSignIn']
>;

export type DefaultConfirmSignUpProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ConfirmSignUpStyle }
  >['ConfirmSignUp']
>;

export type DefaultConfirmVerifyUserProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ConfirmVerifyUserStyle }
  >['ConfirmVerifyUser']
>;

export type DefaultForceNewPasswordProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ForceNewPasswordStyle }
  >['ForceNewPassword']
>;

export type DefaultForgotPasswordProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: ForgotPasswordStyle }
  >['ForgotPassword']
>;

export type DefaultSetupTotpProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: SetupTotpStyle }
  >['SetupTotp']
>;

export type DefaultSignInProps = React.ComponentPropsWithoutRef<
  DefaultComponents<TextFieldOptionsType, { style?: SignInStyle }>['SignIn']
>;

export type DefaultSignUpProps = React.ComponentPropsWithoutRef<
  DefaultComponents<TextFieldOptionsType, { style?: SignUpStyle }>['SignUp']
>;

export type DefaultVerifyUserProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    RadioFieldOptions,
    { style?: VerifyUserStyle }
  >['VerifyUser']
>;

export type DefaultSetupEmailProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    TextFieldOptionsType,
    { style?: SetupEmailStyle }
  >['SetupEmail']
>;

export type DefaultSelectMfaTypeProps = React.ComponentPropsWithoutRef<
  DefaultComponents<
    RadioFieldOptions,
    { style?: SelectMfaTypeStyle }
  >['SelectMfaType']
>;

/**
 * Custom Authenticator components
 */
type OverrideComponents<
  FieldType = {},
  Props = {},
> = AuthenticatorComponentOverrides<FieldType, Props>;

type ConfirmSignInComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignInStyle } & P
>['ConfirmSignIn'];

type ConfirmSignUpComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignUpStyle } & P
>['ConfirmSignUp'];

type ConfirmResetPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmResetPasswordStyle } & P
>['ConfirmResetPassword'];

type ConfirmVerifyUserComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmVerifyUserStyle } & P
>['ConfirmVerifyUser'];

type ForceNewPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ForceNewPasswordStyle } & P
>['ForceNewPassword'];

type ForgotPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ForgotPasswordStyle } & P
>['ForgotPassword'];

type SetupTotpComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SetupTotpStyle } & P
>['SetupTotp'];

type SignInComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SignInStyle } & P
>['SignIn'];

type SignUpComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SignUpStyle } & P
>['SignUp'];

type VerifyUserComponent<P = {}> = OverrideComponents<
  RadioFieldOptions,
  { style?: VerifyUserStyle } & P
>['VerifyUser'];

type SetupEmailComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SetupEmailStyle } & P
>['SetupEmail'];

type SelectMfaTypeComponent<P = {}> = OverrideComponents<
  RadioFieldOptions,
  { style?: SelectMfaTypeStyle } & P
>['SelectMfaType'];

/**
 * Override `Authenticator` components param
 */
export interface Components {
  ConfirmSignIn?: ConfirmSignInComponent;
  ConfirmSignUp?: ConfirmSignUpComponent;
  ConfirmResetPassword?: ConfirmResetPasswordComponent;
  ConfirmVerifyUser?: ConfirmVerifyUserComponent;
  ForceNewPassword?: ForceNewPasswordComponent;
  ForgotPassword?: ForgotPasswordComponent;
  SelectMfaType?: SelectMfaTypeComponent;
  SetupEmail?: SetupEmailComponent;
  SetupTotp?: SetupTotpComponent;
  SignIn?: SignInComponent;
  SignUp?: SignUpComponent;
  VerifyUser?: VerifyUserComponent;
}

export interface ConfirmResetPasswordProps
  extends DefaultConfirmResetPasswordProps {}
export interface ConfirmSignInProps extends DefaultConfirmSignInProps {}
export interface ConfirmSignUpProps extends DefaultConfirmSignUpProps {}
export interface ConfirmVerifyUserProps extends DefaultConfirmVerifyUserProps {}
export interface ForceNewPasswordProps extends DefaultForceNewPasswordProps {}
export interface ForgotPasswordProps extends DefaultForgotPasswordProps {}
export interface SelectMfaTypeProps extends DefaultSelectMfaTypeProps {}
export interface SetupEmailProps extends DefaultSetupEmailProps {}
export interface SetupTotpProps extends DefaultSetupTotpProps {}
export interface SignInProps extends DefaultSignInProps {}
export interface SignUpProps extends DefaultSignUpProps {}
export interface VerifyUserProps extends DefaultVerifyUserProps {}
