import { StyleSheet, ScrollView } from 'react-native';

import Series from '@/components/Series';
import { Text, View } from '@/components/Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles().container}>
        <Series path="app/(tabs)/series.tsx" />
      </View>
    </ScrollView>
  );
}

const styles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLowest,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
}