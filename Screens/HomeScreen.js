import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Picker,
} from 'react-native';
import axios from 'axios';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from '@react-native-firebase/admob';

function HomeScreen({navigation}) {
  const [news, setNews] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('in');
  React.useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${selectedValue}&apiKey={News_Api_Key}`,
      )
      .then(data => {
        setNews(data.data.articles);
      });
  }, [selectedValue]);
  return (
    <View
      style={{
        backgroundColor: '#e4e4e4',
        height: '100%',
      }}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Select Country
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="India" value="in" />
            <Picker.Item label="United State" value="us" />
          </Picker>
        </View>

        {news.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                borderColor: 'white',
                borderWidth: 1,
                margin: 5,
                padding: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontStyle: 'italic', fontSize: 25}}>
                {item.title}
              </Text>
              <Image
                style={{width: '100%', height: 250, margin: 5}}
                source={{uri: item.urlToImage}}
              />
              {item.author != null ? (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontStyle: 'italic',
                    }}>
                    By :
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontStyle: 'italic',
                    }}>
                    {' '}
                    {item.author}
                  </Text>
                </View>
              ) : null}
              <View style={{flexDirection: 'row'}}>
                <Text>On : </Text>
                <Text>{Date(item.publishedAt)}</Text>
              </View>

              <Text style={{fontWeight: 'bold'}}>Description:</Text>
              <Text style={{fontStyle: 'italic'}}>{item.description}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WebViewScreen', {
                    newsUrl: item.url,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  marginRight: 10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text style={{alignSelf: 'center'}}>Open</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <BannerAd size={BannerAdSize.SMART_BANNER} unitId={TestIds.BANNER} />
    </View>
  );
}

export default HomeScreen;
