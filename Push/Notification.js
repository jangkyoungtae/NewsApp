import { Alert, Platform ,Linking, NativeModules} from 'react-native'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import { getContent } from '../sqldata';
import { recomendApi } from '../api/api';


export const hasNotificationPermission = async () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    try {
        let token;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        // If we don't already have permission, ask for it
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }  
        if (finalStatus !== 'granted') {
            Alert.alert(
                '권한요청',
                '푸시 알림을 활성화하지 않으면 미리 알림을 받을 수 없습니다. 알림을 받으려면 설정에서 푸시 알림을 활성화하세요.',
                [
                { text: '취소' },
                // If they said no initially and want to change their mind,
                // we can automatically open our app in their settings
                // so there's less friction in turning notifications on
                    { text: '설정', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
                ]
            )
            return false;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('news-notify', {
                name: 'news-notify',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

    return token;
  } catch (error) {
    Alert.alert(
      'Error',
        'Something went wrong while check your notification permissions, please try again later.'
      ,error
    );
    return false;
  }
}
export const sendPushNotification = async (expoPushToken, title, body) =>{
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
        data: { someData: 'https://bleepcoder.com/ko/expo/537970924/listener-registerd-in-addlistener-is-not-called-when' },
        channelId:"news-notify",
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
export const shuffle = (array) => { array.sort(() => Math.random() - 0.5); }
export const scheduleNotification = async () => {
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
    
    Notifications.scheduleNotificationAsync({
            content: {
                title: newsContents[0].title,
                 body: newsContents[0].content,
                
        },
        identifier:"news-notify",
        trigger: {
                seconds:30,
                channelId: 'news-notify',
            },
    });
    Notifications.getNotificationChannelAsync("news-notify").then((result) => {
        console.log(result);
    });
    
    setTimeout(() => {
        scheduleNotification();
    },30000)
}
export const deleteAllNotification = async () => {
     await Notifications.cancelAllScheduledNotificationsAsync();
}

async function registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;
          
          // only ask if permissions have not already been determined, because
          // iOS won't necessarily prompt the user a second time.
          if (existingStatus !== "granted") {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          
          // Stop here if the user did not grant permissions
          if (finalStatus !== "granted") {
            //  Alert.alert('Please enable notification');
            return;
          }
          
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
           var fcm = '' + token;
         
          console.log("*****************"+fcm);
        }



    export const asyncFunc = () => {
        return new Promise((resolve, reject) => {
           
            hasNotificationPermission().then(
                resolve("okkkkkk")
            )

        })
    }