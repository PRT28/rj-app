// CommitmentFlow.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, LayoutAnimation, ScrollView, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Components/Button';
import { getCommitment } from '../action/commitment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assignCommitment } from '../action/commitment';
import Help from '../assets/Resources/Images/help.svg'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Hr } from '../Components/Hr';

const CommitmentFlow = ({ setState }) => {
  const [step, setStep] = useState(0);
  const [commitmentText, setCommitmentText] = useState('');
  const [full, setFull] = useState(false);
  const dispatch = useDispatch();
  const {commitment} = useSelector(state => state.commitment);
  const {token} = useSelector(state => state.auth)
  const {data} = useSelector(state => state.asset);
  const [help, setHelp] = useState(false);

  const handleNextStep = () => {
    if (step === 2) {
      // Navigate to the home page after the final form is submitted
      
    } else {
      setStep(step + 1);
    }
  };

  const assignHandle = async (text, description, asset_displayed, is_custom) => {
    const body = {
      is_custom,
      text,
      discription: description,
      asset_for_displayed: data.asset_url ? data.asset_url : ' ',
      asset_displayed: asset_displayed
    }
    console.log(body);
    const token = await AsyncStorage.getItem('token');
    dispatch(assignCommitment(token, body, setState));
  }

  const suggestCommitment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      dispatch(getCommitment(token, setStep))
    } catch (error) {
      console.error('Error checking token:', error);
    }
  }

  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear'},
      update: {type: 'easeInEaseOut'},
      delete: {type: 'linear'},
    });
    setFull(!full);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <View style={[styles.stepContainer]}>
            <TouchableOpacity onPress={() => setHelp(true)}  style={{position: 'absolute', top:-20, right: 20}}>
              <Help />
            </TouchableOpacity>
            <Text style={[styles.text, { marginBottom: '10%' }]}>You've been assigned a commitment</Text>
            <Image source={require('../assets/Resources/Images/believe.png')} style={styles.image} />
            <Button colorScheme={2}  onPress={suggestCommitment}>Commit Now</Button>
            <Modal visible={help} animationType="slide" onRequestClose={() => setHelp(false)} transparent={true}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View  style={styles.modal}>
                  <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={{color: '#FFF', fontSize: 20, fontFamily: 'Recursive-Bold' }}>What is Commitment?</Text>
                    <TouchableOpacity>
                      <MaterialCommunityIcons name={"close"} size={23} color={"white"} onPress={() => setHelp(false)} />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginBottom: 15}}>
                    <Hr color="#FFF" />
                  </View>
                  <Text style={{flexWrap: 'wrap', color: '#FFF', fontSize: 15, fontFamily: 'Recursive-Bold'}}>Commitment refers to the state or quality of being dedicated, loyal, or devoted to a cause, activity, goal, or relationship. It involves a sense of responsibility and a willingness to invest time, effort, and resources to fulfill obligations or achieve desired outcomes. </Text>

                </View>
              </View>
            </Modal>
          </View>
        );
      case 1:
        return (
          <View style={[styles.stepContainer]}>
            <Text style={[styles.text, { marginBottom: '10%' }]}>{commitment[0].suggestion_text}</Text>
            <Image source={require('../assets/Resources/Images/mom.png')} style={styles.image} />
            <View style={styles.footer}>
              <Button Styles={styles.Button} colorScheme={1} onPress={handleNextStep}>My Own</Button>
              <Button Styles={styles.Button} colorScheme={2} onPress={() => assignHandle(commitment[0].suggestion_text, ' ', ' ', false)}>Ok I'm ready</Button>
            </View>
          </View>
        );
      case 2:
        return (
          <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={[styles.stepContainer]}>
            <TouchableOpacity style={{zIndex: 100}} onPress={() => toggleBox()}> 
                <Image source={require('../assets/Resources/Images/fly.png')} style={full ? styles.fullImage : styles.image} />
            </TouchableOpacity>
            <Text  style={styles.text}>I believe in you, I know you will do it</Text>
            <TextInput
              style={styles.input}
              placeholder="Write your commitment here"
              value={commitmentText}
              onChangeText={(text) => setCommitmentText(text)}
            />
            <View style={styles.footer}>
              <Button Styles={styles.Button} colorScheme={2} onPress={() => assignHandle(commitmentText, ' ', ' ', true)}>Save</Button>
              <Button Styles={styles.Button} colorScheme={1} onPress={() => setStep(3)}>Suggestions</Button>
            </View>
          </ScrollView>
        );
      case 3:
        return (
          <View style={[styles.stepContainer, {justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
            <Text style={[styles.text, {fontSize: 24, marginBottom: 15, padding: 10}]}>Suggestions</Text>
            {
              commitment.map((d, i) => i > 0 && <TouchableOpacity style={styles.suggestionWrapper} onPress={() => assignHandle(d.suggestion_text, ' ', ' ', false)}>
                <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: '#00D3FF', borderBottomLeftRadius: 4, padding: 8}}>
                  <Text style={styles.categoryText}>{d.category_text}</Text>
                </View>
                <Text style={[styles.text, {fontSize: 15, textAlign: 'left'}]}>{d.suggestion_text}</Text>
              </TouchableOpacity>)
            }
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStepContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FF7C2A',
    width: '90%',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%'
  },
  image: {
    // width: '100%',
    // aspectRatio: 0.1, // Maintain aspect ratio (1:1 for square image)
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    fontWeight: 600,
  },
  categoryText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 10,
    fontWeight: 600,
  },
  input: {
    height: 150,
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: '#FFD7B5',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 20
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    width: '60%'
  },
  Button: {
    marginTop: 0
  },
  suggestionWrapper: {
    backgroundColor: '#DEF6FB',
    padding: 32,
    width: '100%',
    marginBottom: 10,
    position: 'relative'
  },
  fullImage: {
    width: 400,
    height: 1000,
    position: 'absolute',
    top: -200,
    left: -200,
    zIndex: 1
  }
});

export default CommitmentFlow;
