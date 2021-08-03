import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import GoodPagePresenter from './GoodPagePresenter';

export default ({ route }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Font.loadAsync({godob: require('../../assets/font/godob.ttf'),josun: require('../../assets/font/josun.ttf')  }).then(() => {
            setLoading(false);
        });
    }, []);
    return <GoodPagePresenter route={route} loading={loading}/>
}