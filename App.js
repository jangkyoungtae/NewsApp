
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Stack from './Navigation/Stack';
import {  Provider } from 'react-redux';
import store from './reducer/store';
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
