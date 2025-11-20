import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, Image, Appearance } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View, Text } from '@/components/Themed';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      key={`tabs-${colorScheme ?? 'light'}`}
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].onPrimary,
      tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].primary,
      tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].surfaceContainerLow,
      tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].secondary,
      tabBarItemStyle: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 12,
        marginVertical: 6,
        height: 48,
      },
      tabBarStyle: {
        backgroundColor: Colors[colorScheme ?? 'light'].surface,
        borderTopWidth: 0,
      },
      headerStyle: {
        backgroundColor: Colors[colorScheme ?? 'light'].surface,
      },
      // Disable the static render of the header on web
      // to prevent a hydration error in React Navigation v6.
      headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
      name="welcome"
      options={{
        headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
          source={require('@/assets/images/netflix-sigle.png')} 
          style={{ width: 60, height: 34 }}
          resizeMode="contain"
          />
          <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].onSecondaryContainer }}>
          Bienvenue
          </Text>
        </View>
        ),
        tabBarIcon: ({ color }) => <TabBarIcon name="handshake" color={color} />,
        headerRight: () => (
        <Pressable style={{ marginRight: 15, backgroundColor: Colors[colorScheme ?? 'light'].secondaryContainer, padding: 6, width: 60, borderRadius: 80, alignItems: 'center'}}
        
          onPress={() => {
          Appearance.setColorScheme(Appearance.getColorScheme() !== 'dark' ? 'dark' : 'light');
          }}
        >
          <MaterialIcons name={colorScheme == "light" ? "brightness-7" : "brightness-2"} size={25} color={Colors[colorScheme ?? 'light'].onSecondaryContainer}/>
        </Pressable>
        ),
      }}
      />
      <Tabs.Screen
      name="series"
      options={{
        headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('@/assets/images/netflix-sigle.png')} 
          style={{ width: 60, height: 34 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].onSecondaryContainer }}>
          Séries du moment
        </Text>
        </View>
        ),
        tabBarIcon: ({ color }) => <TabBarIcon name="tv" color={color} />,
        headerRight: () => (
        <Link href="/admin" asChild>
          <Pressable style={{ marginRight: 15, backgroundColor: Colors[colorScheme ?? 'light'].secondaryContainer, padding: 6, width: 60, borderRadius: 80, alignItems: 'center'}}>
            <MaterialIcons name="admin-panel-settings" size={25} color={Colors[colorScheme ?? 'light'].onSecondaryContainer}/>
          </Pressable>
        </Link>
        ),
      }}
      />
      <Tabs.Screen
      name="films"
      options={{
        headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('@/assets/images/netflix-sigle.png')} 
          style={{ width: 60, height: 34 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].onSecondaryContainer }}>
          Films populaires
        </Text>
        </View>
        ),
        tabBarIcon: ({ color }) => <TabBarIcon name="local-movies" color={color} />,
      }}
      />
      <Tabs.Screen
      name="user"
      options={{
        headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('@/assets/images/netflix-sigle.png')} 
          style={{ width: 60, height: 34 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].onSecondaryContainer }}>
          Votre espace
        </Text>
        </View>
        ),
        tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
      }}
      />
    </Tabs>
  );
}
