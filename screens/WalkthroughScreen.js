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
  StatusBar
} from 'react-native';
import {
  StackActions,
  NavigationActions, 
} from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native'
import { LinearGradient } from 'expo';
const dim = Dimensions.get('window').width

const slides = [
  {
    key: '1',
    title: 'Easy to Find',
    widthicon: null,
    text: 'Find a House,Lodge,Hotel,Guest House,Office Space just at a click of a button. ',
    icon: require('../assets/lottie/location.json'),
    colors: ['#159957', '#155799'],
  },
  {
    key: '2',
    title: 'Easy to Pay ',
    widthicon: null,
    text: 'Find a House,Lodge,Hotel,Guest House,Office Space and pay right away in just a few clicks.',
    icon: require('../assets/lottie/payment.json'),
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: '3',
    title: 'Shifting/ Trasport', 
    widthicon: 320,
    text: 'We help you Shift with ease by providing you with safe and secure transport to your destination.',
    icon: require('../assets/lottie/shifting.json'),
    colors: ['#6441A5', '#243B55'],
  }
  
];

export default class WalkthroughScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    index: 0,
    showRealApp: false
  };

  componentWillMount(){
    StatusBar.setHidden(true, 'none');
  }
  
  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
    
     <LottieView
        source={props.icon}
        autoPlay
        width={props.widthicon}
        loop
        style={{flex:1,marginTop:-50}}  
      />
      <View></View>
      
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    const toHome = StackActions.reset({ 
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })], 
    });
    this.props.navigation.dispatch(toHome);
  }




  render = () => (
    <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
      />
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)', 
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25, 
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});
