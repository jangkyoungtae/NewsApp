import React from 'react';
import { WebView } from 'react-native-webview';
export default ({ route }) => {
    console.log(route.params.url);
    return (
        <WebView
            style={{
                padding:20
            }}
            originWhitelist={['*']}
            source={{ uri: route.params.url }}
        />
    )
}