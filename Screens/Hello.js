import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryList, saveInterest, skipInterest } from "../action/interest";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '../Components/Button';

const windowWidth = Dimensions.get('window').width;

const ClickableNonLinearItems = ({navigation}) => {
  const [activeItems, setActiveItems] = useState([]);

  const dispatch = useDispatch();
    const {data} = useSelector(state => state.interest);
    const {data: authData, token} = useSelector(state => state.auth);
    console.log('insinde', data);

    useEffect(() => {
      console.log('ab', token);
      dispatch(categoryList(token));
  }, []);

  
  const handlePress = (index) => {
    const updatedActiveItems = activeItems.includes(index)
      ? activeItems.filter((item) => item !== index)
      : [...activeItems, index];

    setActiveItems(updatedActiveItems);
  };

  const saveHandle = () => {
    const payload = []
    activeItems.map(d => payload.push(data[d]._id))
    saveInterest(navigation, authData._doc._id, payload, token);
  }

  const skipHandle = () => {
    console.log(authData);
    navigation.navigate("Main")
    skipInterest(navigation, authData._id, token);
  }



  const renderRoundItem = (index, iconName, text) => {
    const isActive = activeItems.includes(index);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.roundItem, { backgroundColor: isActive ? '#FCA356' : '#FBF9F7' }]}
        onPress={() => handlePress(index)}
      >
        <Ionicons name={iconName} size={24} color="white" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Pick Interest</Text>
      </View>
      <View style={styles.content}>
        {data.map((d, index) =>
          renderRoundItem(index, 'ios-checkmark-circle', d.category_title)
        )}
      </View>
      <View style={styles.footer}>
          <Button colorScheme={2}  onPress={() => skipHandle()}>Skip</Button>
          <Button colorScheme={2}  onPress={() => saveHandle()}>Save</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roundItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 'auto',
    width: '100%',
    marginBottom: 50
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  halfWidth: {
    width: windowWidth / 2 - 15, // Subtracting padding and margin
    marginLeft: 5,
  },
  buttons:{
    padding:15,
    marginTop:30,
    borderRadius:30,
    backgroundColor:"pink"
  },
    Text:{
    fontSize:20,
    fontFamily:'Recursive-Medium',
    textAlign:"center"
  }
});

export default ClickableNonLinearItems;
