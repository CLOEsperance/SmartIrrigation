import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Crop = {
  id: string;
  name: string;
  image: any;
  selected: boolean;
  details?: {
    soilType: string;
    area: string;
    plantingDate: string;
    compatibleSoils?: string[];
  };
};

const initialCrops: Crop[] = [
  {
    id: 'tomato',
    name: 'Tomate',
    image: require('../../assets/images/culture_tomate.jpg.png'),
    selected: false,
    details: {
      compatibleSoils: ['sandy', 'loamy']
    }
  },
  {
    id: 'lettuce',
    name: 'Laitue',
    image: require('../../assets/images/lettuce.png'),
    selected: false,
    details: {
      compatibleSoils: ['loamy', 'clay']
    }
  },
  {
    id: 'corn',
    name: 'Maïs',
    image: require('../../assets/images/corn.png'),
    selected: false,
    details: {
      compatibleSoils: ['sandy', 'loamy', 'clay']
    }
  },
];

const soilTypes = [
  { id: 'sandy', name: 'Sablonneux', description: 'Sol léger et bien drainé' },
  { id: 'clay', name: 'Argileux', description: 'Sol lourd et retient bien l\'eau' },
  { id: 'loamy', name: 'Limoneux', description: 'Sol équilibré, idéal pour la plupart des cultures' },
  { id: 'ferralitic', name: 'Ferrallitique', description: 'Sol rouge, riche en fer' },
  { id: 'hydromorphic', name: 'Hydromorphe', description: 'Sol humide, adapté aux rizières' },
];

