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
import { Icon,Overlay } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { MonoText } from '../components/StyledText';

const width = Dimensions.get('window').width 
const height = Dimensions.get('window').height

export default class  InstanceScreen extends React.Component { 
  static navigationOptions = {
    title: 'title'
  };

   state = {  
     loading: true,
     loading2: true,
     isVisible: false,
     isVisibleFinsh: true, 
     link: 'https://findithomes.com/terms-and-conditions/',
     title:'',
     subtitle:''
    };

    componentWillMount(){
      StatusBar.setHidden(true, 'none'); 
   }

      ///Overlay on tab
      _overlay_tab=()=>{
        let link = this.state.link 
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
                   <Text style={{fontFamily: 'quicksand-bold',fontSize:18,marginTop:10}}>{this.state.title}</Text> 
                   <Icon
                      containerStyle={{flex:1,alignItems: 'flex-end',}} 
                      name='ios-close'
                      size={40}
                      type='ionicon'   
                      color='#555' 
                      onPress={() => this.setState({ isVisible: false })} />
                      
                </View>
                {this._webview_popup(link)}
                {this.state.loading2? this._loadingScreen() : null} 
                
             </View>
             
        </Overlay>
        )
      }

      ///Overlay on finished
      _overlay_finished=()=>{
         
        return(
         <Overlay
            isVisible={this.state.isVisibleFinsh}
            onBackdropPress={() => this.setState({ isVisibleFinsh: false })}
            windowBackgroundColor="rgba(3, 3, 3, .5)"
            overlayBackgroundColor="#fff"
            animationType="slide"  
            width={width-30}
            height={height-40}
            borderRadius={16}
            >
             <View style={{flex:1,padding: 5,}}>  
              
                <View style={{alignContent:'center'}}>
                   <Text style={{fontFamily: 'quicksand-bold',fontSize:25,marginTop:40,textAlign:'center'}}>{this.state.title}</Text> 
                   <Text style={{fontFamily: 'quicksand-regular',fontSize:18,marginTop:40,textAlign:'center'}}>{this.state.subtitle}</Text> 
                      
                </View>
                <View style={styles.loader} > 
                  <LottieView source={require('../assets/lottie/payment-checkmark.json')} autoPlay loop={false} />
                </View>
                
             </View>
             
        </Overlay>
        )
      }

    ///WEB VIEW POPUP
    _webview_popup=(link)=>{
        let jsCode = `
        document.querySelector('.header-type-1').style.display = 'none'; document.querySelector('.footer').style.display = 'none';  
        document.querySelector('#body-area').style.display = 'none ';  
      `;
      return(
        <WebView
         source={{uri: link}}            
         style={{flex:9,}} 
         injectedJavaScript={jsCode}   
         onLoadStart={()=>this.setState({loading2:true})} 
         onLoadEnd={()=>this.setState({loading2:false})} 
         scalesPageToFit={true}
       />
      )
    }

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
          console.log('url: '+url) 
          ///TERMS POPUP
          if(url.includes('https://findithomes.com/terms-and-conditions/')){
            this.setState({ 
                link: 'https://findithomes.com/terms-and-conditions/',
                isVisible: true,
                title: 'Terms and Conditions'
            });
          }
         ///privacy policy POPUP
          if(url.includes('https://findithomes.com/privacy-policy/')){
            this.setState({ 
                link: 'https://findithomes.com/privacy-policy/',
                isVisible: true,
                title: 'Privacy Policy'
            });
          }

        ///SUCCESSFULLY PAID
        if(url.includes('https://findithomes.com/stripe-charge/')){
          console.log('hey there') 
          this.setState({ 
            
            title:'Thank You',
            subtitle: 'Payment Received the reservation has been booked, Your New Home awaits for you!',
            isVisibleFinsh: true,
          })
          setTimeout(()=>{
            this.setState({ isVisibleFinsh: false })
            this.props.navigation.navigate('LinksScreen', {  
              title: 'Reservations', 
              link: url,  
            });
          },2000)

        }
  
    
        }
      }}
     onLoadEnd={()=>this.setState({loading:false})}
     scalesPageToFit={true}
   />
  )
  }

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
        {this._overlay_tab()} 
        {this._overlay_finished()} 
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
