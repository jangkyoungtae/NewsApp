
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import {  BackHandler, TouchableOpacity, View } from 'react-native';
import NewsContents from '../Screen/NewsContents';
import NewsSearch from '../Screen/NewsSearch';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

export default ({ route, navigation }) => {
    
  
    const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
        const toggleDrawer = () => {          
        //Props to open/close the drawer
            props.navigationProps.toggleDrawer();
        };

        return (
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                {/*Donute Button Image */}
                <SimpleLineIcons name="options-vertical" size={24} color="black" />
            </TouchableOpacity>
            </View>
        );
    };
  
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                headerTintColor: '#000000',           
                headerShown: true,
                headerRight: () => getFocusedRouteNameFromRoute(route) !== "NewsContents" && <NavigationDrawerStructure navigationProps={navigation} />
            }}>
        
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="NewsContents" component={NewsContents} />
            <Stack.Screen name="NewsSearch" component={NewsSearch} options={{
                headerShown:false,
            }}/>
            
        </Stack.Navigator>
    );
}
