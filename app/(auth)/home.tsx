import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        {/* En-tête */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>SmartIrrigation</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Widget Météo */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherMain}>
            <Ionicons name="sunny" size={40} color={Colors.primary} />
            <Text style={styles.temperature}>28°C</Text>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Ionicons name="water" size={20} color={Colors.primary} />
              <Text style={styles.weatherText}>65%</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Ionicons name="rainy" size={20} color={Colors.primary} />
              <Text style={styles.weatherText}>10mm</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Ionicons name="sunny" size={20} color={Colors.primary} />
              <Text style={styles.weatherText}>8h</Text>
            </View>
          </View>
        </View>

        {/* Message de bienvenue */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bonjour, Utilisateur</Text>
          <Text style={styles.welcomeSubtitle}>
            Voici les recommandations pour vos cultures aujourd'hui
          </Text>
        </View>

        {/* Carte de culture */}
        <View style={styles.cropCard}>
          <View style={styles.cropHeader}>
            <Image 
              source={require('../../assets/images/culture_tomate.jpg.png')}
              style={styles.cropIcon}
              resizeMode="contain"
            />
            <View style={styles.cropTitleContainer}>
              <Text style={styles.cropTitle}>Tomate</Text>
              <Text style={styles.cropSubtitle}>Plantée le 15/03/2024</Text>
            </View>
          </View>

          <View style={styles.recommendationsContainer}>
            <View style={styles.recommendationItem}>
              <Ionicons name="water" size={24} color={Colors.primary} />
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>Irrigation</Text>
                <Text style={styles.recommendationValue}>2.5L</Text>
              </View>
            </View>
            <View style={styles.recommendationItem}>
              <Ionicons name="time" size={24} color={Colors.primary} />
              <View style={styles.recommendationText}>
                <Text style={styles.recommendationTitle}>Prochaine irrigation</Text>
                <Text style={styles.recommendationValue}>Dans 2h</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.irrigationButton}
            onPress={() => router.push('/(auth)/irrigation')}
          >
            <Text style={styles.irrigationButtonText}>Démarrer l'irrigation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.primary,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: Colors.white,
  },
  settingsButton: {
    padding: 8,
  },
  weatherCard: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginLeft: 12,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginTop: 4,
  },
  welcomeCard: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  cropCard: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cropIcon: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  cropTitleContainer: {
    flex: 1,
  },
  cropTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  cropSubtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationText: {
    marginLeft: 12,
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  recommendationValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
  },
  irrigationButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  irrigationButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});
