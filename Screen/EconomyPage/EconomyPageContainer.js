import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import EconomyPagePresenter from './EconomyPagePresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { recomendApi } from '../../api/api';


function GoodPageContainer({  route,sort,font,mode,changeFontSize, changeSort,changeMode}){   
    const [searData, setSearData] = useState({
        loading: true,
        itemCount: 30,
        newsContents: [],
        newsContentsError: [],
        endContent: false,
    });

    const getData = async (refresh) => {
        
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
        if (!refresh) {
            setSearData({
                loading: true,
                itemCount: 30,
                newsContents: [],
                newsContentsError:[],
                endContent: false,
            });
        }
        const [newsContents, newsContentsError] = await recomendApi.newsSearch(category,searData.itemCount);
        const jsondata = JSON.parse(JSON.stringify(newsContents));
        if (refresh) {
             if (searData.itemCount> jsondata.length) {
                setSearData({
                    loading: false,
                    itemCount: searData.itemCount+10,
                    newsContents: jsondata,
                    newsContentsError,
                    endContent: true,
                });
            } else {
                setSearData({
                    loading: false,
                    itemCount: searData.itemCount+10,
                    newsContents: jsondata,
                    newsContentsError,
                    endContent: false,
                });
            }
        } else {
             if (searData.itemCount == 30) {
                setSearData({
                    loading: false,
                    itemCount: searData.itemCount+10,
                    newsContents: jsondata,
                    newsContentsError,
                    endContent: false,
                });
            } else {
                setSearData({
                    loading: false,
                    itemCount: 30,
                    newsContents: jsondata,
                    newsContentsError,
                    endContent: false,
                });
            }
        }
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
    const saveFontSize = (size) => {      
        AsyncStorage.setItem("font", size, () => {
               changeFontSize(size);            
            });     
    }
    const setMode = (mode) => {      
        AsyncStorage.setItem("mode", mode, () => {
               changeMode(mode);            
            });     
    }
    const getItemFromAsync3 = (storageName) => {
        if (isEmpty(storageName)) {
            throw Error('Storage Name is empty');
        }
     
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storageName, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result === null || result === undefined) {
                    setMode('false');
                    resolve('false');
                } else {
                    changeMode(result);
                    resolve(result);
                    
                }
            });
           
        });
    };
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
                    resolve("1");
                } else {
                    changeSort(result);
                    resolve(result);
                    
                }
            });
           
        });
    };
    const getItemFromAsync2 = (storageName) => {
        if (isEmpty(storageName)) {
            throw Error('Storage Name is empty');
        }
     
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(storageName, (err, result) => {
                if (err) {
                    reject(err);
                }
                
                if (result === null || result === undefined) {
                    saveFontSize("13");
                    resolve("13");
                } else {
                    changeFontSize(Number(result));
                    resolve(""+result);
                    
                }
            });
           
        });
    };
      
    const handleLoadMore = () => {
        if (!searData.endContent) {
            getData(true);
        }
        
    };
    
    useEffect(() => {
       
       Promise.all([getItemFromAsync("sort"),getItemFromAsync2("font"),getItemFromAsync3('mode')]).catch((err) => {
            console.log("에러: ", err);            
        });        
        getData(false);
        
    }, []);
    return <EconomyPagePresenter 
        route={route}
        sort={sort}
        mode={mode}
        font={font}
        changeSort={boardSort}
        {...searData}
        handleLoadMore={handleLoadMore}
        getData={getData}
    />
}
function mapStateToProps(state) {
    return {
        sort: state.sort,
        font: state.font,
        mode: state.mode,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),
        changeFontSize: (font) => dispatch(actionCreators.changeFontSize(font)),
        changeMode: (mode) => dispatch(actionCreators.changeMode(mode)),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(GoodPageContainer);