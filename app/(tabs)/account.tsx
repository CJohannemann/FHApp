import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <ImageBackground source={require('@/assets/images/animals.jpg')} style={styles.card}>
          <Text style={styles.cardTitle}>Animals</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add Animal')}>
            <Ionicons name="add-circle" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.cardContainer}>
        <ImageBackground source={require('@/assets/images/crops.jpg')} style={styles.card}>
          <Text style={styles.cardTitle}>Crops</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add Crop')}>
            <Ionicons name="add-circle" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.cardContainer}>
        <ImageBackground source={require('@/assets/images/equipment.jpg')} style={styles.card}>
          <Text style={styles.cardTitle}>Equipment</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add Equipment')}>
            <Ionicons name="add-circle" size={30} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
