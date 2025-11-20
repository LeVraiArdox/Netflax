import React from 'react';
import { View, TextInput, StyleSheet, ColorSchemeName } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function M3SearchBar({ value, onChangeText }: SearchBarProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={25} style={styles.icon} />
      
      <TextInput
        style={styles.input}
        placeholder="Trouvez votre contenu"
        placeholderTextColor={Colors[colorScheme ?? 'light'].onSurfaceVariant}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  const themeColors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.surfaceContainerHighest,
      borderRadius: 30,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 16,
      color: themeColors.onSurfaceVariant,
    },
    icon: {
      color: themeColors.onSurfaceVariant,
    }
  });
}