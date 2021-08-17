import React from 'react';
import styled from 'styled-components';

const PhotoContainer = styled.View`    
    flex:1;
    width:100%;
    background-color:white;
    padding:5px;
`
const ImageContainer = styled.View`
    border: 1px solid white;
    border-radius:5px;
    height:300px;
    overflow:hidden;
    width:100%;  
`
const ImageBox = styled.Image`
    height:100%; 
    width:100%;
    background-color:white;
    
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

export default ({ url, title, content, date ,font }) => {
    return (
        <>
            <PhotoContainer>
                <ImageContainer>
                    <ImageBox source={{ uri: url }} />
                </ImageContainer>                
                <TextContainer>
                    <DateText
                        style={{
                            fontSize: font - 1,
                            lineHeight: font+3
                        }}
                    >{date}</DateText>
                    <Title
                        style={{
                            fontSize: font + 3,
                            lineHeight: font+7
                        }}
                        numberOfLines={1}>{title}</Title>
                    <Contents
                        style={{
                            fontSize: font - 1,
                            lineHeight: font+3
                        }}
                        numberOfLines={3}>{content}</Contents>
                </TextContainer>
            </PhotoContainer>
            
        </>
    );
}