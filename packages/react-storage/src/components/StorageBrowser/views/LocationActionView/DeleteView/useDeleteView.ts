import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { FileDataItem } from '../../../actions';
import { useStore } from '../../../providers/store';
import { Task } from '../../../tasks';
import { useAction } from '../../../useAction';

import { DeleteViewState, UseDeleteViewOptions } from './types';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: FileDataItem[] = [];

export const useDeleteView = (
  options?: UseDeleteViewOptions
): DeleteViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { current } = location;
  const { fileDataItems: items = EMPTY_ITEMS } = locationItems;

  const [processState, handleProcess] = useAction('delete', { items });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const onActionStart = () => {
    if (!current) return;
    handleProcess();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      dispatchStoreAction({ type: 'REMOVE_LOCATION_ITEM', id: data.id });
    },
    [dispatchStoreAction]
  );

  return {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onTaskRemove,
  };
};
