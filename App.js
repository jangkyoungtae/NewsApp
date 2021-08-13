
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Stack from './Navigation/Stack';
import {  Provider } from 'react-redux';
import store from './reducer/store';
import Sidebar from './Component/Sidebar';
const Drawer = createDrawerNavigator();
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    Font.loadAsync({
      godob: require('./assets/font/godob.ttf'),
      cookie: require('./assets/font/cookie.otf'),
      josun: require('./assets/font/josun.ttf')
    }).then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType='front'
          drawerPosition='right'
          drawerContent={(props) => {
            return (
              <Sidebar props={props} loading={loading}/>
            );
            }
          }>
       
          <Drawer.Screen name="뉴스플레이" component={Stack} />
        </Drawer.Navigator>
   
      </NavigationContainer>      
    </Provider>
  );
}
