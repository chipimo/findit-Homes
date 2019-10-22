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
  ActivityIndicator,
  Dimensions
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Button,Icon,Overlay } from 'react-native-elements';
import LottieView from 'lottie-react-native';

import { MonoText } from '../components/StyledText';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class  HomeScreen extends React.Component { 
  static navigationOptions = {
    header: null,
  };
   state = {  
     loading: true,
     isVisible: false
    };

    componentWillMount(){
      StatusBar.setHidden(true, 'none'); 
   }

   ///Overlay on search
   _overlay_search=()=>{
     return(
      <Overlay
         isVisible={this.state.isVisible}
         onBackdropPress={() => this.setState({ isVisible: false })}
         windowBackgroundColor="rgba(3, 3, 3, .5)"
         overlayBackgroundColor="#fff"
         animationType="slide"  
         width={width-30}
         height={height-40}
         borderRadius={16}
         >
          <View style={{flex:1,padding: 5,}}> 
           
             <View style={{flexDirection:'row',alignContent:'space-between'}}>
                <Text style={{fontFamily: 'quicksand-bold',fontSize:18,marginTop:10}}>Search</Text> 
                <Icon
                   containerStyle={{flex:1,alignItems: 'flex-end',}} 
                   name='ios-close'
                   size={40}
                   type='ionicon'   
                   color='#555' 
                   onPress={() => this.setState({ isVisible: false })} />
             </View>
             
          </View>
         
     </Overlay>
     )
   }

  _webview=()=>{
    let jsCode = `
    document.querySelector('.header-type-1').style.display = 'none';  document.querySelector('.footer').style.display = 'none';
  `;
  return(
    <WebView
     source={{uri: 'https://findithomes.com/mobile-app-home-page/'}}            
     style={{flex:1,}} 
     injectedJavaScript={jsCode}  
     onLoadStart={()=>this.setState({loading:true})}
     onLoadEnd={()=>this.setState({loading:false})}
     scalesPageToFit={true}
   />
  )
  }

  ////header
  _header=()=>{
    return(
      <View style={{flexDirection:'row'}}> 
          <Button
            icon={
             <Icon
              name="search"
              size={19} 
              color="#888" 
            />
            }
           buttonStyle={{
              backgroundColor:'#ddd', 
              height:40,
              borderRadius:50 
           }}
           containerStyle={{
              flex:5,
              width: width - 30, 
              alignSelf: 'center',
              marginTop: 15,
              margin: 4,
           }}
           titleStyle={{
              color: '#888', 
              fontFamily:'quicksand-bold', 
              paddingLeft: 10,
              fontSize:15
            }}
            onPress={() => this.setState({ isVisible: true })} 
            title="Search Now"
         />
         <Icon
            containerStyle={{flex:1,marginTop: 17,}}
            name='ios-qr-scanner'
            size={36}
            type='ionicon'   
            color='#555' 
            onPress={() =>this.props.navigation.navigate('BarcodeScanner')} />
      </View>
    )
  }

  ///Home 
  _Home_View=()=>{
    return(
      <View style={{flex:1}}>
        {this._header()}
        {this._overlay_search()} 
      </View>
    )
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
      {this._Home_View()}
      
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
  
});
