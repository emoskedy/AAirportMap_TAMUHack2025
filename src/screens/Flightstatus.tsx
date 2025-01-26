import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const FlightStatus = ({ navigation }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);  // Initially false
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);  // Track if search was performed

  const fetchFlights = async () => {
    if (!flightNumber || !date) {
      setError('Please enter both flight number and date.');
      return;
    }
    setError('');
    setLoading(true);  // Start loading when search is clicked
    try {
      const response = await axios.get(
        `https://flight-engine-af2u.onrender.com/flights?date=${date}&flightNumber=${flightNumber}`
      );
      console.log('API Response:', response.data);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data.');
    } finally {
      setLoading(false);  // Stop loading after request is done
      setSearched(true);  // Mark that the search has been performed
    }
  };

  const handleSearch = () => {
    fetchFlights();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Input Fields and Button */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Flight Number"
              value={flightNumber}
              onChangeText={setFlightNumber}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              keyboardType="default"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Loading Indicator */}
          {loading && (
            <Text style={styles.loadingText}>Loading...</Text>
          )}

          {/* Flight Data */}
          {searched && flights.length === 0 && !loading && (
            <Text style={styles.noResults}>No flights found. Try again with different data.</Text>
          )}

          {flights.length > 0 && !loading ? (
            flights.map((flight, index) => {
              const statusColor = flight.status === 'Delayed' ? '#f44336' : '#4caf50';

              return (
                <View key={index} style={styles.flightCard}>
                  {/* Flight Header */}
                  <Text style={styles.flightNumber}>Flight {flight.flightNumber}</Text>
                  <View style={styles.header}>
                    <Text style={styles.headerText}>
                      {flight.origin.city} → {flight.destination.city}
                    </Text>
                    <Text style={[styles.statusText, { color: statusColor }]}>{flight.status}</Text>
                  </View>

                  {/* Flight Details */}
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <View>
                        <Text style={styles.label}>Depart</Text>
                        <Text style={styles.time}>{new Date(flight.departureTime).toLocaleDateString()}</Text>
                        <Text style={styles.time}>{new Date(flight.departureTime).toLocaleTimeString()}</Text>
                        <Text style={styles.location}>{flight.origin.city} ({flight.origin.code})</Text>
                      </View>
                      <View>
                        <Text style={styles.label}>Arrive</Text>
                        <Text style={styles.time}>{new Date(flight.arrivalTime).toLocaleDateString()}</Text>
                        <Text style={styles.time}>{new Date(flight.arrivalTime).toLocaleTimeString()}</Text>
                        <Text style={styles.location}>{flight.destination.city} ({flight.destination.code})</Text>
                      </View>
                    </View>
                  </View>

                  {/* Aircraft Information */}
                  <View style={styles.aircraftContainer}>
                    <Text style={styles.aircraftLabel}>Aircraft Type</Text>
                    <Text style={styles.aircraftText}>{flight.aircraft.model}</Text>
                    <Image
                      source={require('../../assets/aircraft_pic.png')} // Ensure this path is correct
                      style={styles.aircraftImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              );
            })
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#aa0000',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  aircraftContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  aircraftLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aircraftText: {
    fontSize: 16,
  },
  aircraftImage: {
    width: '90%',
    height: 150,
  },
});

export default FlightStatus;
