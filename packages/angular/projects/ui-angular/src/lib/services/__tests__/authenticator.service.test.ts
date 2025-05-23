import { AuthenticatorService } from '../authenticator.service';

import * as UIModule from '@aws-amplify/ui';
import * as XState from 'xstate';

// mock state machine service
// based on https://github.com/statelyai/xstate/blob/v4/packages/core/src/interpreter.ts
class MockAuthService {
  initialized = false;
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void): { unsubscribe: () => void } {
    this.listeners.push(callback);
    const unsubscribe = jest.fn();
    return { unsubscribe };
  }

  start(): this {
    this.initialized = true;
    return this;
  }

  stop(): this {
    this.initialized = false;
    return this;
  }

  send(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }
}

const mockFacade = {} as unknown as ReturnType<
  (typeof UIModule)['getServiceFacade']
>;

jest.spyOn(UIModule, 'getServiceFacade').mockReturnValue(mockFacade);
// mock interpreted authservice
jest
  .spyOn(XState, 'interpret')
  .mockReturnValue(
    new MockAuthService() as unknown as ReturnType<typeof XState.interpret>
  );

describe('AuthenticatorService', () => {
  let authService: AuthenticatorService;

  beforeEach(() => {
    authService = new AuthenticatorService();
    jest.clearAllMocks();
  });

  it('subscribe returns state machine facade', () => {
    const handler = jest.fn();
    const subscription = authService.subscribe(handler);

    // trigger a mock transition
    authService.send('INIT');

    expect(handler).toHaveBeenCalledTimes(1);

    expect(handler).toHaveBeenCalledWith(mockFacade);

    subscription.unsubscribe();
  });

  it('should stop actor on destruction', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ((authService as any)._authService as ReturnType<typeof XState.interpret>)
        .initialized
    ).toBeTruthy();

    authService.ngOnDestroy();

    expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ((authService as any)._authService as ReturnType<typeof XState.interpret>)
        .initialized
    ).toBeFalsy();
  });
});
