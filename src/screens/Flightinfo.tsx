import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Flightinfo = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Flight Information</Text>
      <Button
        title="Go to Recommendation"
        onPress={() => navigation.navigate('Recommendation')}
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

export default Flightinfo;
