import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Components/Button';
import { getSuggestion } from '../action/commitment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { assignStatement } from '../action/commitment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Hr } from '../Components/Hr';
import Help from '../assets/Resources/Images/help.svg'

const StatementFlow = ({setState}) => {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(5);
  const [statements, setStatements] = useState(['', '', '']);
  const [full, setFull] = useState(false);
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.asset);
  const {token} = useSelector(state => state.auth)
  const {statement} = useSelector(state => state.commitment)
  const {data: assetData} = useSelector(state => state.asset);
  const [help, setHelp] = useState(false);

  const suggestStatment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      dispatch(getSuggestion(token, setStep))
    } catch (error) {
      console.error('Error checking token:', error);
    }
  }

  const handleNextStep = () => {
    if (step === 2) {
      // Navigate to the home page after the final form is submitted
      console.log('Statements:', statements);
      setState(0);
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (step === 2) {
      const interval = setTimeout(() => {
        setStep(3);
      }, 5000);
    }
  }, [step])

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    
  }, [counter, step])

  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear'},
      update: {type: 'easeInEaseOut'},
      delete: {type: 'linear'},
    });
    setFull(!full);
  };

  const assignHandle = async (is_custom, text) => {
    const token = await AsyncStorage.getItem('token');
    if (is_custom) {
      if (statements[0] === statements[1] && statements[0] === statements[2] && statements[1] === statements[2]) {
        const body = {
          is_custom,
          text: statements[0],
          discription: ' ',
          asset_for_displayed: data.asset_url ? data.asset_url : ' ',
          asset_displayed: ' '
        }
        console.log(body)
        assignStatement(token, body);
        setStep(3);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Statements are not same'
        })
      }
    } else {
      const body = {
        is_custom,
        text,
        description: '',
        asset_for_displayed: data.asset_url,
        asset_displayed: ''
      }
      dispatch(assignStatement(token, body));
      setStep(2);
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <View style={[styles.stepContainer]}>
            <TouchableOpacity onPress={() => setHelp(true)}  style={{position: 'absolute', top:-20, right: 20}}>
              <Help />
            </TouchableOpacity>
            <Text style={[styles.text, { marginBottom: '10%' }]}>You've been assigned a statement</Text>
            <Image source={require('../assets/Resources/Images/believe.png')} style={styles.image} />
            <Text style={[styles.text, {marginTop: '5%'}]}>Write a statement of commitment and follow it!</Text>
            <Button colorScheme={2}  onPress={handleNextStep}>Write it Now</Button>
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
                  <Text style={{flexWrap: 'wrap', color: '#FFF', fontSize: 15, fontFamily: 'Recursive-Bold'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed bibendum nisi. Curabitur id ornare mi, in venenatis enim. Vivamus faucibus, nisi ac interdum euismod, justo enim pretium felis, molestie consectetur odio risus quis est. Fusce magna velit, semper vitae arcu vitae, viverra ultrices urna. Aliquam nec erat et justo fermentum consectetur. Cras vel purus nec arcu ultrices cursus. Suspendisse lacinia tortor eget massa euismod, sed lobortis arcu interdum. Fusce convallis cursus quam, vitae finibus felis rutrum sit amet. Nullam interdum scelerisque leo. Fusce finibus metus nulla, ut ullamcorper justo semper in. </Text>

                </View>
              </View>
            </Modal>
          </View>
        )
      case 1:
        return (
          <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={[styles.stepContainer, {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
            <TouchableOpacity style={{zIndex: 100}} onPress={() => toggleBox()}>
                <Image source={require('../assets/Resources/Images/fly.png')} style={full ? styles.fullImage : styles.image} />
            </TouchableOpacity>
            <Text style={[styles.text, { marginBottom: 10, marginTop: 20 }]}>Step 1: Enter your statements</Text>
            <TextInput
              style={styles.input}
              placeholder="Statement 1"
              value={statements[0]}
              onChangeText={(text) => setStatements([text, statements[1], statements[2]])}
            />
            <TextInput
              style={styles.input}
              placeholder="Statement 2"
              value={statements[1]}
              onChangeText={(text) => setStatements([statements[0], text, statements[2]])}
            />
            <TextInput
              style={styles.input}
              placeholder="Statement 3"
              value={statements[2]}
              onChangeText={(text) => setStatements([statements[0], statements[1], text])}
            />
            <View style={styles.footer}>
              <Button Styles={styles.Button} colorScheme={2} onPress={() => assignHandle(true, statements[0])}>Save</Button>
              <Button Styles={styles.Button} colorScheme={1} onPress={() => suggestStatment()}>Suggestions</Button>
            </View>
          </ScrollView>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Image source={require('../assets/Resources/Images/happy.png')} style={styles.image} />
            <View style={styles.successTextContainer}>
              <Text style={styles.successText}>Wohooo!!! I'm ecstatic about your task success. </Text>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 15}}>
                <View style={styles.countContainer}>
                  <Text style={styles.count}>{counter}</Text>
                </View>
                <Text style={{fontFamily: 'Recursive-Bold', fontSize: 16, marginLeft: 5}}>Sec</Text>
              </View>
            </View>
          </View>
        );
        case 3:
        return (
          <View style={styles.stepContainer}>
           <Image source={assetData.url ? { uri: assetData.url} : require('../assets/Resources/Images/temp.png')} style={styles.image} />
            <View style={styles.successTextContainer}>
              <Button colorScheme={2} onPress={() => setState(0)}>Next Joy</Button>
            </View>
          </View>
        );
        case 4:
          return (
            <View style={[styles.stepContainer, {justifyContent: 'flex-start', alignItems: 'flex-start'}]}>
              <Text style={[styles.text, {fontSize: 24, marginBottom: 15, padding: 10}]}>Suggestions</Text>
              {
                statement.map(d => <TouchableOpacity style={styles.suggestionWrapper} onPress={() => assignHandle(false, statements[0])}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100
  },
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
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%'
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
    padding: 20
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    display: 'flex',
    width: '60%',
  },
  suggestionWrapper: {
    backgroundColor: '#DEF6FB',
    padding: 32,
    width: '100%',
    marginBottom: 10,
  },
  fullImage: {
    width: 350,
    height: 1000,
    position: 'absolute',
    top: -400,
    left: -170,
    zIndex: 1
  }
});

export default StatementFlow;