export default function CropConfigScreen() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedSoils, setSelectedSoils] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [surfaceArea, setSurfaceArea] = useState('');

  const handleCropSelect = (cropId: string) => {
    setCrops(crops.map(crop => 
      crop.id === cropId ? { ...crop, selected: !crop.selected } : crop
    ));
    setSelectedCrop(crops.find(crop => crop.id === cropId) || null);
    setSelectedSoils([]);
  };

  const handleSoilToggle = (soilId: string) => {
    if (selectedCrop?.details?.compatibleSoils) {
      if (selectedSoils.includes(soilId)) {
        setSelectedSoils(selectedSoils.filter(id => id !== soilId));
      } else if (selectedCrop.details.compatibleSoils.includes(soilId)) {
        setSelectedSoils([...selectedSoils, soilId]);
      }
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Alert.alert('Erreur', 'La date de plantation ne peut pas être dans le passé');
        return;
      }

      setTempDate(selectedDate);
      if (selectedCrop) {
        setSelectedCrop({
          ...selectedCrop,
          details: { ...selectedCrop.details, plantingDate: selectedDate.toISOString() }
        });
      }
    }
  };

  const handleSaveCrop = () => {
    if (!selectedCrop || selectedSoils.length === 0 || !surfaceArea) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCrops(crops.map(crop =>
      crop.id === selectedCrop.id ? { 
        ...crop, 
        details: { 
          ...selectedCrop.details, 
          soilType: selectedSoils.join(', '),
          area: surfaceArea 
        } 
      } : crop
    ));
    setSelectedCrop(null);
    setSurfaceArea('');
    setSelectedSoils([]);
    Alert.alert('Succès', 'Culture enregistrée avec succès');
  };

  const handleFinish = () => {
    const configuredCrops = crops.filter(crop => crop.selected && crop.details?.area);
    if (configuredCrops.length === 0) {
      Alert.alert('Erreur', 'Veuillez configurer au moins une culture');
      return;
    }
    Alert.alert(
      'Configuration terminée',
      'Vos informations ont été bien enregistrées',
      [{ text: 'OK', onPress: () => router.push('/(auth)/irrigation') }]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
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
            <View style={styles.cropConfigForm}>
              <Text style={styles.title}>Configuration des Cultures</Text>
              <Text style={styles.subtitle}>
                Sélectionnez vos cultures et configurez leurs détails
              </Text>

              {/* Sélection des cultures */}
              <View style={styles.cropSelection}>
                {crops.map(crop => (
                  <TouchableOpacity
                    key={crop.id}
                    style={[
                      styles.cropOption,
                      crop.selected && styles.cropOptionSelected,
                    ]}
                    onPress={() => handleCropSelect(crop.id)}
                  >
                    <Image 
                      source={crop.image} 
                      style={styles.cropImage}
                      resizeMode="cover"
                    />
                    <Text style={[
                      styles.cropName,
                      crop.selected && styles.cropNameSelected
                    ]}>
                      {crop.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Formulaire de configuration */}
              {selectedCrop && (
                <View style={styles.detailsForm}>
                  <Text style={styles.formTitle}>Configuration de {selectedCrop.name}</Text>
                  
                  {/* Types de sols */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Types de sols disponibles</Text>
                    <View style={styles.soilGrid}>
                      {soilTypes.map(soil => {
                        const isCompatible = selectedCrop.details?.compatibleSoils?.includes(soil.id);
                        const isSelected = selectedSoils.includes(soil.id);

                        return (
                          <TouchableOpacity
                            key={soil.id}
                            style={[
                              styles.soilButton,
                              !isCompatible && styles.soilButtonIncompatible,
                              isSelected && styles.soilButtonSelected,
                            ]}
                            onPress={() => isCompatible && handleSoilToggle(soil.id)}
                            disabled={!isCompatible}
                          >
                            <Text style={[
                              styles.soilButtonText,
                              !isCompatible && styles.soilButtonTextIncompatible,
                              isSelected && styles.soilButtonTextSelected,
                            ]}>
                              {soil.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Superficie */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Superficie cultivée (m²)</Text>
                    <TextInput
                      style={styles.input}
                      value={surfaceArea}
                      onChangeText={setSurfaceArea}
                      keyboardType="numeric"
                      placeholder="Entrez la superficie"
                    />
                  </View>

                  {/* Date de plantation */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Date de plantation</Text>
                    <TouchableOpacity 
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text style={styles.dateText}>
                        {selectedCrop.details?.plantingDate 
                          ? formatDate(selectedCrop.details.plantingDate)
                          : 'Sélectionnez une date'}
                      </Text>
                      <Ionicons name="calendar" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>

                  {showDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={tempDate}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveCrop}
                  >
                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Liste des cultures configurées */}
              <View style={styles.selectedCrops}>
                <Text style={styles.sectionTitle}>Cultures configurées</Text>
                {crops.filter(crop => crop.selected && crop.details?.area).map(crop => (
                  <View key={crop.id} style={styles.selectedCropItem}>
                    <Image source={crop.image} style={styles.selectedCropImage} />
                    <View style={styles.selectedCropInfo}>
                      <Text style={styles.selectedCropName}>{crop.name}</Text>
                      <Text style={styles.selectedCropDetails}>
                        Sol: {crop.details?.soilType}
                      </Text>
                      <Text style={styles.selectedCropDetails}>
                        Surface: {crop.details?.area}m²
                      </Text>
                      <Text style={styles.selectedCropDetails}>
                        Planté le: {formatDate(crop.details?.plantingDate || '')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Bouton Terminer */}
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinish}
              >
                <Text style={styles.finishButtonText}>Terminer la configuration</Text>
              </TouchableOpacity>
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
  cropConfigForm: {
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
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  cropSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cropOption: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cropOptionSelected: {
    backgroundColor: Colors.primary,
  },
  cropImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
  },
  cropNameSelected: {
    color: Colors.white,
  },
  detailsForm: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  soilGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soilButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  soilButtonIncompatible: {
    opacity: 0.5,
  },
  soilButtonSelected: {
    backgroundColor: Colors.primary,
  },
  soilButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: Colors.darkGray,
  },
  soilButtonTextIncompatible: {
    color: Colors.gray,
  },
  soilButtonTextSelected: {
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  selectedCrops: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  selectedCropItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCropImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  selectedCropInfo: {
    flex: 1,
  },
  selectedCropName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  selectedCropDetails: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.darkGray,
  },
  finishButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  finishButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
}); 