import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { SafeAreaView ,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
const Title = styled.Text`
    align-self:center;
    justify-content:center;
    font-size: 20px;
`;
const ContentTitle = styled.Text`
    align-self:flex-start;
    fontSize: 17px;
    font-family: cookie;
    padding-left:20px;
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
function Sidebar({ sort, changeSort, props ,loading}) {
    const [openSort, setOpenSort] = useState(false);
    const [openFont, setOpenFont] = useState(false);
    const [openMode, setOpenMode] = useState(false);
    const boardSort = (sorts) => {
      
        if (Number(sorts) < 3) {
            AsyncStorage.setItem("sort", "" + (Number(sorts) + 1), () => {
               changeSort("" + (Number(sorts) + 1));            
            });            
        } else {
            AsyncStorage.setItem("sort", '1', () => {
               changeSort('1');            
            });           
        }
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            {!loading && <DrawerContentScrollView {...props}>
                <TitleContainer>
                    <MaterialCommunityIcons
                        style={{
                            alignSelf:'center',
                            justifyContent: 'center',
                             marginRight:5
                           
                        }}
                            name={"cog"}
                            size={25}                            
                        />
                    <Title>설정</Title>
                    <MaterialCommunityIcons
                        style={{
                            alignSelf:'center',
                            justifyContent: 'center',
                            marginLeft:5
                        }}
                            name={"cog"}
                            size={25}                            
                        />
                </TitleContainer>
                <ContentTitle onPress={onPressOpenSort}>정렬</ContentTitle>
                {openSort && <DrawerItem
                    label="일반 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                   {openSort && <DrawerItem
                    label="포토 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                  {openSort && <DrawerItem
                    label="헤드라인 정렬"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                <ContentTitle onPress={onPressOpenMode}>다크모드</ContentTitle>
                {openMode && <DrawerItem
                    label="일반모드"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                {openMode && <DrawerItem
                    label="다크모드"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                <ContentTitle onPress={onPressOpenFont}>글자 크기 변경</ContentTitle>
                {openFont && <DrawerItem
                    label="보통"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                {openFont && <DrawerItem
                    label="크게"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                {openFont && <DrawerItem
                    label="아주크게"
                    labelStyle={{
                        alignSelf: 'flex-end',
                        fontSize: 13,
                        fontFamily: 'cookie'
                    }}
                    onPress={() => boardSort(sort)}
                />}
                 <ContentTitle>내가 본 기사</ContentTitle>
                 <ContentTitle>개인정보 처리 방침</ContentTitle>
            </DrawerContentScrollView>}
        </SafeAreaView>

    );
}
function mapStateToProps(state) {   
    return {
        sort: state,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),        
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
