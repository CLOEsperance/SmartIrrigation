import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Gardez l'écran de démarrage visible jusqu'à ce que les ressources soient prêtes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'RobotoMono-Regular': require('../assets/fonts/RobotoMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Masquer l'écran de démarrage une fois que les polices sont chargées ou s'il y a une erreur
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Ne pas rendre tant que les polices ne sont pas chargées
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="(public)/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(public)/welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(public)/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(public)/register"
          options={{
            title: "Inscription",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(public)/forgot-password"
          options={{
            title: "Mot de passe oublié",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(public)/language-select"
          options={{
            title: "Sélection de la langue",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/initial-config"
          options={{
            title: "Configuration Initiale",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/crop-config"
          options={{
            title: "Configuration des Cultures",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/irrigation"
          options={{
            title: "Irrigation",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
