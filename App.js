import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Stack from './Navigation/Stack';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
