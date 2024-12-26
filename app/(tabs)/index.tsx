import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      if (loc) {
        const { latitude, longitude } = loc.coords;
        const formattedLatitude = parseFloat(latitude.toFixed(4));
        const formattedLongitude = parseFloat(longitude.toFixed(4));
        setLatitude(formattedLatitude);
        setLongitude(formattedLongitude);
        fetchLocationData(formattedLatitude, formattedLongitude);
      }
    })();
  }, []);

  const fetchLocationData = async (lat: number, lon: number) => {
    const url = `https://api.weather.gov/points/${lat},${lon}`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.properties && response.data.properties.forecast) {
        const forecastUrl = response.data.properties.forecast;
        fetchWeather(forecastUrl);
      } else {
        console.error('Forecast URL not found in response data.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const fetchWeather = async (forecastUrl: string) => {
    try {
      const response = await axios.get(forecastUrl);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getWeatherIcon = (shortForecast: string) => {
    if (shortForecast.includes('Sunny')) {
      return <Fontisto name="day-sunny" size={24} color="black" />;
    } else if (shortForecast.includes('Partly Cloudy') || shortForecast.includes('Mostly Sunny')) {
      return <Ionicons name="partly-sunny-outline" size={24} color="black" />;
    } else if (shortForecast.includes('Cloudy') || shortForecast.includes('Overcast')) {
      return <MaterialCommunityIcons name="weather-windy" size={24} color="black" />;
    } else if (shortForecast.includes('Snow')) {
      return <FontAwesome name="snowflake-o" size={24} color="black" />;
    } else if (shortForecast.includes('Rain') || shortForecast.includes('Showers')) {
      return <FontAwesome5 name="cloud-rain" size={24} color="black" />;
    } else {
      return null;
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.container}>
        {weather && weather.properties && weather.properties.periods ? (
          <>
            <TouchableOpacity style={styles.weatherContainer} onPress={toggleModal}>
              {getWeatherIcon(weather.properties.periods[0].shortForecast)}
              <Text style={styles.weatherText}>
                {`Temperature: ${weather.properties.periods[0].temperature}°F`}
              </Text>
            </TouchableOpacity>
            <Modal 
              isVisible={isModalVisible} 
              onBackdropPress={toggleModal} 
              useNativeDriver={false}
              animationIn={"fadeIn"} 
              animationOut={"fadeOut"} 
              backdropTransitionInTiming={0} 
              backdropTransitionOutTiming={0}
              hideModalContentWhileAnimating={true} 
            >
              <TouchableOpacity style={styles.modalContent} onPress={toggleModal}>
                <Text style={styles.modalTitle}>Forecast</Text>
                <ScrollView>
                  {weather.properties.periods.slice(0, 10).map((period: any, index: number) => (
                    <View key={index} style={styles.forecastItem}>
                      {getWeatherIcon(period.shortForecast)}
                      <Text style={styles.forecastText}>
                        {`${period.name}: ${period.temperature}°F - ${period.shortForecast}`}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </TouchableOpacity>
            </Modal>
          </>
        ) : (
          <Text style={styles.weatherText}>Loading weather data...</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 10,
    top: 0,
    left: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1, // Ensure it appears on top
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 18,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  forecastText: {
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1,
  },
});
