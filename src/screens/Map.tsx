import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Map = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
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

export default Map;
