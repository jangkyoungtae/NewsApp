import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { checkAdd } from '../sqldata';
import moment from 'moment';
const RecommendContainer = styled.View`
    flex-direction:row;
    flex:1;
    width:100%;
    padding:5px;
`
const ImageContainer = styled.View`
    border: 1px solid white;
    border-radius:5px;
    height:100px;
    overflow:hidden;
    width:120px;   
`
const ImageBox = styled.Image`
    height:100%; 
    width:100%;
    background-color:black;
    
`
const TextContainer = styled.View`
    height:100%; 
    width:70%;
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
export default ({ id,imageUrl, title, content, date, font,link ,isHistory,mode}) => {
    const navigation = useNavigation();
    
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
            checkAdd(id, title, content, imageUrl, link, date, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));      
            navigation.navigate("NewsContents", {
                url:link
            });
        }
        
    }
    return (
    <>
            {!isEmpty(imageUrl) &&
                font && <TouchableOpacity onPress={goContents}>
                <RecommendContainer style={{
                    backgroundColor:  mode  == 'false'  ? "white": "black",
                }}>                    
                <ImageContainer>
                    
                        <ImageBox source={{ uri: imageUrl }} />
                        
                </ImageContainer>
                    <TextContainer
                    style={{
                        backgroundColor:  mode  == 'false'  ? "#f6f6f6": "#5e5e5e",
                    }}>
                    <DateText
                        style={{
                            fontSize: Number(font) - 1,
                                lineHeight: Number(font) + 3,
                            color:mode  == 'false'  ? "black": "white",
                            
                        }}
                    >{date}</DateText>
                    <Title                        
                        style={{
                            fontSize: Number(font) + 3,
                            lineHeight: Number(font) + 7,
                            color:mode  == 'false'  ? "black": "white",
                            
                            
                        }}
                        numberOfLines={1}>{title}</Title>
                    <Contents
                        style={{
                            fontSize: Number(font) - 1,
                                lineHeight: Number(font) + 3,
                            color:mode  == 'false'  ? "black": "white",
                        }}
                        numberOfLines={3}
                    >{content}</Contents>
                </TextContainer>
              
                </RecommendContainer>
                </TouchableOpacity>
           }
     </>
    );
}