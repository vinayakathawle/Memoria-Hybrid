import React,{ useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import config from 'app/config/styles';
import AsyncStorage from '@react-native-community/async-storage';
import images from 'app/config/images';
import * as optionActions from 'app/actions/optionActions';
import * as navigationActions from 'app/actions/navigationActions';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import credentials from 'app/config/firebase';
import Modal from 'app/components/Modal';

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getStorageValue();
  }, []);

  async function getStorageValue() {
    try {
      let username  = await AsyncStorage.getItem('userName');
      let role  = await AsyncStorage.getItem('role');
      let firstName  = await AsyncStorage.getItem('firstName');
      let lastName  = await AsyncStorage.getItem('lastName');
      setUserName(username)
      setRole(role)
      setFirstName(firstName)
      setLastName(lastName)
    } catch (e) {
      // handle here
    } finally {
   
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            source={images.icons.logo}
            rounded
            size={45}
            showAccessory
            activeOpacity={0.7}
            avatarStyle={styles.avatarStyle}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{firstName} {lastName}</Text>
            <Text style={styles.email}>{role}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={{flex:1}}>
          <DrawerItem
            label="Dashboard"
            labelStyle={styles.itemLabel} 
            onPress={() => {
              navigationActions.navigateToDashboard()
            }}
          /> 
        </View>
      </View>
      {
        role === 'ROLE_ADMIN' &&
        <View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 1"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 1');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 3"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 3');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 5"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 5');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 7"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 7');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 9"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 9');
                }}
              /> 
            </View>
          </View>
        </View>
      }
      {
        role === 'ROLE_USER' &&
        <View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 2"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 2');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 4"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 4');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 6"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 6');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 8"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 8');
                }}
              /> 
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={{flex:1}}>
              <DrawerItem
                label="Menu 10"
                labelStyle={styles.itemLabel} 
                onPress={() => {
                  props.navigation.navigate('Menu 10');
                }}
              /> 
            </View>
          </View>
        </View>
      }
      <View style={styles.itemContainer}>
        <View style={{flex:1}}>
          <DrawerItem
            label="Logout"
            labelStyle={styles.itemLabel} 
            onPress={async () => {
              if (!firebase.apps.length) {
                await firebase.initializeApp(credentials);
              } else {
                await firebase.app();
              }
              setModalVisible(true);

            }}
          /> 
        </View>
      </View>

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message="Are you sure you want to logout?"
        onOkPress={() => {
          auth()
            .signOut()
            .then(() => {
              dispatch(optionActions.logOut());
            });
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: config.color.COLOR_WHITE,
    shadowColor: config.color.COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  userName: {
    fontSize: 20,
    fontFamily: config.fonts.FONT_MEDIUM,
    color: config.color.COLOR_SECONDARY,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  userDetails: {
    paddingLeft: 5
  },
  email: {
    fontSize: 14,
    fontFamily: config.fonts.FONT_MEDIUM,
    color: config.color.COLOR_PRIMARY,
  },
  itemLabel: {
    fontSize: 14,
    color: config.color.COLOR_BLACK,
    fontFamily: config.fonts.FONT_BOOK
  },
  avatarStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
});
