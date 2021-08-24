import React, { useLayoutEffect } from 'react';
import { BackHandler } from 'react-native';
import NewsContentsPresenter from './/NewsContentsPresenter';
export default ({ route, navigation }) => {
    console.log(route);
    const handleBackPress = () => {
        navigation.goBack();
        return true;              
       
    }
    useLayoutEffect(() => {
         BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        navigation.setOptions({ title: '뉴스보기' });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        }
    }, [route]);
    return (
        <NewsContentsPresenter route={route}/>
    )
}