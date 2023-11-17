import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Modal } from "react-native";
import { Button } from '../Components/Button';
import MysteryJoy from './MysteryJoy';
import Statements from './Statements';
import Puzzle from './Puzzle';
import { getRandomAsset } from "../action/asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Key from '../assets/Resources/Images/key.svg';

import Type from '../assets/Resources/Images/type.svg';
import MJ from '../assets/Resources/Images/mj.svg';
import State from '../assets/Resources/Images/state.svg';
import Commit from '../assets/Resources/Images/commit.svg';
import Puzz from '../assets/Resources/Images/puzzle.svg'
import { ScrollView } from "react-native-gesture-handler";

export default function () {
    const [state, setState] = useState(0);
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.asset);
    const [help, setHelp] = useState(false);
    const [type, setType] = useState(5);


    const getAsset = async () => {
        const token = await AsyncStorage.getItem('token')
        dispatch(getRandomAsset(token, setState, type))
    }

    const getAssetWithType = async (t) => {
        const token = await AsyncStorage.getItem('token')
        dispatch(getRandomAsset(token, setState, t))
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
                    <SafeAreaView style={styles.container}>
                        <ScrollView contentContainerStyle={[styles.container]}>
                        <Image source={require('../assets/Resources/Images/start.png')} style={styles.image} />
                        <Text style={styles.text}>Begin your fun journey with a random surprise</Text>
                        <Modal visible={help} animationType="none" onRequestClose={() => setHelp(false)} transparent={true}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <TouchableOpacity onPress={() => { setHelp(false); getAssetWithType(1); }} style={{borderRadius: 50, height: 70, width: 70, backgroundColor: '#FF7F11', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '30%', top: '60%'}}>
                                <Commit />
                                <Text style={{color: 'white', fontSize: 10}}>Commit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setHelp(false); getAssetWithType(0); }} style={{borderRadius: 50, height: 70, width: 70, backgroundColor: '#FF7F11', alignItems: 'center', justifyContent: 'center' , position: 'absolute', left: '55%', top: '60%'}}>
                                <Puzz />
                                <Text style={{color: 'white', fontSize: 10}}>Puzzle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setHelp(false); getAssetWithType(2); }} style={{borderRadius: 50, height: 70, width: 70, backgroundColor: '#FF7F11', alignItems: 'center', justifyContent: 'center' , position: 'absolute', left: '20%', top: '70%'}}>
                                <State />
                                <Text style={{color: 'white', fontSize: 10}}>Statement</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setHelp(false)} style={{ position: 'absolute', left: '47%', top: '73%'}}>
                                <Type />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setHelp(false); getAssetWithType(4); }} style={{borderRadius: 50, height: 70, width: 70, backgroundColor: '#FF7F11', alignItems: 'center', justifyContent: 'center' , position: 'absolute', left: '70%', top: '70%'}}>
                                <MJ />
                                <Text style={{color: 'white', fontSize: 10}}>Mystery Joy</Text>
                            </TouchableOpacity>
                        </View>
                        </Modal>
                        {!help && <TouchableOpacity style={{marginTop: 10}} onPress={() => setHelp(true)}>
                            <Type />
                        </TouchableOpacity>}
                        <Button styles={{marginTop: 5}} onPress={() => getAsset()} colorScheme={2}>Start Here</Button>
                    </ScrollView>
                    </SafeAreaView>
                )
            } else if (state === 1) {
                return <MysteryJoy setState={setState} />
            } else if (state === 2) {
                return <Puzzle setState={setState} />
            } else if (state === 3) {
                return <Statements setState={setState} />
            } else if (state === 4) {
                return (
                <SafeAreaView style={[styles.stepContainer, {paddingTop: 30}]}>
                    <Image source={require('../assets/Resources/Images/gift.png')} style={styles.image} />
                    <Text style={styles.text}>A gift from a Friend</Text>
                    <TouchableOpacity style={{marginTop: 20}} onPress={handleNextStep}>
                        <Key />
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
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 20
      },
      text: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Recursive-Bold',
        fontSize: 20,
        fontWeight: 600,
        marginTop: 10,
        flexWrap: 'wrap'
      },
      stepContainer: {
        backgroundColor: '#FFF',
        alignItems: "center",
        flex: 1
      }
})