import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import NewsContentsPresenter from './/NewsContentsPresenter';

function NewsContentsContainer ({ route, sort,font,mode,text,searchmode,changeFontSize,changeSearchText,changeSearchMode, changeSort,changeMode}){
    const navigation = useNavigation();
    const handleBackPress = () => {
        console.log("데이터", text);
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
function mapStateToProps(state) {
    return {
        sort: state.sort,
        font: state.font,
        mode: state.mode,
        text: state.text,
        searchmode:state.searchmode
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),
        changeFontSize: (font) => dispatch(actionCreators.changeFontSize(font)),
        changeMode: (mode) => dispatch(actionCreators.changeMode(mode)),
        changeSearchText: (text) => dispatch(actionCreators.changeSearchText(text)),
        changeSearchMode: searchmode=>dispatch(actionCreators.changeSearchMode(searchmode)),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(NewsContentsContainer);