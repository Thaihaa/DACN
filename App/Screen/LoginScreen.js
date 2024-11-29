import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import app from './../../assets/images/app.png'
import Colors from '../Utils/Colors'
import google from './../../assets/images/google.png'
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={app} 
        style={{width:500,height:300,objectFit:'contain',marginTop:100}}
      />
      <View style={{height:400,backgroundColor:Colors.SPLIGHT_GREEN,width:'100%',marginTop:100,padding:20}}>
            <Text style={{textAlign:'center',fontSize:35,color:Colors.DARK_GRAY,fontFamily:'bold',marginTop:30}}>Welcome to Moai Moai English</Text>
            <Text style={{textAlign:'center',fontSize:20,marginTop:50,color:Colors.BLACK,fontFamily:'outfit'}}>Đăng nhập bằng tài khoản Google</Text>
            <TouchableOpacity onPress={onPress} style={{backgroundColor:Colors.WHITE,display:'flex',flexDirection:'row',alignItems:'center',gap:10,justifyContent:'center',padding:10,borderRadius:99,marginTop:25}}>
                <Image source={google} style={{width:40,height:40}} />
                <Text style={{fontSize:20,color:Colors.PRIMARY,fontFamily:'outfit'}}>Sign in with Google</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}