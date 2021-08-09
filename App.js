import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createDrawerNavigator,DrawerItem, DrawerContentScrollView  } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Stack from './Navigation/Stack';
import { connect, Provider } from 'react-redux';
import store, { actionCreators } from './reducer/store';
import { SafeAreaView, Text, View } from 'react-native';
import Sidebar from './Component/Sidebar';
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType='front'
          drawerPosition='right'
          drawerContent={(props) => {
            return (
              <Sidebar props={props}/>
            );
            }
          }>
       
          <Drawer.Screen name="뉴스플레이" component={Stack} />
        </Drawer.Navigator>
   
      </NavigationContainer>      
    </Provider>
  );
}
