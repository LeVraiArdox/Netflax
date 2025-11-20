import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import AdminContentLine from '@/components/AdminContentLine';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FAB from '@/components/FAB';
import { Link } from 'expo-router';

const queryClient = new QueryClient();

export default function ModalScreen() {
    const style = styles();
    return (
        <QueryClientProvider client={queryClient}>
            <FAB href="/adminAdd" />
            <ScrollView style={{ backgroundColor: Colors[useColorScheme() ?? 'light'].surfaceContainerLowest }}>
            <View style={style.container}>
                <Text style={style.title}>Admin Panel</Text>
                <AdminContentLine />
            </View>
            </ScrollView>
        </QueryClientProvider>
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
      paddingVertical: 40,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors[colorScheme ?? 'light'].primary,
      marginVertical: 20,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
}