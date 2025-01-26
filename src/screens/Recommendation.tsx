import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Recommendation = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Recommendation Screen</Text>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Recommendation;
