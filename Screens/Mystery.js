import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Button } from '../Components/Button';
import MysteryJoy from './MysteryJoy';
import Statements from './Statements';
import Puzzle from './Puzzle';
import { getRandomAsset } from "../action/asset";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function () {
    const [state, setState] = useState(0);
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.asset);


    const getAsset = async () => {
        const token = await AsyncStorage.getItem('token')
        dispatch(getRandomAsset(token, setState))
    }

    const handleNextStep = () => {
        switch(data.openedWith) {
            case 0: setState(2);
                    break;
            case 1: setState(1);
                    break;
            case 2: setState(3);
                    break
        }
    }
  
            if (state === 0) {
                return (
                    <View style={[styles.container]}>
                        <Image source={require('../assets/Resources/Images/start.png')} style={styles.image} />
                        <Text style={styles.text}>A gift from a Friend</Text>
                        <Button onPress={() => getAsset()} colorScheme={2}>Start Here</Button>
                    </View>
                )
            } else if (state === 1) {
                return <MysteryJoy setState={setState} />
            } else if (state === 2) {
                return <Puzzle setState={setState} />
            } else if (state === 3) {
                return <Statements setState={setState} />
            } else if (state === 4) {
                return (
                <SafeAreaView style={[styles.stepContainer]}>
                    <Image source={require('../assets/Resources/Images/gift.png')} style={styles.image} />
                    <Text style={styles.text}>A gift from a Friend</Text>
                    <TouchableOpacity onPress={handleNextStep}>
                    <Image source={require('../assets/Resources/Images/key.png')} style={styles.image} />
                    </TouchableOpacity>
                </SafeAreaView>
                );
            }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      },
      text: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Recursive-Bold',
        fontSize: 20,
        fontWeight: 600,
        marginTop: 20
      },
      stepContainer: {
        backgroundColor: '#FFF',
        alignItems: "center",
        flex: 1
      }
})