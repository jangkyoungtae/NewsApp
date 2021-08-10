import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
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
export default ({ title, content, date }) => {
    const dateForm = moment(date).format("YYYY-MM-DD HH:mm");
    return (
    <>
        {content &&
            <HeadLineContainer>            
                <TextContainer>
                    <DateText>{dateForm}</DateText>
                    <Title numberOfLines={1}>{title}</Title>
                    <Contents numberOfLines={3}>{content}</Contents>
                </TextContainer>
            </HeadLineContainer>
        }
    </>
    );
}