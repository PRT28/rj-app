// App.js
import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Mystery from './Mystery';
import Commitment from '../Components/Commitment';
import NotificationComponent from '../Components/Notifications';
import ProfileComponent from '../Components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken, getAuthDetails } from '../action/auth';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const {token, data} = useSelector((state) => state.auth);
  const navigation=useNavigation()
  const dispatch =useDispatch()
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false); 
  console.log(data, 'data')
  

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Check if the token is stored in AsyncStorage
        setLoading(true)
        const token = await AsyncStorage.getItem('token');
        console.log('test2', token)
        dispatch(setToken(token));
        if (token !== null && token !== undefined) {
            dispatch(getAuthDetails(token, navigation, setLoading));
        } else {
            navigation.navigate("Home");
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    setUser(data);
    console.log(data)
  }, [data])


  return (
    <>
    {loading && <Text>Loading...</Text>}
    <Tab.Navigator>
        <Tab.Screen
          name=" "
          children={() => <Mystery />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="  "
          children={() => <Commitment />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
       
        <Tab.Screen
          name="    "
          children={() => <NotificationComponent />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        {data.user && <Tab.Screen
          name="     "
          children={() => <ProfileComponent user={data.user} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            headerShown: false
          }}
        />}
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;
