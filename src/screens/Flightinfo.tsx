import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

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

  const statusColor = user.flightInfo.status === 'Delayed' ? '#f44336' : '#4caf50'; // Red for delayed, green for on-time

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{user.flightInfo.origin} → {user.flightInfo.destination}</Text>
          <Text style={styles.dateText}>Sunday, January 26, 2025</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>{user.flightInfo.status}</Text>
        </View>

        {/* Flight Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.flightNumber}>Flight {user.flightInfo.flightID}</Text>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.label}>Depart</Text>
              <Text style={styles.time}>{user.flightInfo.departureTime}</Text>
              <Text style={styles.location}>{user.flightInfo.origin}</Text>
              <Text style={styles.details}>Gate {user.flightInfo.gate}, Terminal {user.flightInfo.terminal}</Text>
            </View>
            <View>
              <Text style={styles.label}>Arrive</Text>
              <Text style={styles.time}>{user.flightInfo.arrivalTime}</Text>
              <Text style={styles.location}>{user.flightInfo.destination}</Text>
              <Text style={styles.details}>Gate {user.flightInfo.arrivalGate}, Terminal {user.flightInfo.arrivalTerminal}</Text>
            </View>
          </View>
        </View>

        {/* Aircraft Details */}
        <View style={styles.aircraftContainer}>
          <Text style={styles.aircraftLabel}>Aircraft Type</Text>
          <Text style={styles.aircraftText}>{user.flightInfo.aircraftType}</Text>
        </View>

        {/* Navigation Button */}
        <TouchableOpacity
          style={styles.recommendationButton}
          onPress={() => navigation.navigate('Recommendation', { userData: user })} // Pass the user data
        >
          <Text style={styles.recommendationButtonText}>Go to Recommendation</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  aircraftLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  aircraftText: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default Flightinfo;
