import React, { useLayoutEffect, useState,useEffect } from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native';
import images from 'app/config/images';
import { DrawerActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';

const HeaderLeft = ({props, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon
        type="font-awesome"
        name="bars"
        size={20}
        color={config.color.COLOR_PRIMARY}
        style={styles.barIcon}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
