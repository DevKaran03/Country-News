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
  apiKey: 'AIzaSyC0Z_nzsPqm8cgM5Vs5Sxbtg5z3CZnxUgg',
  authDomain: 'news-app-1174b.firebaseapp.com',
  projectId: 'news-app-1174b',
  storageBucket: 'news-app-1174b.appspot.com',
  messagingSenderId: '1011993231870',
  appId: '1:1011993231870:web:c71776cc13ecd4d76400af',
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
    OneSignal.setAppId('eb41ff24-e3f6-45e4-a2ef-cbbdfa46fe58');
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
