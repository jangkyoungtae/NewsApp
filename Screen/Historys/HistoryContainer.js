import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import HistoryPresenter from './HistoryPresenter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import * as SQLite from 'expo-sqlite';    
import { StatusBar ,BackHandler} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';


const db = SQLite.openDatabase("history.db", 1);



function HistoryContainer({ route, sort, font, mode, changeFontSize, changeSort, changeMode }) {
    const navigation = useNavigation();
    
    const [searData, setSearData] = useState({
        loading: true,
        newsContents: [],
        newsContentsError: [],
    });
    
    const getData =  () => {
            db.transaction(            
            tx => {                
                tx.executeSql("select * from history order by nowDate desc", [], (_, { rows }) => {
                    setSearData({
                        loading: false,
                        newsContents: rows,
                        newsContentsError:[],
                        
                    })
                });
            },
            (err) => {
                setSearData({
                    loading: false,
                    newsContents: [],
                    newsContentsError: err,
                        
                });
            },
        );
    
        
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
                    changeFontSize(result);
                    resolve(""+result);
                    
                }
            });
           
        });
    };
    const handleBackPress = () => {
        console.log("???????????????",route);
            
            navigation.navigate("Tabs");
            navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Tabs',
                            },
                        ],
                    })
            );
             return true;      
        
       
    }
    
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        Promise.all([getItemFromAsync("sort"),getItemFromAsync2("font"),getItemFromAsync3('mode')]).then((result) => {
            console.log("result: ", result);
        }).catch((err) => {
            console.log("??????: ", err);
            
        });
        
        getData();
         console.log('??????????????? ????????? ?????????');
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            console.log('??????????????? ???????????? ?????????');
        };
    }, []);
    return (
        <>
            <StatusBar />
            <HistoryPresenter
                route={route}
                sort={sort}
                mode={mode}
                font={Number(font)}
                {...searData}
                navigation={navigation}
            />
        </>
    )
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
export default connect(mapStateToProps,mapDispatchToProps)(HistoryContainer);