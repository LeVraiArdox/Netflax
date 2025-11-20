import React, {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

interface SwitchProps {
  enabled: boolean;
  onToggle: () => void;
  style?: object;
}

export default function SwitchComponent({enabled, onToggle, style}: SwitchProps) {
  const colorScheme = useColorScheme();

  return (
        <Switch
          trackColor={{false: Colors[colorScheme ?? 'light'].secondaryContainer, true: Colors[colorScheme ?? 'light'].onPrimary}}
          thumbColor={enabled ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].surfaceContainer}
          onValueChange={onToggle}
          value={enabled}
          style={[{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }, style]}
        />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});