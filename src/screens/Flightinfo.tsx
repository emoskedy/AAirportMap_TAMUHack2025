import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Flightinfo = ({ navigation, route }: any) => {
  const user = route?.params?.user || {
    flightInfo: {
      flightID: 'N/A',
      origin: 'N/A',
      destination: 'N/A',
      departureTime: 'N/A',
      arrivalTime: 'N/A',
      gate: 'N/A',
      terminal: 'N/A',
      arrivalGate: 'N/A',
      arrivalTerminal: 'N/A',
      baggageClaim: 'N/A',
      aircraftType: 'N/A',
      status: 'N/A',
      flightClass: 'N/A'
    },
  };

  const statusColor = user.flightInfo.status === 'Delayed' ? '#f44336' : '#4caf50';

  const handleLogout = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.mainContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {user.flightInfo.origin} → {user.flightInfo.destination}
              </Text>
              <Text style={styles.dateText}>Sunday, January 26, 2025</Text>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {user.flightInfo.status}
              </Text>
            </View>

            {/* Flight Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.flightNumber}>Flight {user.flightInfo.flightID}</Text>
              <View style={styles.summaryRow}>
                <View>
                  <Text style={styles.label}>Depart</Text>
                  <Text style={styles.time}>{user.flightInfo.departureTime}</Text>
                  <Text style={styles.location}>{user.flightInfo.origin}</Text>
                  <Text style={styles.details}>
                    Gate {user.flightInfo.gate}, Terminal {user.flightInfo.terminal}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Arrive</Text>
                  <Text style={styles.time}>{user.flightInfo.arrivalTime}</Text>
                  <Text style={styles.location}>{user.flightInfo.destination}</Text>
                  <Text style={styles.details}>
                    Gate {user.flightInfo.arrivalGate}, Terminal{' '}
                    {user.flightInfo.arrivalTerminal}
                  </Text>
                </View>
              </View>
            </View>

            {/* Aircraft Details */}
            <View style={styles.aircraftContainer}>
              <Text style={styles.aircraftLabel}>Aircraft Type</Text>
              <Image
                source={require('../../assets/aircraft_pic.png')} // Ensure the path is correct
                style={styles.aircraftImage}
                resizeMode="contain"
              />
              <Text style={styles.aircraftText}>{user.flightInfo.aircraftType}</Text>
            </View>

            {/* Recommendation Button */}
            <TouchableOpacity
              style={styles.recommendationButton}
              onPress={() => navigation.navigate('Recommendation', { userData: user })}
            >
              <Text style={styles.recommendationButtonText}>Go to Recommendation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtonsContainer}>
          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity
              style={[styles.circleButton, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Icon name="logout" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, styles.findTripButton]}
              onPress={() => navigation.navigate('Flightstatus')}
            >
              <Icon name="search" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, styles.bookFlightButton]}
              onPress={() => {
                /* Future implementation */
              }}
            >
              <Icon name="flight" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 20, // Avoid overlapping with bottom buttons
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  summaryContainer: {
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
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
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
  details: {
    fontSize: 14,
    color: '#888',
  },
  aircraftContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  aircraftLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aircraftText: {
    fontSize: 16,
    marginBottom: 16,
  },
  aircraftImage: {
    width: '90%',
    height: 150,
  },
  recommendationButton: {
    backgroundColor: '#aa0000',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recommendationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    backgroundColor: '#f4f4f4',
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButton: {
    backgroundColor: '#aa0000',
  },
  findTripButton: {
    backgroundColor: '#4A90E2',
  },
  bookFlightButton: {
    backgroundColor: '#2ECC71',
  },
});

export default Flightinfo;