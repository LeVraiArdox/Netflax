import React from 'react';
import { View, Text } from '@/components/Themed';
import { StyleSheet, ColorSchemeName, Pressable, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import TextArea from '@/components/TextArea';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import SwitchComponent from '@/components/Switch';

interface AdminAddProps {
    title: string;
    description: string;
    director: string;
    image?: string;
    season?: number;
    type: 'film' | 'serie';
}

async function addNewSerie(data: any) {
    return fetch(process.env.EXPO_PUBLIC_SERIES_SERVER!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    });
}

async function addNewFilm(data: any) {
    return fetch(process.env.EXPO_PUBLIC_FILM_SERVER!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    });
}

export default function AdminAdd() {
    const styles = getStyles(useColorScheme());
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [director, setDirector] = React.useState('');
    const [image, setImage] = React.useState('');
    const [season, setSeason] = React.useState('');
    const [type, setType] = React.useState<'film' | 'serie'>('film');

    const handleSubmit = async () => {
        const data: AdminAddProps = { title, description, director, image, season: Number(season), type };
        if (type === 'film') {
            await addNewFilm(data);
        } else {
            await addNewSerie(data);
        }
        router.replace('/admin');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialIcons name="lightbulb" size={24} color={Colors[useColorScheme() ?? 'light'].onSurface} style={{ margin: 10 }} />
                <Text style={styles.title}>Ajouter un nouveau contenu</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.entryTitle}>Type: {type}</Text>
                <SwitchComponent enabled={type === 'serie'} onToggle={() => setType(type === 'film' ? 'serie' : 'film')} style={{ marginRight: 20 }} />
            </View>
            {/* <Text style={styles.entryTitle}>Titre</Text> */}
            <TextArea placeholder="Titre" value={title} onChangeText={setTitle} />
            {/* <Text style={styles.entryTitle}>Description</Text> */}
            <TextArea placeholder="Description" value={description} onChangeText={setDescription} />
            {/* <Text style={styles.entryTitle}>Réalisateur</Text> */}
            <TextArea placeholder="Réalisateur" value={director} onChangeText={setDirector} />
            {/* <Text style={styles.entryTitle}>Image URL</Text> */}
            <TextArea placeholder="Image URL" value={image} onChangeText={setImage} />
            {type === 'serie' && (
                <>
                    {/* <Text style={styles.entryTitle}>Saisons</Text> */}
                    <TextArea placeholder="Saisons" value={season} onChangeText={setSeason} />
                </>
            )

            }
            <Pressable onPress={handleSubmit} style={{ marginTop: 20, backgroundColor: Colors[useColorScheme() ?? 'light'].primary, padding: 10, borderRadius: 5 }}>
                <Text style={{ color: Colors[useColorScheme() ?? 'light'].onPrimary, textAlign: 'center' }}>Submit</Text>
            </Pressable>
        </ScrollView>
    );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLowest,
    },
    title: {
      fontSize: 20,
      color: Colors[colorScheme ?? 'light'].onSurface,
      margin: 10,
    },
    titleContainer: {
      marginBottom: 20,
      alignItems: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].tertiaryContainer,
      padding: 10,
      borderRadius: 30,
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    entryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[colorScheme ?? 'light'].onSurfaceVariant,
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginTop: 10,
    },
  });
}