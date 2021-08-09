import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import GoodPagePresenter from './GoodPagePresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';


function GoodPageContainer({ route,sort, changeSort}){
    const [loading, setLoading] = useState(true);
        
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
            changeSort(sort);
          
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
                    changeSort(result);
                } 
            });
        });
    };   
    
    useEffect(() => {
        Font.loadAsync({godob: require('../../assets/font/godob.ttf'),josun: require('../../assets/font/josun.ttf')  }).then(() => {
            setLoading(false);
        });
        getItemFromAsync("sort");
    }, []);
        return <GoodPagePresenter route={route} sort={sort} changeSort={boardSort} loading={loading} setLoading={setLoading}/>
}
function mapStateToProps(state) {   
    return {
        sort: state,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),        
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(GoodPageContainer);