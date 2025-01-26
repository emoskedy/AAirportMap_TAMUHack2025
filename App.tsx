import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import the screens
import Login from './src/screens/Login';
import Flightinfo from './src/screens/Flightinfo';
import Recommendation from './src/screens/Recommendation';
import Map from './src/screens/Map';

// Create stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0078D2', // Set the header color to blue
          },
          headerTintColor: '#fff', // Set the header text color to white
          headerTitleStyle: {
            fontWeight: 'bold', // Optional: Customize the font weight
          },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Flightinfo"
          component={Flightinfo}
          options={{ 
            title: 'Flight Information', 
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="Recommendation" component={Recommendation} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
