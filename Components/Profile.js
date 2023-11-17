// ProfileComponent.js
import React, {useState} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Switch, Share } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../action/auth';
import { Hr } from './Hr';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../assets/Resources/Images/arrow-right.svg';
import * as ImagePicker from 'expo-image-picker'
import {setSound} from '../action/asset';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileComponent = ({user, profileImage}) => {
  const navigation=useNavigation();
  const [image, setImage] = useState(profileImage ? profileImage : 'https://via.placeholder.com/150');
  const dispatch = useDispatch()
  const {sound} = useSelector(state => state.asset);

  console.log(sound);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    dispatch(setSound(!sound))
  }

  const shareApp = async () => {
    const result = await Share.share({
      title: 'App link',
      message: 'randomjoy://'
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      await AsyncStorage.setItem(`profile_${user._id}`, result.assets[0].uri)
      setImage(result.assets[0].uri);
    }
  };

  const MenuItem = ({ icon, label, onClick }) => {
    return (
      <TouchableOpacity onPress={onClick} style={styles.menuItem}>
      <View style={styles.settingsContainer} >
      <Ionicons name={icon} size={24} color="black" />
      <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      <Arrow />
    </TouchableOpacity>
    )
  }
    

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#FA821E', height: '70%', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.name}>{user.username}</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: image }} // Replace with your image source
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={() => pickImage()} style={styles.editIcon}>
            <Ionicons name="md-create" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.statusIndicator}>
          <Text style={{fontFamily: 'Recursive-Bold',}}>Status:</Text>
          <Text style={{fontFamily: 'Recursive-Bold', marginLeft: 6}}>{user.preferences === 0 ? 'Active' : 'Mute'}</Text>
        </View>

        <View style={styles.statsContainer}>
        <StatCircle label="Completed Tasks" value={user.completed_task} />
          <StatCircle label="Uncompleted Tasks" value={user.uncompleted_task} />
          <StatCircle label="Total Tasks" value={user.completed_task + user.uncompleted_task} />
        </View>
      </View>

      <ScrollView style={styles.menu}>
        <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10}}>
          <Text style={styles.menuItemLabel}>Sound VFX</Text>   
          <Switch
            trackColor={{false: '#5F4A38', true: '#FB953E'}}
            ios_backgroundColor='#5F4A38'
            onValueChange={toggleSwitch}
            value={sound}
          />
        </View>
        <Hr />
        <MenuItem icon="md-help-circle" label="Help" />
        <Hr />
        <MenuItem icon="md-share" label="Share App" onClick={() => shareApp()} />
        <Hr />
        <MenuItem icon="md-share" label="Logout" onClick={() => logout(navigation)} />
      </ScrollView>
    </View>
  );
};

const StatCircle = ({ label, value }) => (
  <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  <View style={[styles.statCircle, {backgroundColor: label.includes('Completed') ? '#44355B' : label.includes('Total') ? '#FF7F11' : '#58E4ED'}]}>
    <Text style={styles.statValue}>{value}</Text>
  </View>
  <View style={{flexDirection:'row'}}>
    <Text style={{flex: 1, flexWrap: 'wrap', fontFamily: 'Recursive-Bold', marginTop: 10, textAlign: 'center'}}>{label}</Text>
  </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Recursive-Bold',
  },
  profileImageContainer: {
    marginTop: 20,
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  statsContainer: {
    width:"100%",
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#FFB677',
    backgroundColor: '#F1B480'
  },
  settingsContainer: {
    display:"flex",
    alignItems:"center",
    flexDirection: 'row',
  },
  statCircle: {
    alignItems: 'center',
    height: 92,
    width: 92,
    borderRadius: 50,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.10)',
    shadowOffset: '0px 4px 4px 0px',
    shadowOpacity: 1
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 30,
    padding:"30px",
    color: '#FFF',
  },
  menu: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  menuItemLabel: {
    marginLeft: 10,
    fontFamily: 'Recursive-Bold',
  },
});

export default ProfileComponent;
