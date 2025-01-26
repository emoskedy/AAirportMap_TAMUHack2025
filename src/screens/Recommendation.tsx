import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { fetchRecommendations } from '../services/openaiService';

const Recommendations = ({ route }: any) => {
  const [recommendations, setRecommendations] = useState<{ label: string; query: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);
  const userData = route.params?.userData || {};

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      const recs = await fetchRecommendations(userData);
      setRecommendations(recs);
      setLoading(false);
    };

    getRecommendations();
  }, [userData]);

  const openGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url).catch((err) => console.error("Couldn't open the URL", err));
  };

  if (showWebView) {
    return (
      <WebView
        source={{ uri: 'https://www.aa.com/airportMaps/fullscreen?vid=iah' }}
        style={{ flex: 1 }}
        onError={() => setShowWebView(false)}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Fetching personalized recommendations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#002244" />
      <Text style={styles.header}>Personalized Recommendations</Text>

      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recommendationItem} onPress={() => openGoogleMaps(item.query)}>
            <Text style={styles.recommendationText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.webViewButton} onPress={() => setShowWebView(true)}>
        <Text style={styles.webViewButtonText}>Open Airport Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  loadingText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
  recommendationItem: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  recommendationText: { fontSize: 16, color: '#333', textAlign: 'center' },
  separator: { height: 20 }, // Add white space between items
  webViewButton: {
    backgroundColor: '#ba0c2f',
    padding: 16,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  webViewButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Recommendations;
