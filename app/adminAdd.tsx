import React from 'react';
import { View, Text } from '@/components/Themed';
import { StyleSheet, ColorSchemeName, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import TextArea from '@/components/TextArea';
import { router } from 'expo-router';

interface AdminAddProps {
    title: string;
    description: string;
    director: string;
    image?: string;
    season?: number;
    type: 'film' | 'series';
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
    const [type, setType] = React.useState<'film' | 'series'>('film');

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
        <View style={styles.container}>
            <Text style={styles.title}>Admin Add Content Page</Text>
            <TextArea placeholder="Type (film or series)" value={type} onChangeText={(text: string) => {
                // Allow typing by casting, validation should happen elsewhere or use a selector
                setType(text as 'film' | 'series');
                if (text === 'film' || text === 'series') {
                    setType(text);
                }
            }} />
            <TextArea placeholder="Title" value={title} onChangeText={setTitle} />
            <TextArea placeholder="Description" value={description} onChangeText={setDescription} />
            <TextArea placeholder="Director" value={director} onChangeText={setDirector} />
            <TextArea placeholder="Image URL" value={image} onChangeText={setImage} />
            {type === 'series' && (
                <TextArea placeholder="Season" value={season} onChangeText={setSeason} />
            )

            }
            <Pressable onPress={handleSubmit} style={{ marginTop: 20, backgroundColor: Colors[useColorScheme() ?? 'light'].primary, padding: 10, borderRadius: 5 }}>
                <Text style={{ color: Colors[useColorScheme() ?? 'light'].onPrimary, textAlign: 'center' }}>Submit</Text>
            </Pressable>
        </View>
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