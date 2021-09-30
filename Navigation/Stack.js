
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import {  BackHandler, TouchableOpacity, View } from 'react-native';
import NewsContents from '../Screen/NewsContents';
import NewsSearch from '../Screen/NewsSearch';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';

const Stacks = createStackNavigator();

function Stack({ route, navigation ,searchmode,changeSearchMode,changeSearchText}) {
    
  
    const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
        const toggleDrawer = () => {          
        //Props to open/close the drawer
            props.navigationProps.toggleDrawer();
        };
          const toggleButton = () => {          
        //Props to open/close the drawer
              if (searchmode !== "1") {
                  changeSearchMode("1");
              } else {
                  changeSearchMode("0");
                  changeSearchText("");
              }
              
        };
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={toggleButton} style={{
                    padding:8
                }}>
                    {/*Donute Button Image */}
                    <Ionicons name="ios-search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDrawer} style={{
                    padding:8
                }}>
                    {/*Donute Button Image */}
                    <SimpleLineIcons name="options-vertical" size={24} color="black" />
                </TouchableOpacity>
                
            </View>
        );
    };
   
    return (
        <Stacks.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                headerTintColor: '#000000',           
                headerShown: true,
                headerRight: () => getFocusedRouteNameFromRoute(route) !== "NewsContents" && <NavigationDrawerStructure navigationProps={navigation} />,
                headerRightContainerStyle: {
                    paddingRight:5
                }
            }}>
        
            <Stacks.Screen name="Tabs" component={Tabs} />
            <Stacks.Screen name="NewsContents" component={NewsContents} />
            
        </Stacks.Navigator>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(Stack);