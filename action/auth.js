import * as api from '../api/auth';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (navigation, payload,setLoginOpen) => {
    return dispatch => {
        dispatch({type: 'AUTH_LOAD'});
        return api.login(payload)
                .then(async data => {
                    dispatch({type: 'AUTH_SUCCESS', payload: data.user});
                    dispatch({type: 'SET_TOKEN', payload: data.token});
                    AsyncStorage.setItem('token', data.token)
                    setLoginOpen(false)
                    console.log(data);
                    if (!data.user.is_skipped) {
                        navigation.navigate('Interests');
                    } else {
                        navigation.navigate('Main');
                    }
                })
                .catch(err => {
                    dispatch({type: 'AUTH_FAIL'});
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed'
                })
        })
    }
}
export const register = (payload, setSignonOpen, navigation) => {
    return async dispatch => {
        dispatch({type: 'AUTH_LOAD'});
        return api.register(payload)
                .then(data => {
                    dispatch({type: 'AUTH_SUCCESS', payload: data.user})
                    if (data.response.status !== 200) {
                        Toast.show({
                            type: 'error',
                            text1: 'Register Failed',
                        })
                    } else {
                        setSignonOpen(false)
                        navigation.navigate('Interests');
                    }
                    // setSignonOpen(false)
                    // navigation.navigate('Interests');
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    dispatch({type: 'AUTH_FAIL'});
                    Toast.show({
                        type: 'error',
                        text1: 'Register Failed',
                        text2: err.response.data.error
                    })
                })
    }
}

export const getAuthDetails = (token, navigation, setLoading) => {
    return dispatch => {
        dispatch({type: 'AUTH_LOAD'});
        return api.details(token)
            .then(async data => {
                setLoading(false)
                dispatch({type: 'AUTH_SUCCESS', payload: data});
            })
            .catch(err => {
                setLoading(false)
                console.log(err.response.data);
                if (err.response.data.error === 'jwt expired') {
                    navigation.navigate('Home')
                }
                dispatch({type: 'AUTH_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: err.response.data.error
            })
        })
    }
}

export const setToken = (token) => {
    return dispatch => {
        dispatch({type: 'SET_TOKEN', payload: token})
    }
} 


export const logout = async (navigation) => {
    await AsyncStorage.removeItem('token')
        .then(() => navigation.navigate("Home"));
  };