import type * as React from 'react';

import type { BaseButtonPropsWithoutColorTheme } from './button';
import type { BaseFlexProps } from './flex';
import type { Sizes } from './base';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseMenuProps extends BaseFlexProps {
  /**
   * @description
   * Alignment of menu against trigger
   * @default
   * "start"
   */
  menuAlign?: 'start' | 'center' | 'end';

  /**
   * @description
   * Handle open and close event of menu
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * @description
   * Default for controlled menu
   */
  isOpen?: boolean;

  /**
   * @description
   * Size of Menu button and items
   */
  size?: Sizes;

  /**
   * @description
   * Trigger node
   * @default
   * MenuButton with IconMenu
   * @note
   * Must forward refs to DOM element
   */
  trigger?: React.ReactNode;

  /**
   * @description
   * ClassName to apply to default trigger button
   * Note: only applies if `trigger` prop is null
   */
  triggerClassName?: string;
}
export type MenuProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMenuProps,
  Element
>;

/** @deprecated For internal use only */
export interface BaseMenuItemProps extends BaseButtonPropsWithoutColorTheme {
  /**
   * @description
   * Accepts any number of MenuItem components
   */
  children?: React.ReactNode;
}

export type MenuItemProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseMenuItemProps,
  Element
>;

/** @deprecated For internal use only */
export interface BaseMenuButtonProps extends BaseButtonPropsWithoutColorTheme {}

export type MenuButtonProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseMenuButtonProps, Element>;
