import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, ColorSchemeName, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useQuery } from '@tanstack/react-query';

async function fetchFilms() {
    return fetch(process.env.EXPO_PUBLIC_FILM_SERVER || '').then(res => res.json());
}

async function deleteFilm(id: number) {
    return fetch(`${process.env.EXPO_PUBLIC_FILM_SERVER}/${id}`, {
        method: 'DELETE',
    }).then(async (res) => {
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return res.json();
        }
        return { success: res.ok };
    });
}

async function fetchSeries() {
    return fetch(process.env.EXPO_PUBLIC_SERIES_SERVER || '').then(res => res.json());
}

async function deleteSerie(id: number) {
    return fetch(`${process.env.EXPO_PUBLIC_SERIES_SERVER}/${id}`, {
        method: 'DELETE',
    }).then(async (res) => {
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return res.json();
        }
        return { success: res.ok };
    });
}

export default function AdminContentLine() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const films = useQuery({
    queryKey: ['adminFilms'],
    queryFn: fetchFilms,
  });

  const series = useQuery({
    queryKey: ['adminSeries'],
    queryFn: fetchSeries,
  });
    
  return (
    <>
      {
        series.data?.map((serie: any) => 
        <View key={serie.id} style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="tv" size={24} color={Colors[colorScheme ?? 'light'].onSurface} style={{ marginRight: 10 }} />
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.label}>{serie.title}</Text>
                <Text style={styles.value}>{serie.description}</Text>
              </View>
            </View>
            <Pressable onPress={() => deleteSerie(serie.id)}>
                <MaterialIcons name="delete" size={24} style={styles.icon} />
            </Pressable>
        </View>
      )
      }
      {films.data?.map((film: any) => 
        <View key={film.id} style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="movie" size={24} color={Colors[colorScheme ?? 'light'].onSurface} style={{ marginRight: 10 }} />
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text style={styles.label}>{film.title}</Text>
                  <Text style={styles.value}>{film.description || '(Pas de description)'}</Text>
              </View>
            </View>
            <Pressable onPress={() => deleteFilm(film.id)}>
                <MaterialIcons name="delete" size={24} style={styles.icon} />
            </Pressable>
        </View>
      )}
    </>
  );
}

const getStyles = (colorScheme: ColorSchemeName) => {
  const themeColors = Colors[colorScheme ?? 'light'];

  return StyleSheet.create({
    container: {
      backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.onSurfaceVariant,
      marginRight: 4,
      flexWrap: 'wrap',
      maxWidth: 250,
    },
    value: {
      fontSize: 16,
      color: themeColors.onSurfaceVariant,
      flexWrap: 'wrap',
      maxWidth: 250,
    },
    icon: {
      color: themeColors.onSurfaceVariant,
    },
    });
}