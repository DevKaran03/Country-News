import React from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

function WebViewScreen({route, navigation}) {
  const {newsUrl} = route.params;
  return <WebView source={{uri: newsUrl}} />;
}

export default WebViewScreen;
