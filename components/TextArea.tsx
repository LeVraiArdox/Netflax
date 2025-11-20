import { StyleSheet, TextInput, ColorSchemeName } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}

export default function TextArea({ value, onChangeText, placeholder, style }: TextAreaProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  return (
    <TextInput
      style={[styles.textArea, style]}
      multiline
      numberOfLines={4}
      placeholder={placeholder || "Écrivez ici..."}
      placeholderTextColor={Colors[colorScheme ?? 'light'].onSurfaceVariant}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  const themeColors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    textArea: {
      height: 50,
      width: '90%',
      backgroundColor: themeColors.surfaceContainerHigh,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      padding: 10,
      fontSize: 16,
      color: themeColors.onSurfaceVariant,
      marginVertical: 10,
      borderBottomColor: themeColors.outlineVariant,
      borderBottomWidth: 1,
    },
  });
}