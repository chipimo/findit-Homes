import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { ListItem } from 'react-native-elements'
import { MonoText } from '../components/StyledText';



const list = [
    {
      name: 'Invoice',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Your new invoice has being created'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
    
  ]


export default class  favoriteScreen extends React.Component { 
  static navigationOptions = {
    header: null,
  };
   state = {  
     loading: false 
    };

    componentWillMount(){
        StatusBar.setHidden(true, 'none');
    }
  

  _loadingScreen=()=>{ 
    return(
     <View style={styles.loader} >
      <LottieView source={require('../assets/lottie/preloader.json')} autoPlay loop />
    </View>
    )
    
  }

 
render() {
  return (
    <ScrollView style={{ flex: 1 }}> 
     <Text style={styles.NotificationText}>Notifications</Text>  
      {
        list.map((l, i) => (
          
          <ListItem
           key={i}
           title={l.name}
           subtitle={l.subtitle}
           subtitle={
            <View style={styles.subtitleView}>
              <Text style={styles.ratingText}>Your invoice</Text>  
              <Text style={styles.ratingSubText}>5 months ago</Text>
            </View>
           }
           leftAvatar={{ source: { uri: l.avatar_url } }}
           bottomDivider
          />
        ))
      }
      {this.state.loading? this._loadingScreen() : null}
    </ScrollView>                                                                                                                                   
  );
 }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader:{
    flex:1, 
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#fff'
  },
  subtitleView: {
    paddingLeft: 0,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 3,
    color: 'grey'
  },
  ratingSubText: {
    paddingLeft: 3,
    color: '#d8dce1'
  },
  NotificationText:{
     color:'#000',
     fontFamily:'quicksand-bold',
     fontSize: 33, 
     paddingLeft: 15,
     paddingTop: 40,
     padding: 20,
  }
  
});
