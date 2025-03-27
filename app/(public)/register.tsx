import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    // Validation simple
    if (!formData.username || !formData.email || 
        !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      setIsLoading(true);
      
      // Simuler un délai d'inscription
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Implémenter la logique d'inscription réelle
      router.replace('/(auth)/initial-config');
    } catch (error) {
      // Gestion des erreurs
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.authForm}>
              <Text style={styles.title}>Inscription</Text>

              <View style={styles.formGroup}>
                <FontAwesome name="user" size={20} color="#888" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor="#888"
                  value={formData.username}
                  onChangeText={(value) => updateForm('username', value)}
                />
              </View>

              <View style={styles.formGroup}>
                <FontAwesome name="envelope" size={20} color="#888" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  value={formData.email}
                  onChangeText={(value) => updateForm('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="#888"
                  value={formData.password}
                  onChangeText={(value) => updateForm('password', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#888" 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor="#888"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateForm('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#888" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  isLoading && styles.buttonDisabled
                ]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                </Text>
              </TouchableOpacity>

              <View style={styles.formFooter}>
                <TouchableOpacity onPress={() => router.push('/(public)/login')}>
                  <Text style={styles.footerLink}>Déjà un compte? Se connecter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  authForm: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    position: 'relative',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  icon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
});
