import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Button } from "./Button";
import { ScrollView } from "react-native-gesture-handler";

const CommitmentComplete = ({setStep}) => {
    return (
        <ScrollView contentContainerStyle={[styles.stepContainer]}>
          <Image source={require('../assets/Resources/Images/complete.png')} style={styles.image} />
          <Text style={[styles.text]}>Have you completed the{"\n"}commitment?</Text>
          <Button colorScheme={2}  onPress={() => setStep(2)}>Yes</Button>
          <TouchableOpacity onPress={() => setStep(4)}>
            <Text style={[styles.text, {marginTop: '5%'}]}>No</Text>
          </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFF'
    },
    stepContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
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
  
  export default CommitmentComplete;
  