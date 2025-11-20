import React from 'react';
import { View, Pressable, StyleSheet, ColorSchemeName } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface FABProps {
    clicked?: () => void;
    href?: string;
}

export default function FAB({ clicked, href }: FABProps) {
  const styles = getStyles(useColorScheme());
  return (
    <View style={styles.fab}>
        <Link href={(href ?? '') as any} asChild>
            <Pressable onPress={clicked}>
                <MaterialIcons name="add" style={styles.fabIcon} />
            </Pressable>
        </Link>
    </View>
  );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  const themeColors = Colors[colorScheme ?? 'light'];

  return StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 75,
      height: 75,
      borderRadius: 25,
      backgroundColor: themeColors.tertiary,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    fabIcon: {
      color: themeColors.onTertiary,
      fontSize: 30,
    },
  });
}