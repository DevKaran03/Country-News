import React from 'react';
import OneSignal from 'react-native-onesignal';
import type {Node} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import WebViewScreen from './Screens/WebViewScreen';
import firebase from '@react-native-firebase/app';

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: 'Firebase_apikey',
  authDomain: 'Firebase_auth_domain',
  projectId: 'project_id',
  storageBucket: 'Firebase_bucket,
  messagingSenderId: 'sender_id',
  appId: 'App_id',
};
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
const fn = () => {
  OneSignal.setNotificationOpenedHandler(openedEvent => {
    const {notification} = openedEvent;
    if (notification.launchURL) {
      const launch = notification.launchURL;
      console.log(launch);

      return launch;
    }
  });
};
const App = ({navigation}) => {
  React.useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('Onesignal_appid');
    return () => {
      fn();
    };
  }, []);
  var launch = fn();
  console.log(launch);
  const deepLinking = {
    prefixes: ['demoApp://', launch],
    HomeScreen: {screen: HomeScreen},
    WebViewScreen: {
      screen: WebViewScreen,
      path: 'WebViewScreen/:newsUrl',
      params: {
        newsUrl: launch,
      },
    },
  };
  return (
    <NavigationContainer linking={deepLinking}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
