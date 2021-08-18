
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';
import { SimpleLineIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  TouchableOpacity, View } from 'react-native';
import NewsContents from '../Screen/NewsContents';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default ({navigation}) => {
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
                headerRight: () => <NavigationDrawerStructure navigationProps={navigation} />
            }}>
        
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="NewsContents" component={NewsContents} />
        </Stack.Navigator>
    );
}