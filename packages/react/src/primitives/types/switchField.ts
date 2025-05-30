import type { Property } from 'csstype';

import type { Sizes } from './base';
import type { BaseStyleProps, StyleToken } from './style';
import type { BaseInputProps } from './input';
import type { BaseFieldProps, LabelPositions } from './field';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseSwitchFieldProps
  extends BaseInputProps,
    BaseFieldProps,
    BaseStyleProps {
  /**
   * @description
   * Use this to provide a default checked value for an uncontrolled SwitchField
   */
  defaultChecked?: boolean;

  /**
   * @description
   * If isChecked is provided, this will be a controlled SwitchField
   */
  isChecked?: boolean;

  /**
   * @description
   * This property will set the switch to disabled
   */
  isDisabled?: boolean;

  /**
   * @description
   * Visually hide the label, but the associated label text will still be required for accessibility.
   */
  isLabelHidden?: boolean;

  /**
   * @description
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * @description
   * Position of label in relation to the switchfield
   */
  labelPosition?: LabelPositions;

  /**
   * @description
   * This prop adds a name attribute to the input element
   */
  name?: string;

  /**
   * @description
   * Assign an onChange event to the switch field
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * @description
   * This prop adjusts the size of the switch component
   */
  size?: Sizes;

  /**
   * @description
   * This property will change the color of the thumb in the switch component
   */

  thumbColor?: StyleToken<Property.Color>;

  /**
   * @description
   * This property will change the color of the track in the switch component
   */
  trackColor?: StyleToken<Property.Color>;

  /**
   * @description
   * This property will change the color of the checked track in the switch component
   */
  trackCheckedColor?: StyleToken<Property.Color>;

  /**
   * @description
   * This is the value of the switch input and will be submitted with a form submission
   */
  value?: string | number;
}

export type SwitchFieldProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseSwitchFieldProps, Element>;
