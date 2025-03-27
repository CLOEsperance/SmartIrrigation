import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function IrrigationScreen() {
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes en secondes
  const [waterAmount, setWaterAmount] = useState(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isIrrigating && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
        setWaterAmount((prev) => prev + 0.1); // 0.1L par seconde
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsIrrigating(false);
    }
    return () => clearInterval(interval);
  }, [isIrrigating, timeRemaining]);

  useEffect(() => {
    if (isIrrigating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isIrrigating]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleIrrigation = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(300);
      setWaterAmount(0);
    }
    setIsIrrigating(!isIrrigating);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Irrigation en cours</Text>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        {/* Timer et statut */}
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerCircle, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            <Text style={styles.timerLabel}>Temps restant</Text>
          </Animated.View>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="water" size={24} color={Colors.primary} />
            <Text style={styles.statValue}>{waterAmount.toFixed(1)}L</Text>
            <Text style={styles.statLabel}>Eau utilisée</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="speedometer" size={24} color={Colors.primary} />
            <Text style={styles.statValue}>2.5L/min</Text>
            <Text style={styles.statLabel}>Débit</Text>
          </View>
        </View>

        {/* Contrôles */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              isIrrigating ? styles.stopButton : styles.startButton
            ]}
            onPress={toggleIrrigation}
          >
            <Ionicons
              name={isIrrigating ? "stop-circle" : "play-circle"}
              size={32}
              color={Colors.white}
            />
            <Text style={styles.controlButtonText}>
              {isIrrigating ? 'Arrêter' : 'Démarrer'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Informations de la culture */}
        <View style={styles.cropInfoCard}>
          <View style={styles.cropHeader}>
            <Image 
              source={require('../../assets/images/culture_tomate.jpg.png')}
              style={styles.cropIcon}
              resizeMode="contain"
            />
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>Tomate</Text>
              <Text style={styles.cropDate}>Plantée le 15/03/2024</Text>
            </View>
          </View>
          <View style={styles.cropDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Superficie</Text>
              <Text style={styles.detailValue}>50m²</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type de sol</Text>
              <Text style={styles.detailValue}>Argileux</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  timerText: {
    fontSize: 48,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
  },
  timerLabel: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: Colors.success,
  },
  stopButton: {
    backgroundColor: Colors.error,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8,
  },
  cropInfoCard: {
    backgroundColor: Colors.white,
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
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  cropDate: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  cropDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
  },
}); 