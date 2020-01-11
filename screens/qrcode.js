import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Vibration
} from 'react-native';
import { Button,Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';  


export default class BarcodeScanner extends React.Component {
    state = {
      hasCameraPermission: null,
      scanned: false,
    };
  
    async componentDidMount() {
      this.getPermissionsAsync();
    }
  
    getPermissionsAsync = async() => {
      const {
        status
      } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === 'granted'
      });
    };
  
    render() {
      const {
        hasCameraPermission,
        scanned
      } = this.state;
  
      if (hasCameraPermission === null) {
        return <Text style={{flex:1, justifyContent:'center'}}> Requesting
        for camera permission </Text>;
      }
      if (hasCameraPermission === false) {
        return <Text> No access to camera </Text>;
      }
      return ( <View style = {{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }} >
        <BarCodeScanner onBarCodeScanned = {
          scanned ? undefined : this.handleBarCodeScanned
        }
        style = {
          {flex:1}
        }
        />
        {this._cross_back()}
        {this._scanner()}
        {
          scanned && ( <Button title = {
              'Tap to Scan Again'
            }
            onPress = {
              () => this.setState({
                scanned: false
              })
            }
            buttonStyle={{
                backgroundColor:'#9bb500', 
                height:40,
             }}
            />
          )
        } 
        </View>
        );
  }
  ///cross
  _cross_back=()=>{
    return(
      <View style={{flexDirection:'row',alignContent:'space-between'}}>
         <Icon
           raised 
           containerStyle={{flex:1,marginTop: 10,}}
           name='ios-close'
           size={20}
           type='ionicon'    
           color='#666' 
           onPress={() =>this.props.navigation.goBack()} />
           <Text style={{fontSize:22,marginTop:26,color:'#fff',fontFamily:'quicksand-bold'}}>Scan Now</Text>
           <View style={{flex:1}}></View>
      </View>

    )
  }

  ///body 
  _scanner=()=>{
      return(
        <Icon
        containerStyle={{flex:13,justifyContent:'center'}} 
        name='ios-qr-scanner'
        size={299}
        type='ionicon'    
        color='rgba(250,250,250,0.29)' 
        />  
      )
  }

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    if(data.includes('https://findithomes.com')){
        Vibration.vibrate() 
        this.props.navigation.navigate('LinksScreen', {  
            title: 'Details',
            link: data,  
          });
    }
    if(data.includes('@finditpromo')){
      Vibration.vibrate()
      let id = data.split
      let link = "https://findithomes.com/?id="+id
      this.props.navigation.navigate('promoScreen', {  
        title: 'Special to You',
        data: data,  
      });
    }else{
        alert(`This QR Code (${data}) is not Findit Homes QR Code. Please Scan On a Findit Homes Qr Code to Book!`);
    }
    
  };
}
