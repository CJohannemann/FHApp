import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Weather App</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('Weather')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
