import { StyleSheet, TextInput, ColorSchemeName } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function TextArea({ value, onChangeText, placeholder }: TextAreaProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  return (
    <TextInput
      style={styles.textArea}
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
      textAlignVertical: 'top',
      backgroundColor: themeColors.surfaceContainerHighest,
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      color: themeColors.onSurfaceVariant,
      marginVertical: 10,
    },
  });
}