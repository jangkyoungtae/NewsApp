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
import {  hasNotificationPermission,  sendPushNotification, shuffle } from './Push/Notification';
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import moment from 'moment'; 
import { recomendApi } from './api/api';
const Drawer = createDrawerNavigator();
const db = SQLite.openDatabase("history.db", 1);


const BACKGROUND_FETCH_TASK = 'background-fetch';



export default function App() {

  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

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
      minimumInterval: 1, // 15 minutes
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
    hasNotificationPermission().then((result) => {
      setExpoPushToken(result);
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(notification);

      console.log("알람호출",+notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    Font.loadAsync({
      godob: require('./assets/font/godob.ttf'),
      josun: require('./assets/font/josun.ttf')
    }).then(() => {
     setLoading(false);
    });
    
   checkStatusAsync();
   
    
    
 
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
  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    if (!isRegistered) {
      await registerBackgroundFetchAsync();
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
        <Text>
          Background fetch status:{' '}
          <Text >{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
          </Text>
        
      </NavigationContainer>
  
    </Provider>
  );
}
