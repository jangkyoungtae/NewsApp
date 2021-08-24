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
import { Button } from 'react-native';



const Drawer = createDrawerNavigator();
const db = SQLite.openDatabase("history.db",1);
export default function App() {
  
  //private 에서 public 으로 변경 
 
  //private 에서 public 으로 변경 
  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(() => {
     setLoading(true);
    Font.loadAsync({
      godob: require('./assets/font/godob.ttf'),
      josun: require('./assets/font/josun.ttf')
    }).then(() => {
     setLoading(false);
    });
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
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
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
    
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return token;
    }
  return (
    <Provider store={store}>
      
      <NavigationContainer >
        <Drawer.Navigator
          
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
        </Drawer.Navigator>   
      </NavigationContainer>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </Provider>
  );
}
