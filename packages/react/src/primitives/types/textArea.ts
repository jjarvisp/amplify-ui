import type { Property } from 'csstype';

import type { Sizes } from './base';
import type { FieldVariations } from './field';
import type { ElementType, PrimitiveProps, BaseViewProps } from './view';

export interface TextAreaStyleProps {
  /**
   * @description
   * Defines if (and how) an element is resizable by the user
   */
  resize?: Property.Resize;
}

/** @deprecated For internal use only */
export interface BaseTextAreaProps extends TextAreaStyleProps, BaseViewProps {
  /**
   * @description
   * Specifies permissions for browser UA to autocomplete field.
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: string;

  /**
   * @description
   * Use this to provide a default value for an uncontrolled field.
   */
  defaultValue?: React.AllHTMLAttributes<'textarea'>['defaultValue'];

  /**
   * @description
   * Indicates that Field is in error state.
   */
  hasError?: boolean;

  /**
   * @description
   *  Determines whether field should be disabled.
   * @default
   * false
   */
  isDisabled?: boolean;

  /**
   * @description
   * @see
   *[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly)
   * @default
   * false
   */
  isReadOnly?: boolean;

  /**
   * @description
   * Whether field should be marked required.
   */
  isRequired?: boolean;

  /**
   * @description
   * Text contents maximum length.
   */
  maxLength?: number;

  /**
   * @description
   * Name of the field. Submitted with the form as part of a name/value pair.
   */
  name?: string;

  /**
   * @description
   * Placeholder text shown when field is empty
   * Accessibility tip: avoid putting important instructions for
   * filling out the TextField in the placeholder. Use descriptiveText
   * for important instructions.
   */
  placeholder?: string;

  /**
   * @description
   * Controls height based on number of rows of text to display.
   */
  rows?: number;

  /**
   * @description
   * Changes the font-size, padding, and height of the field.
   */
  size?: Sizes;

  /**
   * @description
   * If value is provided, this will be a controlled field.
   */
  value?: React.AllHTMLAttributes<'textarea'>['value'];

  /**
   * @description
   * Variants
   */
  variation?: FieldVariations;
}
export type TextAreaProps<Element extends ElementType = 'textarea'> =
  PrimitiveProps<BaseTextAreaProps, Element>;
