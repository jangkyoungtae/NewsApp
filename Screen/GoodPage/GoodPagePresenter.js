import React from 'react';
import { Text, View } from 'react-native';
import RecommendContent from '../../Component/RecommendContent';

export default ({route}) => {
   
    return (
        <View>
            <Text>여기는 {route.name}화면</Text>
            {route.name ==="경제" &&<RecommendContent />}
        </View>
    );
}