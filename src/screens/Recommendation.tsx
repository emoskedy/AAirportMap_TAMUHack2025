import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  FlatList, 
  StatusBar,
  Linking
} from 'react-native';

import { WebView } from 'react-native-webview';

// American Airlines Color Palette
const AA_COLORS = {
  BLUE: '#002244',
  RED: '#BA0C2F',
  GRAY: '#6A6D70',
  WHITE: '#FFFFFF',
  LIGHT_BLUE: '#0078D4'
};

// Define a more structured type for user data
interface UserData {
  flightClass?: string;
  dateOfBirth?: Date;
  gender?: string;
  religion?: string;
  hasInfant?: boolean;
  isDisabled?: boolean;
  hasServiceDog?: boolean;
}

// Recommendation mapping for precise Google Maps queries
const RECOMMENDATION_MAP: { [key: string]: string } = {
  'Nursing Room': 'baby care room',
  'Accessible Services': 'wheelchair-friendly path',
  'Service Animal Area': 'pet relief area',
  'Food Options': 'airport dining',
  'Rest Areas': 'airport lounges',
  'Gate Locations': 'airport terminal gates'
};

const AirportNavigationRecommendation = ({ navigation, route }: any) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [showWebView, setShowWebView] = useState(false); // State to toggle WebView

  const generateRecommendations = (userData: UserData): string[] => {
    const personalizationRules = [
      ...(userData.hasInfant ? ['Nursing Room'] : []),
      ...(userData.isDisabled ? ['Accessible Services'] : []),
      ...(userData.hasServiceDog ? ['Service Animal Area'] : []),
      'Food Options',
      'Rest Areas',
      'Gate Locations'
    ];

    return [...new Set(personalizationRules)];
  };

  useEffect(() => {
    const userData: UserData = route.params?.userData || {};
    const personalRecs = generateRecommendations(userData);
    
    // Convert to Google Maps-friendly queries
    const mapQueries = personalRecs.map((rec) => RECOMMENDATION_MAP[rec] || rec);
    setRecommendations(mapQueries);
  }, []);

  const openGoogleMaps = (place: string) => {
    if (!place) {
      alert('Please enter a place name');
      return;
    }

    const searchQuery = `${place} in George Bush Intercontinental Airport`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

    // Try opening the Google Maps URL
    Linking.openURL(url).catch((err) => {
      console.error("Couldn't open the URL", err);
    });
  };
  if (showWebView) {
    // Render WebView when the state is true
    return (
      <WebView
        source={{ uri: 'https://www.aa.com/airportMaps/fullscreen?vid=iah' }}
        style={{ flex: 1 }}
        onError={() => setShowWebView(false)} // Handle WebView errors
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={AA_COLORS.BLUE} />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Airport Navigator</Text>
      </View>

      <View style={styles.mapPromotionContainer}>
        <Text style={styles.mainTitle}>Personalized Airport Exploration</Text>
        <Text style={styles.subtitle}>Discover tailored routes and services</Text>
      </View>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setShowWebView(true)} // Show the WebView when button is pressed
      >
        <Text style={styles.actionButtonText}>Open Interactive Airport Map</Text>
      </TouchableOpacity>

      <View style={styles.recommendationContainer}>
        <Text style={styles.sectionTitle}>Your Personalized Recommendations</Text>
        
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recommendationItem}
              onPress={() => openGoogleMaps(item)}>
              <Text style={styles.recommendationText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AA_COLORS.WHITE,
  },
  headerContainer: {
    backgroundColor: AA_COLORS.BLUE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: AA_COLORS.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  mapPromotionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: AA_COLORS.LIGHT_BLUE,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AA_COLORS.WHITE,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: AA_COLORS.WHITE,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: AA_COLORS.RED,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: AA_COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendationContainer: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: AA_COLORS.BLUE,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  recommendationItem: {
    backgroundColor: AA_COLORS.BLUE,
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  recommendationText: {
    color: AA_COLORS.WHITE,
    fontSize: 16,
  }
});

export default AirportNavigationRecommendation;