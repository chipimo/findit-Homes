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
    StatusBar
} from 'react-native';
import { Button,Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';


const dim = Dimensions.get('window').width

export default class SignupScreen extends React.Component {
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

 /////SignUp button////
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
              loading: false
            })
            setTimeout(() => {
              this.props.navigation.navigate('Main');
              },2000)
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

    _renderItem = () => {
        return( 
        <ImageBackground 
          source={require('../assets/images/loginbg.jpg')}
          style={styles.mainContent} >
           <View style={{flex:1,alignItems:'center'}}>
             <Image 
               source={require('../assets/images/findit.png')}
               style={{flex:1,width:145,height:null,resizeMode:'contain'}}
             />

             <View style={{flex:3}}>
             <Text 
                style={{
                    color:'#fff',
                    fontSize:26,
                    alignSelf:'center', 
                    marginBottom:10
                }}
                >Create an Account</Text> 
               <Animatable.View ref={this.handleViewRef}>
                <TextInput
                 style={[styles.TextInput,{borderColor:this.state.borderColorEmail}]} 
                 placeholderTextColor="rgba(250,250,250,.7)"
                 placeholder="Email or Number"
                 onChangeText={(email) => this.setState({ email })}
                 value={this.state.email}
                />
                <TextInput
                 style={[styles.TextInput,{marginTop:15,marginBottom:25,borderColor:this.state.borderColorPassword}]} 
                 placeholderTextColor="rgba(250,250,250,.7)" 
                 secureTextEntry={true}
                 placeholder="Password"
                 onChangeText={(Password) => this.setState({ Password })}
                 value={this.state.Password}
                />
              </Animatable.View>
               

              <Button
                loading={this.state.loading}
                title="SIGN UP"
                onPress={()=>this._buttonPress()}
                buttonStyle={{
                    backgroundColor:'#e24000',
                    height:52,
                    borderRadius:20
                }}
                titleStyle={{
                    fontWeight:'500' 
                }}
              />
               
               <View style={{flexDirection:'row',alignSelf:'center'}}>
                <Text style={styles.bottomText}>
                  Already have an Account?  
                </Text> 

                 <TouchableOpacity 
                   onPress={() =>this.props.navigation.goBack()} >

                   <Text style={[styles.bottomText,{fontWeight:'900'}]}> Login</Text>
                 </TouchableOpacity> 
               </View>

                <View style={{alignItems:'center',marginTop:10}}>
                 <View style={{flexDirection:'row'}}>
                  <Icon
                    reverse
                    name='logo-facebook' 
                    type='ionicon'
                    color='rgba(2, 102, 234,.4)'  
                  />
                  <Icon
                    reverse
                    name='logo-googleplus' 
                    type='ionicon'
                    color='rgba(226, 34, 0,.4)'
                  />
                  <Icon
                    reverse
                    name='logo-linkedin' 
                    type='ionicon'
                    color='rgba(40, 119, 255,.4)'
                  />
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
      backgroundColor:'rgba(250,250,250,.2)', 
      borderRadius:20, 
      borderWidth: 1,
      borderColor:'#fff',
      color:'#fff',
      fontSize:19,
      fontWeight: '500',
      paddingHorizontal:20,
   },
    bottomText:{
      color:'#fff',
      fontSize:16,
      alignSelf:'center', 
      marginTop:16
    }

})