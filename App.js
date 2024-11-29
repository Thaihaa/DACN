import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './App/Screen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { useState } from 'react';
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
  'TNodeChildrenRenderer: Support for defaultProps',
  'MemoizedTNodeRenderer: Support for defaultProps',
  'TRenderEngineProvider: Support for defaultProps'
]);

export default function App() {
  const [isChapterComplete,setIsChapterComplete]=useState(false);
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'smbold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });
  return (
    <ClerkProvider publishableKey={"pk_test_d2lyZWQtaG91bmQtNzkuY2xlcmsuYWNjb3VudHMuZGV2JA"} debug={false}>
    <CompleteChapterContext.Provider value={{isChapterComplete,setIsChapterComplete}}>
    <View style={styles.container}>
    <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
        </NavigationContainer>
      </SignedIn>

      <SignedOut>
        <LoginScreen/>
      </SignedOut>
    </View>
    </CompleteChapterContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40
  },
});
