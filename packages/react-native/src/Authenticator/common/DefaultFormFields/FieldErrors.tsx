import React from 'react';
import { Text, View } from 'react-native';

import type { FieldErrorsProps } from './types';

export const FieldErrors = ({
  errors,
  errorStyle,
  style,
}: FieldErrorsProps): React.JSX.Element | null => {
  if (!errors || !errors.length) {
    return null;
  }

  return (
    <View style={style}>
      {errors.map((error) => (
        <Text key={error} style={errorStyle}>
          {error}
        </Text>
      ))}
    </View>
  );
};
