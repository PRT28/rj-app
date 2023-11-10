import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "./Button";
import { Formik } from "formik";
import { GlobalStyles } from "./GlobalStyle";
import Password from "./Password";
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "../action/auth";

export function Login({navigation, setLoginOpen}){
    const [isSelected, setSelection] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleCheckBox=()=>{
        setSelection(!isSelected);
    }
    const dispatch = useDispatch();
    const  {data, error} = useSelector((state) => state.auth);
  
    return (
            <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={Styles.Content}>
                <MaterialCommunityIcons style={Styles.close} name={"close"} size={20} color={"black"} onPress={() => setLoginOpen(false)} />
                <Text style={Styles.Heading}>Good to have you back !</Text>
                <Formik initialValues={{Username:'',Password:''}}
                //validationSchema={reviewValidation}
                onSubmit={(values,actions)=>{
                    const response = {
                        "email":values.Username,
                        "password":values.Password
                    }
                    dispatch(login(navigation, response, setLoginOpen))
                    //AddReview(review);
                    actions.resetForm();
                }}>
                {(props)=>(
                    <View style={Styles.Form}>
                        <TextInput placeholder="Enter User Name or Email" 
                            placeholderTextColor='#6B7280'
                            style={GlobalStyles.inputField} 
                            onChangeText={props.handleChange('Username')} 
                            value={props.values.Username}
                        />
                        <Password
                        onChangeText={props.handleChange('Password')} 
                        value={props.values.Password}
                        placeholder='Enter Password'
                        />
                        <View style={Styles.moreOptions}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialCommunityIcons name={!isSelected?"checkbox-blank-outline":"checkbox-marked"} onPress={toggleCheckBox} size={17} color={!isSelected?"black":"green"} />
                                <Text style={{paddingLeft:5,fontFamily:'Recursive-Medium',color:'#1F2A37',fontSize:15}}>Remember Me</Text>
                            </View>
                            <Text style={{fontFamily:'Recursive-Medium',color:'#1F2A37',fontSize:14}}>Forgot Password?</Text>
                        </View>
                        <Button onPress={props.handleSubmit} colorScheme={1}><Text>Continue Fun</Text></Button>
                    </View>
                )}
                </Formik>
                <StatusBar backgroundColor="#FF8013"/>
            </ScrollView>
    )
}
const Styles=StyleSheet.create({
    Content:{
        top:'40%',
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        backgroundColor: '#FFF8F1',
        alignItems:"center",
        padding:'10%',
        height:'100%'
    },
    Heading:{
        color: '#1F2A37',
        fontFamily: 'Recursive-Medium',
        fontSize: 28,
        fontStyle: 'normal',
        lineHeight:35,
    },
    Form:{
        width:'100%',
        marginVertical:15
    },
    moreOptions:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5,
        marginVertical:2,
    },
    icons:{
        marginVertical:10,
        marginHorizontal:20
    }, 
    close: {
        top: 20,
        right: 20,
        position: 'absolute'
    }

})