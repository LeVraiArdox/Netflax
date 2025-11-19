import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles().getStartedContainer}>
        <Text
          style={styles().heroText}>
          Bienvenue sur Netflax! Retrouvez ici toutes les séries et films que vous aimez.
        </Text>
      </View>
    </View>
  );
}

const styles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    heroText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
      color: Colors[colorScheme ?? 'light'].onSecondaryContainer,
    }
  });
}