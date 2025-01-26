import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import the screens
import Login from './src/screens/Login';
import Flightinfo from './src/screens/Flightinfo';
import Recommendation from './src/screens/Recommendation';
import Map from './src/screens/Map';
import ParallaxTransition from './src/screens/ParallaxTransition';

// Create stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ParallaxTransition">
        {/* ParallaxTransition is the initial screen */}
        <Stack.Screen
          name="ParallaxTransition"
          component={ParallaxTransition}
          options={{ headerShown: false }}
        />
        {/* Add Login screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        {/* Add Flightinfo screen */}
        <Stack.Screen
          name="Flightinfo"
          component={Flightinfo}
          options={{ title: 'Flight Information' }}
        />
        {/* Add Recommendation screen */}
        <Stack.Screen
          name="Recommendation"
          component={Recommendation}
          options={{ title: 'Recommendations' }}
        />
        {/* Add Map screen */}
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: 'Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
