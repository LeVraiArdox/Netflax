import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Splash from '@/components/Splash'; 

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isSplashFinished, setSplashFinished] = useState(false);
  const colorScheme = useColorScheme(); // Moved up here to ensure unconditional execution
  
  const [loaded, error] = useFonts({
    Rubik: require('../assets/fonts/Rubik-Regular.ttf'), 
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isSplashFinished) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isSplashFinished]);


  if (!loaded) {
    return null; 
  }
  
  if (!isSplashFinished) {
    return (
      <Splash 
        onFinish={() => setSplashFinished(true)} 
      />
    );
  }
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}