import { StyleSheet, ScrollView, Image } from 'react-native';

import { Text, View } from '@/components/Themed';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function UserTab() {
return (
    <View style={styles().container}>
        <View style={styles().userHeader}>
            <Image source={require('@/assets/images/avatar_placeholder.png')} style={styles().avatar} />
            <View>
                <Text style={styles().name}>John Doe</Text>
                <Text style={styles().userDesc}>Abonnement gratuit</Text>
            </View>
        </View>
        <View style={styles().userFavContainer}>
            <Text style={[styles().title, { margin: 10 }]}>Films et séries favoris</Text>
            {/* Liste des films et séries favoris de l'utilisateur */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Image
                        key={item}
                        source={require('@/assets/images/placeholder.png')}
                        style={{ width: '30%', height: 120, borderRadius: 5, marginBottom: 10 }}
                    />
                ))}
            </View>
        </View>
        <View style={styles().userCommentContainer}>
            <Text style={[styles().title, { margin: 10 }]}>Commentaires récents</Text>
            <View>
                {[1, 2, 3].map((item) => (
                    <View key={item} style={{ marginBottom: 15 }}>
                        <Text style={styles().name}>Film/Série {item}</Text>
                        <Text style={styles().userDesc}>C'était un super film ! J'ai adoré les effets spéciaux et l'intrigue.</Text>
                    </View>
                ))}
            </View>
        </View>
        <View style={{ height: 30 }}></View>
    </View>
);
}

const styles = () => {
const colorScheme = useColorScheme();
return StyleSheet.create({
    userHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        paddingVertical: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLowest,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors[colorScheme ?? 'light'].onSurface,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors[colorScheme ?? 'light'].onSurface,
    },
    userDesc: {
        fontSize: 14,
        color: Colors[colorScheme ?? 'light'].onSurfaceVariant,
    },
    userFavContainer: {
        marginTop: 20,
        width: '95%',
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
        borderRadius: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    userCommentContainer: {
        marginTop: 20,
        width: '95%',
        backgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
        borderRadius: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
});
}


