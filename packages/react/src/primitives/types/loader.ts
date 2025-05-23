import type { Property } from 'csstype';

import type { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';
import type { Sizes } from './base';
import type { StyleToken } from './style';

export type LoaderSizes = Sizes;

export type LoaderVariations = 'linear';

/** @deprecated For internal use only */
export interface BaseLoaderProps extends BaseViewProps {
  /**
   * @description
   * This will set the size of Loader.
   */
  size?: LoaderSizes;
  /**
   * @description
   * This will set the variation of Loader. Available options are linear and none(circular).
   */
  variation?: LoaderVariations;
  /**
   * @description
   * This will set the filled color of Loader.
   */
  filledColor?: StyleToken<Property.Color>;
  /**
   * @description
   * This will set the empty color of Loader.
   */
  emptyColor?: StyleToken<Property.Color>;
  /**
   * @description
   * This will set the percentage of a determinate Loader.
   */
  percentage?: number;
  /**
   * @description
   * This will mark the Loader as determinate.
   */
  isDeterminate?: boolean;
  /**
   * @description
   * This will set the visibility of percentage text.
   */
  isPercentageTextHidden?: boolean;
}

export type LoaderProps<Element extends ElementType = 'svg'> = PrimitiveProps<
  BaseLoaderProps,
  Element
>;
