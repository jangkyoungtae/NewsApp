import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import GoodPagePresenter from './GoodPagePresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ route }) => {
    const [loading, setLoading] = useState(true);
        const [info, setInfo] = useState("1");
    const isEmpty = function (value) {
        if (
            value === '' ||
            value === null ||
            value === undefined ||
            (value !== null && typeof value === 'object' && !Object.keys(value).length)
        ) {
            return true;
        } else {
            return false;
        }
    };
    const boardSort = (sort) => {
        AsyncStorage.setItem("sort", sort, () => {
            setInfo(sort);
          
        });
    }
    const getItemFromAsync = (storageName) => {
        if (isEmpty(storageName)) {
            throw Error('Storage Name is empty');
        }

        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storageName, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result === null || result === undefined) {                    
                    boardSort("1");
                } else {
                    setInfo(result);
                } 
            });
        });
    };   
    
    useEffect(() => {
        Font.loadAsync({godob: require('../../assets/font/godob.ttf'),josun: require('../../assets/font/josun.ttf')  }).then(() => {
            setLoading(false);
        });
        getItemFromAsync("sort");
    }, [info]);
    return <GoodPagePresenter route={route} sort={info} setInfo={setInfo} loading={loading} setLoading={setLoading}/>
}