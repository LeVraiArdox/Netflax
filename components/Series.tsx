import React from 'react';
import { StyleSheet, Image, Pressable, ActivityIndicator, ColorSchemeName } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export type Serie = {
  id: number;
  title: string;
  description: string;
  director: string;
  episodes: Episode[];
  imageUrl: string;
};

export type Episode = {
  id: number;
  title: string;
  description: string;
  duration: string;
};

const Card = ({ serie }: { serie: Serie }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>{serie.title}</Text>
      <Text style={styles.descText}>{serie.description}</Text>
      <Image style={styles.image} source={{ uri: serie.imageUrl || 'https://powerspaces.com/wp-content/uploads/2024/09/placeholder-2.png' }} />
      <Link href={{
        pathname: '/modal',
        params: { title: serie.title, description: serie.description, director: serie.director, episodes: JSON.stringify(serie.episodes), imageUrl: serie.imageUrl, type: 'series'},
      }} asChild>
        <Pressable style={styles.button}>
          <MaterialIcons name="play-arrow" size={24} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Voir la série</Text>
        </Pressable>
      </Link>
    </View>
  );
};

function SeriesList() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const { data: series, error, isLoading } = useQuery<Serie[]>({
    queryKey: ['seriesData'],
    queryFn: async () => {
      const response = await fetch(process.env.EXPO_PUBLIC_SERIES_SERVER || '');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  
  if (error) {
    console.error('Error fetching series data:', error);
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      {(series || []).map((serie) => (
        <Card key={serie.id} serie={serie} />
      ))}
    </View>
  );
}

export default function ShowOfTheMoment({ path }: { path: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <SeriesList />
      </View>
    </QueryClientProvider>
  );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal: 50,
      marginVertical: 20,
    },
    descText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: 10,
      color: Colors[colorScheme ?? 'light'].onSecondaryContainer,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: Colors[colorScheme ?? 'light'].primary,
    },
    card: {
      backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 20,
    },
    image: {
      width: 250,
      resizeMode: 'cover',
      height: 375,
      borderRadius: 10,
      alignSelf: 'center',
    },
    button: {
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: Colors[colorScheme ?? 'light'].primary,
      borderRadius: 80,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      color: Colors[colorScheme ?? 'light'].onPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonIcon: {
      marginRight: 8,
      color: Colors[colorScheme ?? 'light'].onPrimary,
    },
  });
}