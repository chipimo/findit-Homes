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
  ActivityIndicator
} from 'react-native'
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { ListItem } from 'react-native-elements'
import { MonoText } from '../components/StyledText';

const list = [
  {"id":"6","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/pics-150x150.jpg","name":"Mulenga chipimo","time":"October 17, 2019 6:36 am","message":"Hell mr landlord ","link":"https:\/\/findithomes.com\/messages\/?thread_id=6&seen=1#message-9"},


{"id":"57","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/pics-150x150.jpg","name":"Mulenga chipimo","time":"October 2, 2019 3:57 pm","message":"FDHDFJGJ","link":"https:\/\/findithomes.com\/messages\/?thread_id=5#message-8"},


{"id":"4","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/pics-150x150.jpg","name":"Mulenga chipimo","time":"September 28, 2019 4:53 pm","message":"hello landlord","link":"https:\/\/findithomes.com\/messages\/?thread_id=4&seen=1#message-7"},


{"id":"3","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/20190914_161437-150x150.jpg","name":"Chama Chipimo","time":"September 16, 2019 7:03 pm","message":"Helotes I want your home","link":"https:\/\/findithomes.com\/messages\/?thread_id=3#message-6"},


{"id":"2","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/DSC_1535-150x150.jpg","name":"Findithomes","time":"September 15, 2019 2:46 am","message":"Hey \ud83d\udc4b how are you","link":"https:\/\/findithomes.com\/messages\/?thread_id=2#message-4"},


{"id":"1","profile":"https:\/\/findithomes.com\/wp-content\/uploads\/2019\/09\/pics-150x150.jpg","name":"Mulenga chipimo","time":"September 15, 2019 2:47 am","message":"Thank you for booking ","link":"https:\/\/findithomes.com\/messages\/?thread_id=1#message-5"},

    
  ]


export default class  inboxScreen extends React.Component { 
  static navigationOptions = {
    header: null,
  };
   state = {  
     loading: false, 
     messages: list,
     No_messages: false,
    };
    componentWillMount(){
      this._Get_messages()
    }

  _Get_messages=()=>{

    this.setState({
      loading:true,
    })
    
    fetch('http://findithomes.com/wp-json/findithomes/v1/messages')
     .then((response) => response.json())  
     .then((responseJson) => {
         let res = responseJson;
         console.log(res)
          ////CHECKING RESPONSE FROM SERVER
         if (typeof  res !== 'undefined' && res.length > 0){ 
             this.setState({ 
                 loading: false,
                 messages: [ ...res, ...this.state.messages]
             });
         } else {
           /////NO MESSAGES 
            this.setState({
              No_messages: true,
              loading: false,
            })
             
         }
     })

  }
  
////LOADING SCREEN
  _loadingScreen=()=>{ 
    return(
     <View style={styles.loader} >
      <LottieView source={require('../assets/lottie/telegram.json')} autoPlay loop />
      
    </View>
    )
  }

/////NO MESSAGES
_NO_messages=()=>{
  return(
    <View style={styles.no_messages} >
     <LottieView style={{width:350,alignSelf:'center' }} source={require('../assets/lottie/open-mail.json')} autoPlay loop={false}/> 
     <Text style={[styles.NotificationText,{fontSize:20,alignSelf:'center',paddingTop:0,marginTop:-60 }]}>No Messages</Text>
   </View>
   )
}

///MESSAGES THREADS
_MESSAGES_THREAD=()=>{
 let message = this.state.messages.map((l, i) => ( 
          
    <ListItem
     key={l.id}
     title={l.name}
     subtitle={l.message}
     subtitle={
      <View style={styles.subtitleView}>
        <Text style={styles.ratingText}>{l.message}</Text>  
        <Text style={styles.ratingSubText}>{l.time}</Text>
      </View>
     }
     leftAvatar={{ source: { uri: l.profile } }}
     bottomDivider
     onPress={() => {
      this.props.navigation.navigate('chatScreen', {  
        title: 'Profile',
        link: 'https://findithomes.com/profile/',  
      });
     }}
    />

  ))
  return message 
}

 
render() {
  return (
    <ScrollView style={{ flex: 1 }}> 
     <Text style={styles.NotificationText}>Inbox</Text>
   
      {this.state.No_messages? this._NO_messages(): this._MESSAGES_THREAD()}
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
  },
  no_messages:{
    flex:1,

  }
  
});
