import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

export interface SetupTotpStyle {
  secretKeyText: TextStyle;
}

export const styles: SetupTotpStyle = StyleSheet.create({
  // TODO: replace with tokens
  secretKeyText: { flexWrap: 'wrap', paddingVertical: 4, marginHorizontal: 8 },
});
