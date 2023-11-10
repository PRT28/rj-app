import { Platform, UIManager } from 'react-native';
import { useEffect,useState } from 'react';
import * as Font from 'expo-font';
import { Landing } from './Screens/Landing';
import ClickableNonLinearItems from './Screens/Hello';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Screens/MainScreen';
import CommitmentFlow from './Screens/MysteryJoy';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './reducers/reducer';
import { Splash } from './Screens/Splash';

const getFont = () => Font.loadAsync({
  'Recursive-Bold':require('./assets/Fonts/Recursive_Casual-Bold.ttf'),
  'Recursive-Light':require('./assets/Fonts/Recursive_Casual-Light.ttf'),
  'Recursive-Medium':require('./assets/Fonts/Recursive_Casual-Medium.ttf'),
});


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const Stack = createStackNavigator();
  const [fontLoaded,setFontsLoaded]=useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await getFont();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  if (fontLoaded){
    return (
      <>
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Landing} />
            <Stack.Screen name="Interests" component={ClickableNonLinearItems} />
            <Stack.Screen name="mystery" component={CommitmentFlow} />
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
      </>
      
    );
  }
}
