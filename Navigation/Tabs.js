import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoodPage from '../Screen/GoodPage'


const Tab = createMaterialTopTabNavigator();

export default ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ title: '뉴스플레이' });
    }, [route]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                
            })}
            tabBarOptions={{
                allowFontScaling: true,
                scrollEnabled:true,
                showLabel: true,
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
                indicatorStyle: {
                    height: 5,
                    bottom: 0,
                    backgroundColor: 'gray',
                    borderRadius:10
                },
                labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15,
                   
                },
                tabStyle: {
                    width:100  
                },  
                style: {
                    backgroundColor: 'white',
                    borderTopColor: 'white',
                    borderBottomColor: 'white',
                    overflow: 'scroll',
                   

                },
            }}
        >
            <Tab.Screen name="헤드라인" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="경제" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="IT" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="문화" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="과학" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="생활" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="스포츠" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="문화1" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="과학2" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="생활3" component={GoodPage} initialParams={route.name}/>
            <Tab.Screen name="스포츠4" component={GoodPage} initialParams={route.name}/>

        </Tab.Navigator>
    );
};
