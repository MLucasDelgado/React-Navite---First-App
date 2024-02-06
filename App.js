import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text } from 'react-native';
import pexelsLogo from './assets/pexels.jpg'

const stack = createNativeStackNavigator()

export default function App() {
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* es como decir crear una primera pantalla */}
        <stack.Screen name='HomeScreen'
          options={{
            headerLeft: () => <Image source={pexelsLogo} style={style.logo} />,
            headerRight: () => (
              <Text style={{ color: 'white', fontSize: 18 }}
                onPress={() => setOpenSearch(!openSearch)}>{openSearch ? 'Close' : 'Search'}</Text>
            ),
            title: 'Pexels App',
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#0D0D0D',

            }
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </stack.Screen>
        <stack.Screen name='ImageScreen' component={ImageScreen}
          options={{
            title: 'Pexels App',
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#0D0D0D',
            }
          }} />
      </stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd: 10,
    borderRadius: 5
  }
})


