import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';

const languages = [
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'fon', name: 'Fongbé', flag: '🇧🇯' },
  { id: 'yoruba', name: 'Yorùbá', flag: '🇳🇬' },
  { id: 'goun', name: 'Goun', flag: '🇧🇯' },
];

export default function LanguageSetupScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setTimeout(() => {
      router.replace('/(public)/login');
    }, 500);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/langue.webp')}
      style={styles.backgroundImage}
    >
      <StatusBar style="light" />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.delay(200)}
            style={styles.titleContainer}
          >
            <Text style={styles.title}>Choisissez votre langue</Text>
            <Text style={styles.subtitle}>
              Sélectionnez la langue dans laquelle vous souhaitez recevoir vos notifications
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(400)}
            style={styles.languagesContainer}
          >
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageButton,
                  selectedLanguage === language.id && styles.selectedLanguage
                ]}
                onPress={() => handleLanguageSelect(language.id)}
              >
                <Text style={styles.flag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.id && styles.selectedLanguageText
                ]}>
                  {language.name}
                </Text>
                {selectedLanguage === language.id && (
                  <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
                )}
              </TouchableOpacity>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInUp.delay(600)}
            style={styles.footer}
          >
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedLanguage && styles.disabledButton
              ]}
              onPress={() => handleLanguageSelect(selectedLanguage || '')}
              disabled={!selectedLanguage}
            >
              <Text style={styles.continueButtonText}>Continuer</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    padding: 8,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  languagesContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedLanguage: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageName: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.white,
  },
  selectedLanguageText: {
    color: Colors.white,
  },
  footer: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
}); 