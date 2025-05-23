import React from 'react';
import { useDropZone } from '@aws-amplify/ui-react-core';

import { STORAGE_BROWSER_BLOCK } from '../base';
import { ViewElement } from '../elements';

export interface DropZoneProps {
  children?: React.ReactNode;
  onDropFiles?: (files: File[]) => void;
}

export const DropZone = ({
  children,
  onDropFiles,
}: DropZoneProps): React.JSX.Element => {
  const { dragState, ...dropHandlers } = useDropZone({
    onDropComplete: ({ acceptedFiles }) => {
      onDropFiles?.(acceptedFiles);
    },
  });
  return (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK}__drop-zone ${STORAGE_BROWSER_BLOCK}__drop-zone${
        dragState !== 'inactive' ? '--active' : ''
      }`}
      {...dropHandlers}
    >
      {children}
    </ViewElement>
  );
};
