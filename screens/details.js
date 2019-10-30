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
  StatusBar,
  ActivityIndicator
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Icon } from 'react-native-elements'
import LottieView from 'lottie-react-native';


export default class  DetailsScreen extends React.Component { 
  static navigationOptions = {
    title: 'title'
  };

   state = {  
     loading: true
    };

    componentWillMount(){
      StatusBar.setHidden(true, 'none'); 
   }

///WEB VIEW
  _webview=()=>{
    let link = this.props.navigation.state.params.link
    let jsCode = `
    document.querySelector('.header-type-1').style.display = 'none'; document.querySelector('.footer').style.display = 'none';  
    document.querySelector('#body-area').style.display = 'none ';  
  `;
  return(
    <WebView
     source={{uri: link}}            
     style={{flex:9,}} 
     ref={(ref)=>{this.webview = ref}}
     injectedJavaScript={jsCode}  
     onNavigationStateChange={(event)=>{
        let url = event.url
        let home = this.props.navigation.state.params.link; 
        if(url !== home){
        this.webview.stopLoading()
          ///details page
          if(url.includes('https://findithomes.com/listing/')){
            this.props.navigation.navigate('LinksScreen', {  
              title: 'Details',
              link: url,  
            });
          }
          ///instance booking page
          if(url.includes('https://findithomes.com/instance/')){
            this.props.navigation.navigate('InstanceScreen', {  
              title: 'Booking',
              link: url,  
            });
          }

        }
        
      }}
     onLoadEnd={()=>this.setState({loading:false})}
     scalesPageToFit={true}
   />
  )
  }

  ///LOADING
  _loadingScreen=()=>{
    return(
     <View style={styles.loader} >
      <LottieView source={require('../assets/lottie/preloader.json')} autoPlay loop />
    </View>
    )
    
  }

  ///HEADER
  _header=()=>{
    let title = this.props.navigation.state.params.title
    return(
     <View style={styles.header}>
      <Icon 
         name='navigate-before'
         onPress={() => this.props.navigation.goBack()} 
         containerStyle={{padding: 10,margin:9}}
         size={30}
      />
      <Text style={styles.NotificationText}>{title}</Text>
      <Icon 
         name='more-horiz'
         onPress={() => this.props.navigation.goBack()} 
         containerStyle={{padding: 10,margin:10}} 
         size={30}
         color='#fff' 
      />
    </View>
    )
  }

 
render() {
  let title = this.props.navigation.state.params.title
  return (
    <View style={{ flex: 1 }}>
      {this._header()}
      <View style={{flex:10}}> 
        {this._webview()}
      </View>
      
      {this.state.loading? this._loadingScreen() : null}
    </View>                                                                                                                                   
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
    top:50,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#fff'
  },
  NotificationText:{
    color:'#000',
    fontFamily:'quicksand-bold',
    fontSize: 20, 
    paddingLeft: 0,
    paddingTop: 21,   
 },
  header:{
    flex:1,
    backgroundColor:"#fff",
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor: 'rgba(0,0,0,.1)', 
    borderBottomWidth: 1,
 }
  
});
