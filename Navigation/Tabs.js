import React, { useLayoutEffect ,useState,useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoodPage from '../Screen/GoodPage'
import ITPage from '../Screen/ITPage';
import CulturePage from '../Screen/CulturePage';
import EnterPage from '../Screen/EnterPage';
import SportsPage from '../Screen/SportsPage';
import EconomyPage from '../Screen/EconomyPage';






const Tab = createMaterialTopTabNavigator();

export default ({ navigation, route }) =>{
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
           
            <Tab.Screen name="경제" component={EconomyPage} 
                initialParams={{
                name: route.name,
            }}/>
            <Tab.Screen name="IT" component={ITPage} 
                initialParams={{
                name: route.name,
            }}/>
            <Tab.Screen name="문화" component={CulturePage} 
                initialParams={{
                name: route.name,
            }}/>            
            <Tab.Screen name="과학" component={GoodPage} 
                initialParams={{
                name: route.name,
                }} />
            <Tab.Screen name="연예" component={EnterPage} 
                initialParams={{
                name: route.name,
            }}/>
            <Tab.Screen name="스포츠" component={SportsPage} 
                initialParams={{
                name: route.name,
            }}/>
        

        </Tab.Navigator>
    );
};

