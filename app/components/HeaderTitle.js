import React, { useLayoutEffect, useState,useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';

const HeaderTitle = props => {
  const {
    optionReducer: { option },
  } = useSelector(state => state);

  return (
    <View style={styles.headerTitle}>
      <Text>{props.children === 'Dashboard' ? option.label : props.children}</Text>
    </View>
  );
};

export default HeaderTitle;
