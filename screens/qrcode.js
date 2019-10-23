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
        return <Text > Requesting
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
          StyleSheet.absoluteFillObject
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
           <Text style={{fontSize:20,marginTop:11,color:'#fff',fontFamily:'quicksand-bold'}}>Scan Now</Text>
           <Text style={{color:'rgba(0,0,0,0)'}}>.</Text>
      </View>

    )
  }

  ///body 
  _scanner=()=>{
      return(
        <Icon
        containerStyle={{flex:13,justifyContent:'center'}} 
        name='ios-qr-scanner'
        size={290}
        type='ionicon'    
        color='rgba(250,250,250,0.3)' 
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
    }else{
        alert(`This QR Code (${data}) is not Findit Homes QR Code. Please Scan On a Findit Homes Qr Code to Book!`);
    }
    
  };
}
