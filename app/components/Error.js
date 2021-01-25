import React, { useLayoutEffect, useState,useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from './styles';

const Error = (props) => {
  return (
    <View>
        <Text style={styles.errorMessage}>{props.message}</Text>
    </View>
  );
};

export default Error;
