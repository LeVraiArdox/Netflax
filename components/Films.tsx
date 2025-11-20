import React from 'react';
import { StyleSheet, Image, Pressable, ActivityIndicator, ColorSchemeName } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import M3SearchBar from './M3SearchBar';

const queryClient = new QueryClient();

export type Film = {
  id: number;
  title: string;
  description: string;
  director: string;
  image: string;
};

const Card = ({ film }: { film: Film }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>{film.title}</Text>
      <Text style={styles.descText}>{film.description}</Text>
      <Image style={styles.image} source={{ uri: film.image || 'https://powerspaces.com/wp-content/uploads/2024/09/placeholder-2.png' }} />
      <Link href={{
        pathname: '/modal',
        params: { title: film.title, description: film.description, director: film.director, image: film.image, type: 'film' },
      }} asChild>
        <Pressable style={styles.button}>
          <MaterialIcons name="play-arrow" size={24} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Voir le film</Text>
        </Pressable>
      </Link>
    </View>
  );
};

function FilmsList({ searchQuery }: { searchQuery: string }) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const SERVER_URL = process.env.EXPO_PUBLIC_FILM_SERVER || '';

  const { data: series, error, isLoading } = useQuery<Film[]>({
    queryKey: ['filmsData'],
    queryFn: async () => {
      const response = await fetch(SERVER_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  
  if (error) {
    console.error('Error fetching films data:', error);
    return <Text>Error loading data</Text>;
  }

  const filteredFilms = (series || []).filter((film) => 
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {filteredFilms.map((film) => (
        <Card key={film.id} film={film} />
      ))}
      {filteredFilms.length === 0 && series && (
        <Text style={{ marginTop: 20, opacity: 0.5 }}>No results found</Text>
      )}
    </View>
  );
}

export default function FilmsOfTheMoment({ path }: { path: string }) {
  const [search, setSearch] = React.useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <M3SearchBar value={search} onChangeText={setSearch} />
        <FilmsList searchQuery={search}  />
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