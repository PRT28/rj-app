import * as api from '../api/commitment';
import Toast from 'react-native-toast-message';

export const getSuggestion = (token, setStep)  => {
    return dispatch => {
        dispatch({type: 'STATEMENT_LOAD'});
        return api.statementSuggestion(token)
            .then(async data => {
                console.log(data.data);
                dispatch({type: 'STATEMENT_SUCCESS', payload: data.data});
                setStep(4);
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({type: 'STATEMENT_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch data'
            })
        })
    }
}

export const getCommitment = (token, setStep)  => {
    return dispatch => {
        dispatch({type: 'COMMITMENT_LOAD'});
        return api.statementCommitment(token)
            .then(async data => {
                console.log(data.data);
                dispatch({type: 'COMMITMENT_SUCCESS', payload: data.data});
                setStep(1);
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({type: 'COMMITMENT_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch data'
            })
        })
    }
}

export const assignCommitment = (token, payload, setState) => {
    console.log(token)
    return api.assignCommitment(token, payload)
        .then(data => {
            Toast.show({
                type: 'success',
                text1: 'Commitment assigned successfully'
            })
            setState(0)
        })
        .catch(err => {
            console.log(err.response.data);
            Toast.show({
                type: 'error',
                text1: 'Failed to assign commmitment'
            })
        })
}

export const assignStatement = async (token, payload) => {
    console.log(token)
    return await api.assignStatement(token, payload)
        .then(data => {
            Toast.show({
                type: 'success',
                text1: 'Statement assigned successfully'
            })
        })
        .catch(err => {
            console.log(err.response.data);
            // Toast.show({
            //     type: 'error',
            //     text1: 'Failed to assign commmitment'
            // })
        })
}

export const getAssignedCommitments = token => {
    return dispatch => {
        dispatch({type: "COMMITMENT_LIST_LOAD"});
        return api.getCommitments(token)
            .then(data => {
                dispatch({type: 'COMMITMENT_LIST_LOAD', payload: data});
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({type: 'COMMITMENT_LIST_FAIL'});
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch data'
                })
            })
    }
}
