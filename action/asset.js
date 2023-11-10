import * as api from '../api/asset';
import Toast from 'react-native-toast-message';

export const getRandomAsset = (token, setState)  => {
    return dispatch => {
        dispatch({type: 'ASSET_LOAD'});
        return api.randomAsset(token)
            .then(async data => {
                console.log(data?.data);
                dispatch({type: 'ASSET_SUCCESS', payload: data?.data});
                if (data?.data?.isMystery) {
                    setState(4);
                } else {
                    switch(data?.data?.openedWith) {
                        case 0: setState(2);
                                break;
                        case 1: setState(1);
                                break;
                        case 2: setState(3);
                                break
                    }
                }
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({type: 'ASSET_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch data'
            })
        })
    }
}

export const setSound = (v) => {
    return dispatch => {
        dispatch({type: 'SET_SOUND', payload: v})
    }
}
