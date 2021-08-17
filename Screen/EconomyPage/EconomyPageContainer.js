import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import EconomyPagePresenter from './EconomyPagePresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { recomendApi } from '../../api/api';


function GoodPageContainer({ route,sort, font,changeFontSize,changeSort}){
    const [loading, setLoading] = useState(true);
    const [searData, setSearData] = useState({        
        newsContents: [],
        newsContentsError:[],
    });

    const getData = async() => {
        var category = "business";
        if (route.name === "IT") {
            category = 'technology';
        }else if (route.name === "문화") {
            category = 'general';
        }else if (route.name === "연예") {
            category = 'entertainment';
        }else if (route.name === "스포츠") {
            category = 'sports';
        }else if (route.name === "과학") {
            category= 'science';
        }
         
        const [newsContents, newsContentsError] = await recomendApi.newsSearch(category);
       const jsondata = JSON.parse(JSON.stringify(newsContents));
        setSearData({            
            newsContents: jsondata,
            newsContentsError
        });
        
    }
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
        setLoading(true);
        Font.loadAsync({ godob: require('../../assets/font/godob.ttf'), josun: require('../../assets/font/josun.ttf') }).then(() => {
            getItemFromAsync("sort");
            getData();
            setLoading(false);
        });
        
    }, []);
    return <EconomyPagePresenter route={route} sort={sort} font={font} changeSort={boardSort} {...searData} loading={loading} setLoading={setLoading}/>
}
function mapStateToProps(state) {   
    return {
        sort: state.sort,
        font: state.font,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),
        changeFontSize : (font) =>dispatch(actionCreators.changeFontSize(font)),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(GoodPageContainer);