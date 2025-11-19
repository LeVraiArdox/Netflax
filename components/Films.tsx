import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from './Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type Film = {
  id: number;
  title: string;
  description: string;
  director: string;
  imageUrl: string;
};

const Card = ({ serie }: { serie: Film }) => (
  <View style={styles().card}>
    <Text style={styles().titleText}>{serie.title}</Text>
    <Text style={styles().descText}>{serie.description}</Text>
    <Image style={styles().image} source={{ uri: serie.imageUrl }} />
  </View>
);

const seriesData: Film[] = [
  {
    id: 1,
    title: 'Inception',
    description: 'Un voleur qui dérobe des secrets d\'entreprise grâce à la technologie du partage de rêves se voit offrir la chance de retrouver sa vie normale en accomplissant l\'impossible : l\'inception, l\'implantation d\'une idée dans l\'esprit d\'une cible.',
    director: 'Christopher Nolan',
    imageUrl: 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    description: 'Lorsque le criminel connu sous le nom de Joker sème le chaos à Gotham, Batman doit accepter l\'un des plus grands tests de sa capacité à lutter contre l\'injustice.',
    director: 'Christopher Nolan',
    imageUrl: 'https://fr.web.img2.acsta.net/medias/nmedia/18/63/97/89/18949761.jpg',
  },
  {
    id: 3,
    title: 'Interstellar',
    description: 'Un groupe d\'explorateurs utilise une faille récemment découverte dans l\'espace-temps pour dépasser les limites humaines et voyager vers une autre galaxie afin de sauver l\'humanité.',
    director: 'Christopher Nolan',
    imageUrl: 'https://thumb.canalplus.pro/http/unsafe/%7BresolutionXY%7D/filters:quality(%7BimageQualityPercentage%7D)/canalplus-cdn.canal-plus.io/p1/unit/4920580/canal-ouah_50001/JAQCANAL/1168392_0182-syiE',
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
      height: 375,
      resizeMode: 'cover',
      borderRadius: 10,
      alignSelf: 'center',
    },
  });
}