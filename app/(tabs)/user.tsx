import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import UserTab from '@/components/UserPage';

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles().container}>
        <UserTab />
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