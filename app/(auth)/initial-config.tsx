import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

export default function InitialConfigScreen() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnableLocation = async () => {
    setIsLoading(true);
    try {
      // Simulation de l'activation de la localisation
      // Dans l'implémentation réelle, nous utiliserons expo-location
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation d'une requête
      setLocationEnabled(true);
      
      // Ici, nous pourrions stocker les coordonnées pour une utilisation ultérieure
      // const { latitude, longitude } = await Location.getCurrentPositionAsync({});
      // await AsyncStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
      
      // Navigation automatique vers l'écran suivant une fois la localisation activée
      router.push('/(auth)/crop-config');
    } catch (error) {
      Alert.alert(
        "Erreur de localisation",
        "Impossible d'accéder à votre position. Veuillez vérifier les paramètres de localisation de votre appareil.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/signup.jpg.webp')}
      style={styles.backgroundImage}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.configForm}>
              <Image 
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
            <Text style={styles.title}>Configuration Initiale</Text>
              <Text style={styles.subtitle}>Votre localisation</Text>
              
              <Text style={styles.locationText}>
                {locationEnabled 
                  ? "Votre position a été détectée et affichée sur la carte."
                  : "Activez votre localisation pour voir votre position sur la carte."}
                    </Text>

              <Text style={styles.locationImportance}>
                La localisation est nécessaire pour :
                {'\n'}- Identifier les types de sols disponibles dans votre région
                {'\n'}- Obtenir des prévisions météo précises
                {'\n'}- Recevoir des recommandations d'irrigation adaptées
                    </Text>

              {/* Zone de la carte */}
              <View style={styles.mapContainer}>
                  <Image 
                    source={require('../../assets/images/map-benin.png')} 
                    style={styles.mapImage}
                    resizeMode="contain"
                  />
                {locationEnabled && (
                  <View style={styles.markerContainer}>
                    <View style={styles.marker}>
                      <Ionicons name="location" size={24} color={Colors.primary} />
                    </View>
                    </View>
                  )}
                </View>

              {/* Bouton d'activation de la localisation */}
              {!locationEnabled && (
                  <TouchableOpacity
                  style={[styles.enableLocationButton, isLoading && styles.enableLocationButtonDisabled]}
                  onPress={handleEnableLocation}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.enableLocationText}>Activation en cours...</Text>
                  ) : (
                    <>
                      <Ionicons name="location" size={20} color={Colors.white} />
                      <Text style={styles.enableLocationText}>Activer la localisation</Text>
                    </>
                  )}
                  </TouchableOpacity>
            )}
          </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 30,
    alignItems: 'center',
  },
  configForm: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 600,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 16,
  },
  locationImportance: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginBottom: 20,
    lineHeight: 20,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  marker: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  enableLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    gap: 8,
  },
  enableLocationButtonDisabled: {
    opacity: 0.7,
  },
  enableLocationText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
}); 