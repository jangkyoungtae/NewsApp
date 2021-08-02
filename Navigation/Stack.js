
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                headerTintColor: '#000000',

                headerBackTitleVisible: true,
                headerShown: true,
            }}>
            <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
    );
}