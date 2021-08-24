import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
export default ({ route }) => {
    const urlData = route.params ? route.params.url : route.url;
     function renderLoading(){ return(<ActivityIndicator style = {{position: 'absolute',left: 0,right: 0, top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center'}} size={'large'} color={'black'} />); }
    return (
        <WebView
            style={{
                padding:20
            }}        
            originWhitelist={['*']}
            source={{ uri: urlData }}
            renderLoading={renderLoading}
            startInLoadingState
        />
    )
}