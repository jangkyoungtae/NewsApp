import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
const SearchInput = styled.TextInput`
    height:50px;
    font-size:16px;
    margin:3px;
`;
const SearchBox = styled.View`
    width:100%;
    flex-direction:row;
    background-color: white;
    justify-content:space-between;
    align-items:center;
    padding-left:15px;
    padding-right:10px;
`;
export default ({resultData, text }) => {
    const [changeText, setChangeText] = useState(text);
    const callback = () => {
        resultData(false,changeText,"1");
    }
    const inputText = (data) => {
        
        setChangeText(data);
        resultData(true,data,"1");
    }
    
    return (
            <SearchBox>
               
                <SearchInput
                    value={changeText}
                    placeholder="검색할 내용을 적어주세요 (10글자 이내)"
                    maxLength={10}
                    onChangeText={(data) => inputText(data)}
                    onEndEditing={callback}
                
            />
                <TouchableOpacity onPress={callback}>
                    <Ionicons name={"ios-search"} size={28}/>
                </TouchableOpacity>
            </SearchBox>         
            
    )
}