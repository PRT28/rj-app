import { useState, useEffect } from "react";
import { StyleSheet, Text,TouchableOpacity, Image, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { Audio } from 'expo-av';
import { useSelector } from "react-redux";
export function Button({colorScheme,onPress,...props}){
    const colorSchemes=[['#16B8D9','#9BEEFF','#16b8d9'],['#FFCDA3','#FFFAF5','#FFFFFF00'],['#FF7F11','#FFFAF5','#FFFFFF']];
    const [sound, setSound] = useState();
    const {sound: playSound} = useSelector(state => state.asset);
    const clickFunc = async () => {
        const { sound } = await Audio.Sound.createAsync( require('../assets/Resources/Sound/button.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        if (playSound) {
            await sound.playAsync();
        }
        
        onPress();
    }

    useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    return(
        <TouchableOpacity onPress={clickFunc}>
            <LinearGradient colors={colorSchemes[colorScheme-1]} style={Styles.Button} locations={[0.81,0.97,1]}>
                <View style={Styles.animation}>
                    <Image source={require('../assets/Resources/Images/button.gif')} />
                </View>
                <Text style={Styles.Text}>
                    {props.children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
const Styles=StyleSheet.create({
    Button:{
            padding:15,
            marginTop:15,
            borderRadius:30
    },
    Text:{
        fontSize:20,
        fontFamily:'Recursive-Medium',
        textAlign:"center"
    },
    animation: {
        position: 'absolute',
        right: 0,
        width: '100%',
        height: '100%'
    }
})