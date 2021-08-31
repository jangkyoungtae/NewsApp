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
import { Alert, Button, Text, View } from 'react-native';
import {  hasNotificationPermission,  sendPushNotification, shuffle } from './Push/Notification';
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import moment from 'moment'; 
import { recomendApi } from './api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();



const BACKGROUND_FETCH_TASK = 'background-fetch';



export default function App() {

  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);
  const [alram, setAlram] = useState("true");

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      const category = [
          "business",
          "general",
          "entertainment",
          "science",
          "sports",
          "technology",
      ]
      shuffle(category);
    
    const [newsContents, newsContentsError] = await recomendApi.newsSearch(category[0], 1);
    const now = Date.now();
    sendPushNotification(expoPushToken, newsContents[0].title, newsContents[0].content+"\n"+moment(now).format("YYYY-MM-DD hh:mm:ss"));
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });
   async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  // 3. (Optional) Unregister tasks by specifying the task name
  // This will cancel any future background fetch calls that match the given name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("alram", (err,results) => {
      if (results !== null || results !== undefined) {
        console.log("알람", results);
        hasNotificationPermission(results).then((result) => {
        setExpoPushToken(result);
    });
      }
    });
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      console.warn("알람리스폰", notification);
    });
    Font.loadAsync({
      godob: require('./assets/font/godob.ttf'),
      josun: require('./assets/font/josun.ttf')
    }).then(() => {
     setLoading(false);
    });
    //로컬 알람 등록
   //checkStatusAsync();
   
    
    const db = SQLite.openDatabase("history.db", 1);
    if (db !== undefined || db !== null) {
      db.transaction(tx => {
          tx.executeSql(
              "create table if not exists history (id integer primary key not null , subject text, content text, imgUrl text, link text, date text, nowdate text);"
          );
        });
    }
      
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    if (!isRegistered) {
      await registerBackgroundFetchAsync().then(() => {
        console.log("서비스 실행");
      });
    }
  };

  const toggleFetchTask = async () => {
    console.log(isRegistered);
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };
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
        </Drawer.Navigator>}
     
        
      </NavigationContainer>
  
    </Provider>
  );
}
