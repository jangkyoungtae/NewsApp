import React, { useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Stack from './Navigation/Stack';
import Sidebar from './Component/Sidebar';
import * as SQLite from 'expo-sqlite';
import {  Provider } from 'react-redux';
import store from './reducer/store';
import Historys from './Screen/Historys';
import * as Notifications from 'expo-notifications';
import { Button, Text, View } from 'react-native';
import { asyncFunc, deleteAllNotification, deleteNotification, hasNotificationPermission, scheduleNotification, sendPushNotification } from './Push/Notification';
import { initBackgroundFetch } from './Push/Alarm';



const Drawer = createDrawerNavigator();
const db = SQLite.openDatabase("history.db", 1);



export default function App() {

  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [state, setState] = useState(null);
  
  function myTask() {
  try {
    // fetch data here...
    const backendData = "Simulated fetch " + Math.random();
    console.log("myTask() ", backendData);
    sendPushNotification(expoPushToken, "여기는제목", "여기는 내용");
    setState(backendData);
    return backendData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (err) {
    return BackgroundFetch.Result.Failed;
  }
}
  
  useEffect(() => {
    setLoading(true);
    hasNotificationPermission().then((result) => {
      setExpoPushToken(result);
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(notification);
      setTimeout(() => {
        sendPushNotification(expoPushToken, "여기는제목", "여기는 내용");
      },10000)
      console.log("알람호출",+notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      console.log("알람호출",+response);
    });
    Font.loadAsync({
      godob: require('./assets/font/godob.ttf'),
      josun: require('./assets/font/josun.ttf')
    }).then(() => {
     setLoading(false);
    });
    if (expoPushToken !== '') {
      initBackgroundFetch("today", myTask, 10);
    }
    
    
 
    db.transaction(tx => {
      tx.executeSql(
          "create table if not exists history (id integer primary key not null , subject text, content text, imgUrl text, link text, date text, nowdate text);"
      );
    },
      (err) => {
          console.log("디비생성실패",err)
      },
      (result) => {
          console.log("디비생성",result)
      }
    );
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  return (
    <Provider store={store}>
      
      <NavigationContainer >
        {!loading && <Drawer.Navigator
          
          drawerType='front'
          drawerPosition='right'
          drawerContent={(props) => {
            
            return (
              !loading && <Sidebar props={props}/>
            );
            }
          }
          
        >
          <Drawer.Screen name="뉴스기사" component={Stack}  />
          <Drawer.Screen
            name="내가 본 기사"
            component={Historys}
            options={{ unmountOnBlur: true }}
           
          />
        </Drawer.Navigator> }  
      </NavigationContainer>
  
    </Provider>
  );
}
