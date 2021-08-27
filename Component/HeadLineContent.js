import React from 'react';
import {  TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { checkAdd } from '../sqldata';
import moment from 'moment';

const HeadLineContainer = styled.View`    
    flex:1;
    width:100%;
    background-color:white;
    padding:5px;
`
const TextContainer = styled.View`
    height:100%; 
    width:100%;
    padding:5px;
    background-color:#f6f6f6;
    border-radius:5px;
    overflow:hidden;
`
const Title = styled.Text`
    font-size : 16px;    
    margin:2px;
    font-family:godob;
`
const Contents = styled.Text`
    font-size :12px;
    width:100%;
    margin-bottom:10px;
    line-height:16px;
    font-family:josun;
    
`

const DateText = styled.Text`
    color:#a0a0a0;
    font-size :12px;
    width:100%;
    line-height:14px;
     margin-left:10px;  
`
export default ({ id,url, title, content, date, font, link,isHistory,mode}) => {
    const navigation = useNavigation();
     const goContents = () => {
        if (isHistory==="true") {
            navigation.navigate("NewsContents");    
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'NewsContents',
                            url: link,
                            history:isHistory
                        },
                    ],
                })
            );
        } else {
            console.log("읽은 날짜 : ", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
            checkAdd(id, title, content, url, link, date, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));      
            navigation.navigate("NewsContents", {
                url:link
            });
        }
        
    }
    return (
     <TouchableOpacity onPress={goContents}>
        <HeadLineContainer  style={{
                    backgroundColor:  mode  == 'false'  ? "white": "black",
                }}>                       
            <TextContainer style={{
                        backgroundColor:  mode  == 'false'  ? "#f6f6f6": "#5e5e5e",
                    }}>
                    <DateText
                    style={{
                            fontSize: font - 1,
                            lineHeight: font + 3,
                            color:mode  == 'false'  ? "black": "white",
                        }}
                    >{date}</DateText>
                    <Title
                        style={{
                            fontSize: font + 3,
                            lineHeight: font + 7,
                            color:mode  == 'false'  ? "black": "white",
                            
                        }}
                        numberOfLines={1}>{title}</Title>
                    <Contents
                        style={{
                            fontSize: font - 1,
                            lineHeight: font + 3,
                            color:mode  == 'false'  ? "black": "white",
                        }}
                        numberOfLines={3}>{content}</Contents>
            </TextContainer>
        </HeadLineContainer>
        
    </TouchableOpacity>
    );
}