import { StyleSheet, Image, StatusBar } from 'react-native';

import Welcome from '@/components/Welcome';
import { Text, View } from '@/components/Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabOneScreen() {
  return (
    <View style={styles().container}>
      <Image
        source={require('../../assets/images/netflix.png')}
        style={{ width: 200, height: 100, resizeMode: 'contain', marginTop: 20 }}
      />
      <View style={styles().separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Welcome path="app/(tabs)/welcome.tsx" />
    </View>
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
