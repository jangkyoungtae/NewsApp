import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import unescape from 'unescape';
const RecommendContainer = styled.View`
    flex-direction:row;
    flex:1;
    width:100%;
    background-color:white;
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
export default ({ imageUrl, title, content, date }) => {  
    
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
    return (
    <>
            {!isEmpty(imageUrl) && <RecommendContainer>
            
                <ImageContainer>
                    <ImageBox source={{ uri: imageUrl }} />
                </ImageContainer>
                <TextContainer>
                    <DateText>{date}</DateText>
                    <Title numberOfLines={1}>{title}</Title>
                    <Contents numberOfLines={3}>{content}</Contents>
                </TextContainer>

            </RecommendContainer>}
     </>
    );
}