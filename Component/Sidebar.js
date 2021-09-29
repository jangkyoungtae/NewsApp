import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView,DrawerItemList , DrawerItem } from '@react-navigation/drawer';
import React, {  useEffect, useState } from 'react';
import { SafeAreaView ,StyleSheet,Linking} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';

const Title = styled.Text`
    align-self:center;
    justify-content:center;
`;
const ContentTitle = styled.Text`
    align-self:flex-start;
    padding-left:20px;
    font-family:godob;
    border-color: #d3d3d3;
    border-bottom-width: 1px;
    border-style: solid;
    width:90%;
    padding-top:20px;
    padding-bottom:10px;
    margin :0px 15px;
`;
const TitleContainer = styled.View`
    padding: 20px;
    align-content:center;
    justify-content:center;
    flex-direction:row;
`;

function Sidebar({props,mode ,font,changeFontSize, changeSort,changeMode}) {
    const [openSort, setOpenSort] = useState(true);
    const [openFont, setOpenFont] = useState(true);
    const [openMode, setOpenMode] = useState(true);
    
     const setMode = (modes) => {      
         AsyncStorage.setItem("mode", modes, () => {
                console.log("mode 결과 : ",modes);
                changeMode(modes);            
            });     
    }
  
    const boardSort = (sorts) => {      
        AsyncStorage.setItem("sort", sorts, () => {
               changeSort(sorts);            
            });     
    }
     const saveFontSize = (size) => {      
        AsyncStorage.setItem("font", ""+size, () => {
               changeFontSize(size);            
            });     
    }
    const onPressOpenMode = () => {
        if (openMode) {
            setOpenMode(false);
        } else {
            setOpenMode(true);
        }
        
    }
    const onPressOpenSort = () => {
        if (openSort) {
            setOpenSort(false);
        } else {
            setOpenSort(true);
        }
    }
    const onPressOpenFont = () => {
         if (openFont) {
             setOpenFont(false);
         } else {
             setOpenFont(true);
         }
        
    }
    const goSecurity = async () => {
        await Linking.openURL("http://js-media.kr/securitynews.html");
    }
    const goSetting = async () => {
        await Linking.openSettings();
    }
    const goSearch = async () => {
        await Linking.openSettings();
    }

    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor:mode ==="false" ? "white": "black",
            }}
        >
            
            
            <DrawerContentScrollView {...props}>
                
                <TitleContainer>
                    <MaterialCommunityIcons
                        style={{
                            alignSelf:'center',
                            justifyContent: 'center',
                             marginRight:5
                           
                        }}
                            name={"cog"}
                        size={25}
                        color={mode ==="false" ? "black": "white"}
                        />
                    <Title
                        style={{
                            fontSize: Number(font) + 7,
                            color:mode ==="false" ? "black": "white",
                    }}>설정</Title>
                    <MaterialCommunityIcons
                        style={{
                            alignSelf:'center',
                            justifyContent: 'center',
                            marginLeft:5
                        }}
                            name={"cog"}
                        size={25}
                        color={mode ==="false" ? "black": "white"}
                        />
                </TitleContainer>
                 <DrawerItemList
                    activeBackgroundColor={"gray"}
                    activeTintColor={"white"}
                    inactiveTintColor={"black"}
                    labelStyle={{                         
                        alignSelf: 'flex-start',
                        paddingLeft: 20,
                        fontSize: Number(font) +4,
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    
                    {...props}
                />
                <ContentTitle
                    style={{
                        fontSize: Number(font) + 4,
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={onPressOpenSort}>정렬</ContentTitle>
                {openSort && <DrawerItem
                    label="일반 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => boardSort("1")}
                />}
                   {openSort && <DrawerItem
                    label="포토 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",

                    }}
                    onPress={() => boardSort("2")}
                />}
                  {openSort && <DrawerItem
                    label="헤드라인 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => boardSort("3")}
                />}
                <ContentTitle
                    style={{
                        fontSize: Number(font) + 4,
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={onPressOpenMode}>다크모드</ContentTitle>
                {openMode && <DrawerItem
                    label="일반모드"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => setMode("false")}
                />}
                {openMode && <DrawerItem
                    label="다크모드"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => setMode("true")}
                />}
                <ContentTitle
                    style={{
                        fontSize: Number(font) + 4,
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={onPressOpenFont}>글자 크기 변경</ContentTitle>
                {openFont && <DrawerItem
                    label="보통"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => saveFontSize("13")}
                />}
                {openFont && <DrawerItem
                    label="크게"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font),
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => saveFontSize("17")}
                />}
                {openFont && <DrawerItem
                    label="아주크게"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: Number(font) ,
                        fontFamily: 'godob',
                        color:mode ==="false" ? "black": "white",
                    }}
                    onPress={() => saveFontSize("20")}
                />}
               
               <ContentTitle
                    onPress={goSetting}
                style={{
                    fontSize: Number(font) + 4,
                    color:mode ==="false" ? "black": "white",
                    }}
                >알람 설정</ContentTitle>
                <ContentTitle
                    onPress={goSecurity}
                style={{
                    fontSize: Number(font) + 4,
                    color:mode ==="false" ? "black": "white",
                    }}
                >개인정보 처리 방침</ContentTitle>
                
                    
            </DrawerContentScrollView>
        </SafeAreaView>

    );
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
        changeMode : (mode) =>dispatch(actionCreators.changeMode(mode)),
    };
}
const styles = StyleSheet.create({
  option: {
        borderStyle: 'solid',
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        
    },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
