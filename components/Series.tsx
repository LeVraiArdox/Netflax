import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

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

const Card = ({ serie }: { serie: Serie }) => (
  <View style={styles().card}>
    <Text style={styles().titleText}>{serie.title}</Text>
    <Text style={styles().descText}>{serie.description}</Text>
    <Image style={styles().image} source={{ uri: serie.imageUrl }} />
    <Link href={{
      pathname: '/modal',
      params: { title: serie.title, description: serie.description, director: serie.director, episodes: JSON.stringify(serie.episodes), imageUrl: serie.imageUrl },
    }} asChild>
      <Pressable style={styles().button}>
        <MaterialIcons name="play-arrow" size={24} style={styles().buttonIcon} />
        <Text style={styles().buttonText}>Voir la série</Text>
      </Pressable>
    </Link>
  </View>
);

const seriesData: Serie[] = [
  {
    id: 1,
    title: 'Stranger Things',
    description: 'Plongez dans l\'univers captivant de "Stranger Things", une série mêlant suspense, aventure et éléments surnaturels, qui vous tiendra en haleine à chaque épisode.',
    director: 'The Duffer Brothers',
    episodes: [
      { id: 1, title: 'Chapitre Un', description: 'La disparition de Will Byers', duration: '47 min' },
      { id: 2, title: 'Chapitre Deux', description: 'La recherche', duration: '55 min' },
      { id: 3, title: 'Chapitre Trois', description: 'Le Monde à l\'envers', duration: '51 min' },
    ],
    imageUrl: 'https://fr.web.img6.acsta.net/img/b6/40/b640b5857449902c32431fca38df4122.jpg',
  },
  {
    id: 2,
    title: 'La Casa de Papel',
    description: 'Découvrez "La Casa de Papel", une série palpitante qui suit un groupe de braqueurs audacieux dans leur quête pour réaliser le casse du siècle à la Fabrique nationale de la monnaie et du timbre en Espagne.',
    director: 'Álex Pina',
    episodes: [
      { id: 1, title: 'Épisode 1', description: 'Le plan.', duration: '70 min' },
      { id: 2, title: 'Épisode 2', description: 'La prise d\'otages.', duration: '75 min' },
      { id: 3, title: 'Épisode 3', description: 'Les négociations.', duration: '80 min' },
    ],
    imageUrl: 'https://fr.web.img6.acsta.net/pictures/21/08/02/16/08/1706767.jpg',
  },
  {
    id: 3,
    title: 'Dark',
    description: 'Explorez les mystères temporels de "Dark", une série allemande captivante qui mêle voyages dans le temps, secrets de famille et événements surnaturels dans la petite ville de Winden.',
    director: 'Baran bo Odar, Jantje Friese',
    episodes: [
      { id: 1, title: 'Épisode 1', description: 'Les disparus', duration: '53 min' },
      { id: 2, title: 'Épisode 2', description: 'Les secrets de Winden', duration: '55 min' },
      { id: 3, title: 'Épisode 3', description: 'Le voyage dans le temps', duration: '60 min' },
    ],
    imageUrl: 'https://fr.web.img4.acsta.net/pictures/17/11/10/12/18/2448823.jpg',
  },
];

export default function ShowOfTheMoment({ path }: { path: string }) {
  return (
    <View>
      <View style={styles().container}>
        {seriesData.map((serie) => (
          <Card key={serie.id} serie={serie} />
        ))}
      </View>
    </View>
  );
}

const styles = () => {
  const colorScheme = useColorScheme();
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