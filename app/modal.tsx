import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import About from '@/components/About';
import { Text, View } from '@/components/Themed';

import { Episode } from '@/components/Series';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useLocalSearchParams } from 'expo-router';

export default function ModalScreen() {
  const { title, description, director, episodes, imageUrl } = useLocalSearchParams() as unknown as {
    id: string;
    title: string;
    description: string;
    director: string;
    episodes: Episode[];
    imageUrl: string;
  };

  const style = styles();
  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={style.title}>{title}</Text>
        <View style={style.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <About title={title} description={description} director={director} episodes={episodes} imageUrl={imageUrl} />
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
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].primary,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
}