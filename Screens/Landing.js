import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Modal } from "react-native";
import { Login } from '../Components/Login';
import { Signon } from '../Components/Signon';
import { Button } from "../Components/Button";
import { useState } from "react";
import LoginAnim from "../Components/LoginAnim";

export function Landing({navigation}){
    const [LoginOpen,setLoginOpen]=useState(false);
    const [SignonOpen,setSignonOpen]=useState(false);

    return(
        <View style={Styles.Landing}>
            <StatusBar backgroundColor="#FF8013"/>
            <Modal onRequestClose={()=>{setLoginOpen(false)}} visible={LoginOpen} animationType='slide' transparent={true}><Login navigation={navigation} setLoginOpen={setLoginOpen} setSignonOpen={setSignonOpen} /></Modal>
            <Modal onRequestClose={()=>{setSignonOpen(false)}} visible={SignonOpen} animationType='slide' transparent={true}><Signon navigation={navigation} setSignonOpen={setSignonOpen} setLoginOpen={setLoginOpen} /></Modal>
            <LoginAnim />
            <View style={Styles.Content}>
                <Text style={Styles.mainHeading}>Welcome to full Exhilaration space</Text>
                <Text style={Styles.Paragraph}>Lorem ipsum dolor sit amet consectetur. Nibh cursus eros rutrum malesuada metus. Pellentesque et metus in ullamcorper mi</Text>
                <Button colorScheme={1} style={Styles.Button} onPress={()=>{setLoginOpen(true)}}>Let me have fun</Button>
                <Button colorScheme={2} style={Styles.Button} onPress={()=>{setSignonOpen(true)}}>Join the fun</Button>
            </View>
        </View>
    )
}

const Styles=StyleSheet.create({
    Landing:{
        backgroundColor:"#FF9031",
        flex:1,
        width:'100%',
        
    },
    mainHeading:{
        fontFamily:'Recursive-Bold',
        fontSize:36
    },
    Content:{
        padding:15,
        paddingTop: 10,
    },
    Paragraph:{
        fontSize:16,
        fontFamily:'Recursive-Medium',
        paddingRight:15,
        paddingVertical:20,
        letterSpacing:1
    },
})