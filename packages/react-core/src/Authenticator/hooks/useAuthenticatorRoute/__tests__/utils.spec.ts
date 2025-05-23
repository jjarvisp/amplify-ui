import { AuthenticatorRoute } from '@aws-amplify/ui';
import { RenderNothing } from '../../../../components';
import {
  AuthenticatorRouteComponentName,
  DefaultComponentType,
} from '../../types';
import { UseAuthenticator } from '../../useAuthenticator/types';

import { DEFAULTS } from '../../__mocks__/components';
import {
  mockMachineContext,
  mockUseAuthenticatorOutput,
} from '../../useAuthenticator/__mock__/useAuthenticator';
import { UseAuthenticatorRoute } from '../types';

import {
  getRouteMachineSelector,
  routeSelector,
  resolveConfirmResetPasswordRoute,
  resolveConfirmSignInRoute,
  resolveConfirmSignUpRoute,
  resolveDefault,
  resolveConfirmVerifyUserRoute,
  resolveForceNewPasswordRoute,
  resolveForgotPasswordRoute,
  resolveSelectMfaTypeRoute,
  resolveSetupEmailRoute,
  resolveSetupTotpRoute,
  resolveSignInRoute,
  resolveSignUpRoute,
  resolveVerifyUserRoute,
} from '../utils';

type PropsResolver = (
  Component: DefaultComponentType,
  selectedProps: UseAuthenticator
) => UseAuthenticatorRoute<AuthenticatorRouteComponentName, {}>;

const {
  challengeName,
  codeDeliveryDetails,
  error,
  hasValidationErrors,
  isPending,
  resendCode,
  route,
  skipVerification,
  socialProviders,
  submitForm,
  toFederatedSignIn,
  toForgotPassword,
  toSignIn,
  toSignUp,
  totpSecretCode,
  updateBlur,
  updateForm,
  username,
  validationErrors,
} = mockUseAuthenticatorOutput;

const machineContext = mockMachineContext;

const useAuthenticatorOutput = mockUseAuthenticatorOutput;

const commonSelectorProps = [
  error,
  isPending,
  submitForm,
  updateBlur,
  updateForm,
];

describe('getRouteMachineSelector', () => {
  it.each([
    [
      'confirmResetPassword',
      [
        ...commonSelectorProps,
        hasValidationErrors,
        resendCode,
        validationErrors,
        route,
      ],
    ],
    ['confirmSignIn', [...commonSelectorProps, challengeName, toSignIn, route]],
    [
      'confirmSignUp',
      [...commonSelectorProps, codeDeliveryDetails, resendCode, route],
    ],
    ['confirmVerifyUser', [...commonSelectorProps, skipVerification, route]],
    [
      'forceNewPassword',
      [
        ...commonSelectorProps,
        hasValidationErrors,
        toSignIn,
        validationErrors,
        route,
      ],
    ],
    ['idle', [route]],
    ['forgotPassword', [...commonSelectorProps, toSignIn, route]],
    [
      'signIn',
      [
        ...commonSelectorProps,
        socialProviders,
        toFederatedSignIn,
        toForgotPassword,
        toSignUp,
        route,
      ],
    ],
    [
      'signUp',
      [
        ...commonSelectorProps,
        hasValidationErrors,
        socialProviders,
        toFederatedSignIn,
        toSignIn,
        validationErrors,
        route,
      ],
    ],
    ['selectMfaType', [...commonSelectorProps, challengeName, toSignIn, route]],
    ['setupEmail', [...commonSelectorProps, toSignIn, route]],
    [
      'setupTotp',
      [...commonSelectorProps, toSignIn, totpSecretCode, username, route],
    ],
    ['verifyUser', [...commonSelectorProps, skipVerification, route]],
  ])('returns the expected route selector for %s', (route, expected) => {
    const selector = getRouteMachineSelector(route as AuthenticatorRoute);
    const output = selector(machineContext);
    expect(output).toStrictEqual(expected);
  });
});

describe('props resolver functions', () => {
  it.each([
    [
      'ConfirmResetPassword',
      resolveConfirmResetPasswordRoute,
      { hasValidationErrors, resendCode, validationErrors },
    ],
    ['ConfirmSignIn', resolveConfirmSignInRoute, { challengeName, toSignIn }],
    [
      'ConfirmSignUp',
      resolveConfirmSignUpRoute,
      { codeDeliveryDetails, resendCode },
    ],
    [
      'ConfirmVerifyUser',
      resolveConfirmVerifyUserRoute,
      { error, isPending, skipVerification },
    ],
    [
      'ForceNewPassword',
      resolveForceNewPasswordRoute,
      { error, hasValidationErrors, isPending, toSignIn, validationErrors },
    ],
    [
      'ForgotPassword',
      resolveForgotPasswordRoute,
      { error, isPending, toSignIn },
    ],
    [
      'SelectMfaType',
      resolveSelectMfaTypeRoute,
      { error, isPending, challengeName, toSignIn },
    ],
    ['SetupEmail', resolveSetupEmailRoute, { error, isPending, toSignIn }],
    [
      'SetupTotp',
      resolveSetupTotpRoute,
      { toSignIn, totpSecretCode, username },
    ],
    [
      'SignIn',
      resolveSignInRoute,
      {
        error,
        hideSignUp: false,
        isPending,
        socialProviders,
        toFederatedSignIn,
        toForgotPassword,
        toSignUp,
      },
    ],
    [
      'SignUp',
      resolveSignUpRoute,
      {
        error,
        hasValidationErrors,
        isPending,
        socialProviders,
        toFederatedSignIn,
        toSignIn,
        validationErrors,
      },
    ],
    [
      'VerifyUser',
      resolveVerifyUserRoute,
      { error, isPending, skipVerification },
    ],
  ])(
    'resolve%s returns the expected values',
    (key, resolver, routeSpecificProps) => {
      const Component = DEFAULTS[key as AuthenticatorRouteComponentName];

      const commonProps = { error, isPending };
      const componentSlots = {
        Footer: Component.Footer,
        FormFields: Component.FormFields,
        Header: Component.Header,
      };
      const eventHandlerProps = {
        handleBlur: updateBlur,
        handleChange: updateForm,
        handleSubmit: submitForm,
      };

      const expected = {
        Component,
        props: {
          ...commonProps,
          ...componentSlots,
          ...eventHandlerProps,
          ...routeSpecificProps,
        },
      };

      const output = (resolver as PropsResolver)(
        Component,
        useAuthenticatorOutput
      );
      expect(output).toStrictEqual(expected);
    }
  );

  describe('resolveDefault', () => {
    it('returns the expected values', () => {
      const output = resolveDefault();
      const expected = { Component: RenderNothing, props: {} };

      expect(output).toStrictEqual(expected);
    });
  });
});

describe('routeSelector', () => {
  it('only selects the value of route', () => {
    const route = 'idle' as UseAuthenticator['route'];
    const machineContext = { ...mockUseAuthenticatorOutput, route };

    const output = routeSelector(machineContext);
    expect(output).toStrictEqual([route]);
  });
});
