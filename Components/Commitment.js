import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image,SafeAreaView, ActivityIndicator, RefreshControl  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import CommitmentComplete from './CommitmentComplete';
import { getAssignedCommitments, completeCommitment } from '../action/commitment';
import { shareAsset } from '../action/asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Countdown from './Countdown';

const Commitment = () => {
  const dispatch = useDispatch();
  const {commitmentList, loading} = useSelector(state => state.commitment);
  const {data:assetData} = useSelector(state => state.asset);
  const [refreshing, setRefreshing] = React.useState(false);
  const {token} = useSelector(state => state.auth);
  const [step, setStep] = useState(0);
  const [currentTask, setCurrentTask] = useState();

  useEffect(() => {
    const netCall =  async () => {
      const token = await AsyncStorage.getItem('token');
      dispatch(getAssignedCommitments(token));
    }

    netCall();
    
}, []);

  useEffect(() => {
    if (step === 2) {
      const interval = setTimeout(() => {
        setStep(3);
      }, 5000);

      return () => {
        clearTimeout(interval)
      }
    }
  }, [step])

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    dispatch(getAssignedCommitments(token)).then(() => setRefreshing(false));
  }, []);

  const completeHandle = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch(completeCommitment(token, currentTask._id, setStep, setCurrentTask));
  }

  return (
    <>
      {step === 0 && <View style={styles.container}>
        <Text style={styles.heading}>Commitment</Text>
        {loading && <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>}
        {!loading && commitmentList.length === 0 && <Text style={[styles.successText, {marginTop: 100}]}>No Active commitments...</Text>}
        <ScrollView refreshControl={ <RefreshControl onRefresh={onRefresh} />}>{commitmentList.map((task) => (
          <TouchableOpacity
            key={task._id}
            onPress={() => {setStep(1); setCurrentTask(task); }}
            style={[
              styles.taskContainer,
              { backgroundColor: task.completed ? 'lightgray' : '#DEF6FB' },
            ]}
          >
            <View style={styles.taskContent}>
              <Text style={styles.taskHeading}>{task.text}</Text>
              <Text style={styles.taskDescription}>{task.discription}</Text>
              {/* <Text style={styles.taskTimer}>{task.timer}</Text> */}
            </View>
            <View style={styles.iconContainer}>
                <Image style={{width: 60, height: 60}} source={require('../assets/Resources/Images/timer.gif')} />
            </View>
          </TouchableOpacity>
        ))}</ScrollView>
        
      </View>}
      {step === 1 && <CommitmentComplete setStep={setStep} />}
      {step === 2 && <View style={styles.stepContainer}>
            <Image source={require('../assets/Resources/Images/happy.png')} style={styles.image} />
            <View style={styles.successTextContainer}>
              <Text style={styles.successText}>Wohooo!!! I'm ecstatic about your task success. </Text>
              <Countdown />
            </View>
          </View>}
      {step === 3 && <View style={styles.stepContainer}>
          <Image source={assetData.url ? { uri: assetData.url} : require('../assets/Resources/Images/temp.png')} style={styles.image} />
          <View style={styles.successTextContainer}>
            <Text style={[styles.taskHeading, {textAlign: 'center'}]}>Joy for you!!</Text>
            <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
              <Button colorScheme={2} onPress={() => completeHandle()}>Next Joy</Button>
              <Button colorScheme={1} onPress={() => {setStep(0); shareAsset(token, assetData.url ? assetData._id : '41224d776a326fb40f000001'); setCurrentTask(null); setCommitmentList(commitmentList.splice(0, commitmentList.length-1)) }}>Share <Ionicons name="share-social" size={17} color="#FFF" /></Button>
            </View>
          </View>
        </View>}
      {step === 4 && <View style={styles.stepContainer}>
        <Image source={require('../assets/Resources/Images/wack.jpg')} style={{height: '120%', width: '100%'}} />
        <View style={styles.successTextContainer}>
          <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>Oopps! You failed to commit what your wrote</Text>
          <Button colorScheme={2} onPress={() => setStep(0)}>Next Joy</Button>
        </View>
      </View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    paddingTop: 60
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Recursive-Bold',
    marginBottom: 5
  },
  taskDescription: {
    marginBottom: 7,
    fontFamily: 'Recursive-Bold',
  },
  taskTimer: {
    color: 'gray',
    fontFamily: 'Recursive-Bold',
  },
  iconContainer: {
    marginLeft: 10,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  input: {
    height: 80,
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: '#FFD7B5',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 20
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    fontWeight: 600,
  },
  successTextContainer: {
    position: 'absolute',
    bottom: 100,
    left: 'auto',
    width: '98%',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10
  },
  successText: {
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  countContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FFB372',
    backgroundColor: '#FF7F11',
    width: 30
  },
  count: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 18,
  }
});

export default Commitment;
