import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPuzzle } from '../action/puzzle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../Components/Button';

const PuzzleFlow = ({setState}) => {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.puzzle);
  const [counter, setCounter] = useState(5);
  const [full, setFull] = useState(false);
  const {data: assetData} = useSelector(state => state.asset);
  console.log(data);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        dispatch(getPuzzle(token))
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, [dispatch]);

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




  const handleNextStep = () => {
    if (step === 1) {
      if (selectedOption.toLowerCase() === data.answer.toLowerCase()) {
        setStep(2);
      } else {
        setStep(4);
      }
    } else {
      setStep(step + 1)
    }
  };

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
            <Text style={[styles.text, { marginBottom: '10%' }]}>You've been assigned a puzzle</Text>
            <Image source={require('../assets/Resources/Images/believe.png')} style={styles.image} />
            <Text style={[styles.text, {marginTop: '5%'}]}>Solve a puzzle to win...!</Text>
            <Button colorScheme={2}  onPress={handleNextStep}>Solve it</Button>
          </View>
      );
      case 1:
        return (
          <View style={styles.stepContainer}>
            <TouchableOpacity style={{zIndex: 100}} onPress={() => toggleBox()}>
                <Image source={require('../assets/Resources/Images/fly.png')} style={full ? styles.fullImage : styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>{data.question}</Text>
            {data.questionType === 1 && <>
              <TouchableOpacity
                style={selectedOption === 'true' ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption('true')}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>True</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectedOption === 'false' ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption('false')}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>False</Text>
              </TouchableOpacity>
            </>}
            {data.questionType === 0 && <>
              <TouchableOpacity
                style={selectedOption === data.optionA ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption(data.optionA)}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>{data.optionA}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectedOption === data.optionB ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption(data.optionB)}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>{data.optionB}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectedOption === data.optionC ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption(data.optionC)}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>{data.optionC}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectedOption === data.optionD ? styles.selectedOption : styles.option}
                onPress={() => setSelectedOption(data.optionD)}
              >
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>{data.optionD}</Text>
              </TouchableOpacity>
            </>}
            <Button colorScheme={2} onPress={handleNextStep}>Save</Button>
          </View>
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
            <View style={styles.stepContainer}>
              <Image source={require('../assets/Resources/Images/wack.jpg')} style={styles.image} />
              <View style={styles.successTextContainer}>
                <Text style={[styles.text, {fontSize: 18, fontWeight: 'normal'}]}>Oopps! You failed to commit what your wrote</Text>
                <Button colorScheme={2} onPress={() => setState(0)}>Next Joy</Button>
              </View>
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
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  fullImage: {
    width: 350,
    height: 1000,
    position: 'absolute',
    top: -400,
    left: -170,
    zIndex: 1
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  selectedOption: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightblue',
    borderColor: 'blue',
    borderWidth: 1,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Recursive-Bold',
    fontSize: 20,
    fontWeight: 600,
    zIndex: 0
  },
  option: {
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: '#FFD7B5',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 20
  },
  selectedOption: {
    width: 300,
    marginTop: 10,
    borderRadius: 4,
    borderColor: '#FFD7B5',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#FFD7B5',
    padding: 20
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
    borderRadius: '50%',
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

export default PuzzleFlow;
