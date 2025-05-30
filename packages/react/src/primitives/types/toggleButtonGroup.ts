import type * as React from 'react';

import type { BaseFlexProps } from './flex';
import type { BaseToggleButtonProps } from './toggleButton';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseToggleButtonGroupProps
  extends BaseFlexProps,
    Pick<BaseToggleButtonProps, 'size' | 'variation'> {
  /**
   * @description
   * Accepts any number of ToggleButton components
   */
  children: React.ReactNode;

  /**
   * @description
   * When `true`, only allows one ToggleButton to be pressed at a time within a ToggleButtonGroup
   */
  isExclusive?: boolean;

  /**
   * @description
   * Used when at least one ToggleButton needs to be currently pressed
   */
  isSelectionRequired?: boolean;

  /**
   * @description
   * Controls which of its ToggleButton children are currently selected
   */
  value: string | string[];

  /**
   * @description
   * Handles changes to the current value when using the ToggleButtonGroup as a controlled component
   */
  onChange: (value: string | (string | undefined)[] | undefined) => void;
}

export type ToggleButtonGroupProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseToggleButtonGroupProps, Element>;
