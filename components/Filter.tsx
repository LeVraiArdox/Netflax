import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { View, Text, StyleSheet, ColorSchemeName, Pressable } from 'react-native';

interface FilterProps {
    filterBy: string;
    onFilterChange: (newFilter: string) => void;
}

export default function Filter({ filterBy, onFilterChange }: FilterProps) {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);

    const handlePress = () => {
        const newFilter = filterBy === 'Ordre alphabétique' ? 'Popularité' : 'Ordre alphabétique';
        onFilterChange(newFilter);
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <MaterialIcons name="filter-list" size={24} style={styles.icon} />
            <Text style={styles.text}>Filter par: {filterBy}</Text>
        </Pressable>
    );
}

const getStyles = (colorScheme: ColorSchemeName) => {
    const themeColors = Colors[colorScheme ?? 'light'];

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeColors.surfaceContainerHighest,
            borderRadius: 30,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginHorizontal: 20,
            marginVertical: 10,
        },
        text: {
            marginLeft: 10,
            fontSize: 16,
            color: themeColors.onSurfaceVariant,
        },
        icon: {
            color: themeColors.onSurfaceVariant,
        }
    });
}  