import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, Image, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/frame3.png'),
];

const ParallaxTransition = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second fade-in
      useNativeDriver: true,
    }).start(() => {
      // Wait 2 seconds, then reset navigation to Login screen
      setTimeout(() => {
        navigation.reset({
          index: 0, // Set the stack index to 0
          routes: [{ name: 'Login' }], // Replace stack with the Login screen
        });
      }, 1000); // Wait an additional 2 seconds before navigating
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={images[0]}
        style={[styles.image, { opacity: fadeAnim }]} // Animate opacity
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002244', // Background color to match theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
  },
});

export default ParallaxTransition;
