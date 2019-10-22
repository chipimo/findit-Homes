import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity,
    Platform,
    TextInput,
    StatusBar,
    AsyncStorage
} from 'react-native';
import { Button,Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native'
import { LinearGradient } from 'expo';
import { colors } from 'react-native-elements';

const dim = Dimensions.get('window').width

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
      loading: false,
      email:'',
      Password:'',
      borderColorPassword: '#fff',
      borderColorEmail: '#fff',
    };
    componentWillMount() {
        StatusBar.setHidden(true, 'none');
    }
    handleViewRef = ref => this.view = ref;
    shake = () => this.view.shake(800)


    ////STORE DADA FOR USER 
    async saveToStorage(userData){
      if (userData) {
          await AsyncStorage.setItem('user', JSON.stringify({
                  isLoggedIn: true,
                  authToken: userData.auth_token,
                  id: userData.user_id,
                  name: userData.user_login
              })
          );
          return true;
      }
  
      return false;
  }
    
/////BUTTON FOR LOGIN
    _buttonPress= ()=>{
        this.setState({
            loading: true
        })
        ////VALIDATE EMAIL
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let email = this.state.email;
        let Password = this.state.Password;

        ////CHECKING IF VALUE AVAIBLE
        if(email && Password){ 

          ///CHECKING EMAIL
          if(reg.test(email)=== false){
            this.setState({
              borderColor:'#d63e3e',
              loading: false
            })
          }else{
            this.setState({
              borderColor:'#fff',
              loading: true
            })
            ////CHECKING FROM SERVER 
            let formData = new FormData();
            formData.append('type', 'login');
            formData.append('email', email);
            formData.append('password', Password);

             fetch('https://findithomes.com/authentication.php', {
              method: 'POST',
              body: formData
             })
             .then((response) => response.json())  
             .then((responseJson) => {
                 let data = responseJson.data;
                 console.log(data)
                  ////CHECKING RESPONSE FROM SERVER
                 if (this.saveToStorage(data)){
                     this.setState({
                         validating: false
                     });
     
                     /* Redirect to accounts page */
                     this.props.navigation.navigate('Tabs');
                 } else {
                   /////FAILED TO LOGIN
                    this.shake(); 
                    this.setState({
                      borderColorEmail:'#d63e3e',
                      borderColorPassword:'#d63e3e',
                      loading: false
                    })
                     console.log('Failed to store auth');
                 }
             })
             .catch((error) => {
                 console.error(error);
             });
          }
          
        }else {
          this.shake(); 
          this.setState({
            borderColorEmail:'#d63e3e',
            borderColorPassword:'#d63e3e',
            loading: false
          })
        }
        
    }


 /////RENDER THE VIEW
    _renderItem = () => {
        return( 
        <ImageBackground 
          source={require('../assets/images/background.jpg')}
          style={styles.mainContent} >
           <View style={{flex:1,alignItems:'center'}}>
             <Image 
               source={require('../assets/images/logo.png')}
               style={{flex:1,width:150,height:null,resizeMode:'contain'}}
             />
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subwelcomeText}>Find your Dream Home in Minutes</Text>
             <View style={{flex:2}}>
             <Animatable.View ref={this.handleViewRef}>
              <TextInput
                style={[styles.TextInput,{borderColor:this.state.borderColorEmail}]} 
                placeholderTextColor="rgba(0,0,0,.3)"
                placeholder="Email or Number"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                style={[styles.TextInput,{marginTop:15,marginBottom:25,borderColor:this.state.borderColorPassword}]} 
                placeholderTextColor="rgba(0,0,0,.3)" 
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(Password) => this.setState({ Password })}
                value={this.state.Password}
              />
             </Animatable.View>
              <Button
                loading={this.state.loading}
                title="LOGIN"
                onPress={()=>this._buttonPress()}
                buttonStyle={{
                    backgroundColor:'#a9c500',
                    height:46,
                    borderRadius:50
                }}
                titleStyle={{
                    fontWeight:'500' 
                }}
              />
              <View style={{flexDirection:'row',alignSelf:'center'}}>
                <Text style={styles.bottomText}>
                  Don't have an Account?  
                </Text> 

                 <TouchableOpacity 
                   onPress={() =>this.props.navigation.navigate('Signup')} >

                   <Text style={[styles.bottomText,{fontWeight:'900'}]}> SignUp</Text>
                 </TouchableOpacity> 
               </View>

                <View style={{alignItems:'center',marginTop:10}}>
                 <View style={{flexDirection:'row'}}>

                 <TouchableOpacity  onPress={() => console.log('hello')} >
                   <Icon
                    reverse
                    name='logo-facebook' 
                    type='ionicon'
                    color='rgba(2, 102, 234,.4)'  
                   />
                 </TouchableOpacity>
                 
                 <TouchableOpacity onPress={() => console.log('hello')}>
                  <Icon
                    reverse
                    name='logo-googleplus' 
                    type='ionicon'
                    color='rgba(226, 34, 0,.4)'
                    
                  />
                 </TouchableOpacity>
                
                  
                 </View>
                </View>
             </View>
             
           </View>
        </ImageBackground>
        )
    }

    render = () => this._renderItem()

}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
    },
    TextInput:{
        height: 45,  
        width: dim -50, 
        backgroundColor:'rgba(250,250,250,.9)', 
        borderRadius:20, 
        borderWidth: 1,
        borderColor:'#fff',
        color:'#fff',
        fontSize:16,
        fontFamily:'quicksand-bold',
        fontWeight: '500',
        paddingHorizontal:20,
    },
    bottomText:{
      color:'#fff',
      fontSize:16,
      alignSelf:'center', 
      marginTop:16
    },
    welcomeText:{
      color:'#c2e200',
      fontSize:35,
      alignSelf:'center',  
    
      fontFamily:'quicksand-bold',
    },
    subwelcomeText:{
      color:'#fff',
      fontSize:16,
      alignSelf:'center', 
      marginBottom:22, 
    }


})