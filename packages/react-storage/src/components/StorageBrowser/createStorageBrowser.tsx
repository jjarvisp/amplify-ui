import React from 'react';

import { setUserAgent } from '@aws-amplify/ui';

import { VERSION } from '../../version';

import {
  defaultActionConfigs,
  getActionConfigs,
  ActionConfigsProvider,
  ExtendedActionConfigs,
} from './actions';
import { DEFAULT_COMPOSABLES } from './composables';
import { elementsDefault } from './context/elements';
import { ComponentsProvider } from './ComponentsProvider';
import { componentsDefault } from './componentsDefault';
import { DisplayTextProvider } from './displayText';
import { ErrorBoundary as DefaultErrorBoundary } from './ErrorBoundary';
import { createConfigurationProvider, StoreProvider } from './providers';
import { StorageBrowserDefault } from './StorageBrowserDefault';
import {
  CreateStorageBrowserInput,
  CreateStorageBrowserOutput,
  StorageBrowserProviderProps,
  StorageBrowserType,
  DerivedActionViews,
  DerivedActionViewType,
} from './types';
import {
  getActionHandlers,
  ActionHandlersProvider,
  useAction,
} from './useAction';
import { assertRegisterAuthListener } from './validators';
import {
  CopyView,
  CreateFolderView,
  DeleteView,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  UploadView,
  LocationActionViewType,
  useView,
  ViewsProvider,
} from './views';

/**
 * Creates a `StorageBrowser` component and utility hooks from provided configuration `input`.
 *
 * @param input - `StorageBrowser` auth, actions and ui configuration values
 * @returns `StorageBrowser` component, `useAction` and `useView` hooks
 */
export function createStorageBrowser<
  Input extends CreateStorageBrowserInput,
  RInput extends Input['actions'] extends ExtendedActionConfigs
    ? Input['actions']
    : ExtendedActionConfigs,
>(input: Input): CreateStorageBrowserOutput<RInput> {
  assertRegisterAuthListener(input.config.registerAuthListener);

  const {
    accountId,
    customEndpoint,
    registerAuthListener,
    getLocationCredentials,
    region,
  } = input.config;

  setUserAgent({
    componentName: 'StorageBrowser',
    packageName: 'react-storage',
    version: VERSION,
  });

  const actions = {
    default: {
      ...defaultActionConfigs,
      ...input.actions?.default,
      // always last
      listLocations: input.config.listLocations,
    },
    custom: input.actions?.custom,
  };

  const handlers = getActionHandlers(actions);

  const actionConfigs = getActionConfigs(actions);

  const ConfigurationProvider = createConfigurationProvider({
    accountId,
    customEndpoint,
    displayName: 'ConfigurationProvider',
    getLocationCredentials,
    region,
    registerAuthListener,
  });

  const composables = {
    // fallback composables
    ...DEFAULT_COMPOSABLES,
    // default components
    ...componentsDefault,
    // override components
    ...input.components,
  };

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  function Provider({
    children,
    displayText,
    views,
    ...props
  }: StorageBrowserProviderProps) {
    return (
      <StoreProvider {...props}>
        <ConfigurationProvider>
          <ActionConfigsProvider actionConfigs={actionConfigs}>
            <ActionHandlersProvider handlers={handlers}>
              <DisplayTextProvider displayText={displayText}>
                <ViewsProvider actions={actions} views={views}>
                  <ComponentsProvider
                    composables={composables}
                    elements={elementsDefault}
                  >
                    {children}
                  </ComponentsProvider>
                </ViewsProvider>
              </DisplayTextProvider>
            </ActionHandlersProvider>
          </ActionConfigsProvider>
        </ConfigurationProvider>
      </StoreProvider>
    );
  }

  const ErrorBoundary =
    input.ErrorBoundary === null
      ? React.Fragment
      : input.ErrorBoundary ?? DefaultErrorBoundary;

  const StorageBrowser: StorageBrowserType<
    DerivedActionViewType<RInput>,
    DerivedActionViews<RInput>
  > = ({ views, displayText }) => (
    <ErrorBoundary>
      <Provider displayText={displayText} views={views}>
        <StorageBrowserDefault />
      </Provider>
    </ErrorBoundary>
  );

  StorageBrowser.LocationActionView =
    LocationActionView as LocationActionViewType<DerivedActionViewType<RInput>>;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.CopyView = CopyView;
  StorageBrowser.CreateFolderView = CreateFolderView;
  StorageBrowser.DeleteView = DeleteView;
  StorageBrowser.UploadView = UploadView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser, useAction, useView };
}
