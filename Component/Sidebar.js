import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';


function Sidebar({ sort, changeSort, props }) {
    
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItem
                label="정렬"
                labelStyle={{
                    fontWeight:'bold'
                }}
                onPress={() => boardSort(sort)}
                />
            </DrawerContentScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
