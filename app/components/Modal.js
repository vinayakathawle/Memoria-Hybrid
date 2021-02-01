import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import images from 'app/config/images';
import { DrawerActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';

const ModalBox = ({
    modalVisible,
    setModalVisible,
    message,
    onOkPress,
    error
}) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {padding: 33}]}>
                        <Text style={styles.modalText}>{message}</Text>

                        <View style={styles.buttonWrap}>
                            {
                                !error &&
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableHighlight>
                            }

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={onOkPress}
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalBox;
