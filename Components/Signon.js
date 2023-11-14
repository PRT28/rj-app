import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "./Button";
import { Formik } from "formik";
import { GlobalStyles } from "./GlobalStyle";
import Password from "./Password";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { register } from "../action/auth";

export function Signon({navigation, setSignonOpen}){

    const loginChangeHandle = () => {
        // setSignonOpen(false);
        // setLoginOpen(true);
    }

    const dispatch = useDispatch();


    return (
        <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={Styles.Content}>
            <MaterialCommunityIcons style={Styles.close} name={"close"} size={20} color={"black"} onPress={() => setSignonOpen(false)} />
            <Text style={Styles.Heading}>Create your Account !</Text>
            <Formik initialValues={{Username:'',Email:'',Gender:'',Zipcode:'',Password:''}}
                    //validationSchema={reviewValidation}
                    onSubmit={(values,actions)=>{
                        const response ={
                            "username": values.Username,
                            "email": values.Email,
                            "password": values.Password,
                            "gender": values.Gender,
                            "zip_code": values.Zipcode,
                            "role": 2
                          }
                          console.log(response);
                        dispatch(register(response, setSignonOpen, navigation, actions))
                        //AddReview(review);
                    }}>
                    {(props)=>(
                        <View style={Styles.Form}>
                            <TextInput placeholder="Username" 
                                placeholderTextColor='#6B7280'
                                style={GlobalStyles.inputField} 
                                onChangeText={props.handleChange('Username')} 
                                value={props.values.Username}
                            />
                            <TextInput placeholder="Enter your Email Address" 
                                placeholderTextColor='#6B7280'
                                style={GlobalStyles.inputField} 
                                onChangeText={props.handleChange('Email')} 
                                value={props.values.Email}
                            />
                            <TextInput placeholder="Gender" 
                                placeholderTextColor='#6B7280'
                                style={GlobalStyles.inputField} 
                                onChangeText={props.handleChange('Gender')} 
                                value={props.values.Gender}
                            />
                            <TextInput placeholder="Zip/Area code" 
                                placeholderTextColor='#6B7280'
                                style={GlobalStyles.inputField} 
                                onChangeText={props.handleChange('Zipcode')} 
                                value={props.values.Zipcode}
                                keyboardType="numeric"
                            />
                            <Password
                            onChangeText={props.handleChange('Password')} 
                            value={props.values.Password}
                            placeholder='Password'
                            />
                            <Button onPress={props.handleSubmit} colorScheme={1}><Text>Let me have fun</Text></Button>
                        </View>
                    )}
                    </Formik>
                    {/* <Hr>or continue with</Hr>
                    <View style={{flexDirection:'row',marginTop:15}}>
                        <TouchableOpacity><Apple style={Styles.icons} /></TouchableOpacity>
                        <TouchableOpacity><Facebook style={Styles.icons} /></TouchableOpacity>
                        <TouchableOpacity><Google style={Styles.icons} /></TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity onClick={() => loginChangeHandle()}>
                        <Text style={{fontFamily:'Recursive-Medium',letterSpacing:1,marginTop:20,fontSize:15}}>Already have an account?<Text style={{color:'#FF7F11'}}> Login</Text></Text>
                    </TouchableOpacity> */}
                </ScrollView>
    )
}
const Styles=StyleSheet.create({
    Content:{
        top:'25%',
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        backgroundColor: '#FFF8F1',
        alignItems:"center",
        padding:'10%',
        height:'100%',
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