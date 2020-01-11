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
  ImageBackground,
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
     isVisible: false, 
     isVisibleHelp: false
    };

    componentWillMount(){
      StatusBar.setHidden(true, 'none'); 
      setTimeout(() => {
        this.setState({ isVisible: true })
      }, 7000);
   }

   ///OVERLAY WELCOME TAB
   _overlay_welcome=()=>{
     return(
      <Overlay
         isVisible={this.state.isVisible}
         onBackdropPress={() => this.setState({ isVisible: false })}
         windowBackgroundColor="rgba(3, 3, 3, .5)" 
         overlayBackgroundColor="#fff" 
         animationType="slide"
         overlayStyle={{padding:0,margin:0,overflow:'hidden'}}    
         width={width-30}
         height={height-40}
         borderRadius={16}
         >
         <ImageBackground source={require('../assets/images/background-welcome.jpg')} style={{width: '100%', height: '100%',}}>
          <View style={{flex:3,padding:20}}> 
           
             <View style={{flexDirection:'row',alignContent:'space-between'}}>
                <Text style={{fontFamily: 'quicksand-bold',fontSize:18,marginTop:10}}></Text> 
                <Icon
                   containerStyle={{flex:1,alignItems: 'flex-end',}} 
                   name='ios-close'
                   size={40} 
                   type='ionicon'    
                   color='#fff' 
                   onPress={() => this.setState({ isVisible: false })} /> 
                   
             </View>

          </View>
                <Button
                  title="Get Started"
                  onPress={() => {
                    this.setState({ isVisibleHelp: false })
                    this.props.navigation.navigate('LinksScreen', {
                      title: 'Become a Landlord',
                      link: 'https://findithomes.com/become-a-landlord',
                    });
                   }}
                  buttonStyle={{
                   backgroundColor:'#a9c500',
                   height:40,
                   width: width-70,
                   alignSelf:'center',
                   borderRadius:50,
                  
                 }}
                 containerStyle={{   
                     flex:1,
                     marginTop:40 
                 }}
                 titleStyle={{
                  fontWeight:'500',
                  fontFamily:'quicksand-bold',  
                }}
               />
        </ImageBackground>
     </Overlay>
     )
   }

   ///OVERLAY PROMOTION TAB
   _overlay_promotion=()=>{
     return(
      <Overlay
         isVisible={this.state.isVisiblePromo}
         onBackdropPress={() => this.setState({ isVisiblePromo: false })}
         windowBackgroundColor="rgba(3, 3, 3, .5)" 
         overlayBackgroundColor="#fff" 
         animationType="slide"
         overlayStyle={{padding:0,margin:0,overflow:'hidden'}}    
         width={width-30}
         height={height-40}
         borderRadius={16}
         >
         <ImageBackground source={require('../assets/images/background-welcome.jpg')} style={{width: '100%', height: '100%',}}>
          <View style={{flex:3,padding:20}}> 
           
             <View style={{flexDirection:'row',alignContent:'space-between'}}>
                <Text style={{fontFamily: 'quicksand-bold',fontSize:18,marginTop:10}}></Text> 
                <Icon
                   containerStyle={{flex:1,alignItems: 'flex-end',}} 
                   name='ios-close'
                   size={40} 
                   type='ionicon'    
                   color='#fff' 
                   onPress={() => this.setState({ isVisiblePromo: false })} /> 
                   
             </View>

          </View>
                <Button
                  title="Get Started"
                  onPress={() => {
                    this.setState({ isVisiblePromo: false })
                    this.props.navigation.navigate('LinksScreen', {
                      title: 'Become a Landlord',
                      link: 'https://findithomes.com/become-a-landlord',
                    });
                   }}
                  buttonStyle={{
                   backgroundColor:'#a9c500',
                   height:40,
                   width: width-70,
                   alignSelf:'center',
                   borderRadius:50,
                  
                 }}
                 containerStyle={{   
                     flex:1,
                     marginTop:40 
                 }}
                 titleStyle={{
                  fontWeight:'500',
                  fontFamily:'quicksand-bold',  
                }}
               />
        </ImageBackground>
     </Overlay>
     )
   }

   ///Overlay HELP
   _overlay_help=()=>{  
     return(
      <Overlay
         isVisible={this.state.isVisibleHelp}
         onBackdropPress={() => this.setState({ isVisibleHelp: false })}
         windowBackgroundColor="rgba(3, 3, 3, .5)"
         overlayBackgroundColor="#fff"
         animationType="slide"  
         width={width-30}
         height={height-40}
         borderRadius={16}
         >
          <View style={{flex:1,padding: 5,}}> 
           
             <View style={{flexDirection:'row',alignContent:'space-between'}}>
                <Text style={{fontFamily: 'quicksand-bold',fontSize:18,marginTop:10}}>HELP CENTER</Text> 
                <Icon
                   containerStyle={{flex:1,alignItems: 'flex-end',}} 
                   name='ios-close'
                   size={40}
                   type='ionicon'   
                   color='#555' 
                   onPress={() => this.setState({ isVisibleHelp: false })} />    
              </View>
              <ScrollView style={{flex:9}}>
                <Image 
                  style={{width: null, height:150,resizeMode:'contain',marginBottom:14,alignContent:'center'}} 
                  source={require('../assets/images/team.png')}
                />
               <View style={{flex:2}}>
               <Text style={{fontFamily:'quicksand-regular',textAlign:'center'}}> 
               We are dedicated to providing the most enjoyable and stress-free home search. From booking to final confirmation, we’re there for you!
               </Text>
                <Button
                  title="How it Works"
                  onPress={() => {
                    this.setState({ isVisibleHelp: false })
                    this.props.navigation.navigate('LinksScreen', {
                      title: 'How it Works',
                      link: 'https://findithomes.com/how-it-works-mobile-app',
                    });
                   }}
                  buttonStyle={{
                   backgroundColor:'#a9c500',
                   height:40,
                   borderRadius:50,
                   marginTop:20
                  }}
                  titleStyle={{
                   fontWeight:'500',
                   fontFamily:'quicksand-bold', 
                  }}
                />
               <Button
                  title="Become a landlord"
                  onPress={() => {
                    this.setState({ isVisibleHelp: false })
                    this.props.navigation.navigate('LinksScreen', {
                      title: 'Become a Landlord',
                      link: 'https://findithomes.com/become-a-landlord',
                    });
                   }}
                  buttonStyle={{
                   backgroundColor:'#a9c500',
                   height:40,
                   borderRadius:50,
                   marginTop:20
                 }}
                 titleStyle={{
                  fontWeight:'500',
                  fontFamily:'quicksand-bold',  
                }}
               />
               <Button
                  title="Chat Live Now"
                  onPress={() => {
                    this.setState({ isVisibleHelp: false })
                    this.props.navigation.navigate('LinksScreen', { 
                      title: 'Live Chat',
                      link: 'https://tawk.to/chat/5d5ce6dc77aa790be32ff654/default?$_tawk_sk=5db855fb529fac636bd17265&$_tawk_tk=1e2e584eb9b3131cd2cb296a1d730925&v=680',
                    });
                   }}
                  buttonStyle={{
                    backgroundColor:'#a9c500',
                    height:40,
                    borderRadius:50,
                    marginTop:20
                  }}
                  titleStyle={{
                    fontWeight:'500',
                    fontFamily:'quicksand-bold',  
                  }}
                 />
               <Button
                  title="Community Help"
                  onPress={() => {
                    this.setState({ isVisibleHelp: false })
                    this.props.navigation.navigate('LinksScreen', { 
                      title: 'Help',
                      link: 'https://help.findithomes.com/',
                    });
                   }}  
                  buttonStyle={{
                    backgroundColor:'#a9c500',
                    height:40,
                    borderRadius:50,
                    marginTop:20
                  }}
                  titleStyle={{
                    fontWeight:'500',
                    fontFamily:'quicksand-bold',  
                  }}
                 />
               </View>
              </ScrollView>

             
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
     style={{flex:10,}} 
     ref={(ref)=>{this.webview = ref}}
     injectedJavaScript={jsCode}
     onShouldStartLoadWithRequest={(event) => { 
      let url = event.url
      let home = 'https://findithomes.com/mobile-app-home-page/'; 
      if (event.url.includes("https://findithomes.com/")) {
         ////Stoping load
          this.webview.stopLoading() 
          if(url !== home){
            this.webview.stopLoading()
    
            ///details page
            if(url.includes('https://findithomes.com/listing/')){
              this.props.navigation.navigate('DetailsScreen', {  
                title: 'Details',
                link: url,  
              });
            }
    
            ///compare page
            if(url.includes('https://findithomes.com/compare/')){  
              this.props.navigation.navigate('LinksScreen', {  
                title: 'Compare',
                link: url,  
              });
            }
            ///map page
            if(url.includes('https://findithomes.com/mobile-map/')){          
              this.props.navigation.navigate('LinksScreen', {  
                title: 'Map Search',
                link: url,  
              });
            }
            ///landlord page
            if(url.includes('https://findithomes.com/become-a-landlord/')){    
              this.props.navigation.navigate('LinksScreen', {  
                title: 'Become a Landlord',
                link: url,  
              });
            }
            ///type page
            if(url.includes('https://findithomes.com/type/')){
              this.props.navigation.navigate('typeScreen', {  
                title: this._type_title(url),
                link: url,  
              });
            }
            ///help popup page
            if(url.includes('https://findithomes.com/help')){   
              this.setState({ isVisibleHelp: true })
            }
            ///QRCODE PAGE 
            if(url.includes('https://findithomes.com/qrcode')){    
              this.props.navigation.navigate('BarcodeScanner')
            }
            
    
      
          }
          
          return false
      }
      return true
     }}  
     
     onLoadEnd={()=>this.setState({loading:false})}
     scalesPageToFit={true}
   />
  )
  }

  _type_title=(url)=>{ 

    if(url.includes('house')){
      return 'Houses'
    } 
    if(url.includes('apartment')){
      return 'Apartments'
    } 
    if(url.includes('condo')){
      return 'Condos'
    } 
    if(url.includes('cottage')){
      return 'Cottage'
    }

  }

  _onLoader_navigation=(event)=>{
    let url = event.url
    let home = 'https://findithomes.com/mobile-app-home-page/';
    let detail = 'https://findithomes.com/'
    if(url !== home){
      this.webview.stopLoading()
      ///details page
      if(url.includes('https://findithomes.com')){
        this.props.navigation.navigate('LinksScreen', {  
          title: 'Details',
          link: url,  
        });
      }

    }
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
              marginTop: 10,
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
            containerStyle={{flex:1,marginTop: 12,}}                 
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
        
        {this._webview()}      
        
        {this._overlay_welcome()} 
        {this._overlay_help()} 
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
    <View style={{ flex: 1 }}>      
      {this._Home_View()}
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
    top:0,  
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#fff'  
    
  },
  
});
