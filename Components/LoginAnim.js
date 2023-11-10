import { View, Image, StyleSheet, Animated } from "react-native";
import { useEffect, useState } from "react";

const LoginAnim = () => {
    const time1 = useState(new Animated.Value(0))[0];
    const time2 = useState(new Animated.Value(3100))[0];

    const timing1 = () => {

        Animated.loop(
            Animated.timing(time1, {
                toValue: -3100,
                duration: 50000,
                useNativeDriver: false,
            })
        ).start();
    }

    const timing2 = () => {

        Animated.loop(
            Animated.timing(time2, {
                toValue: 0,
                duration: 50000,
                useNativeDriver: false,
            })
        ).start();
    }

    useEffect(() => {
        timing1();
        timing2()
    }, [])

    return (
        <View style={Styles.animWrapper}>
            <Animated.View style={{top: time1}}>
                <Image source={require('../assets/Resources/Images/strip1.png')} />
            </Animated.View>
            <Animated.View style={{bottom: time2}}>
                <Image source={require('../assets/Resources/Images/strip2.png')} />
            </Animated.View>
            <Animated.View style={{top: time1}}>
                <Image source={require('../assets/Resources/Images/strip3.png')} />
            </Animated.View>
            <Animated.View style={{bottom: time2}}>
                <Image source={require('../assets/Resources/Images/strip4.png')} />
            </Animated.View>
        </View>
    );
};


const Styles=StyleSheet.create({
    animWrapper: {
        height: 400,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 50,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    }
})

export default LoginAnim;
