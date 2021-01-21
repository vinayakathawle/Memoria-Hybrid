
import React from 'react';
import {
    Image,
    View,
    Modal
} from 'react-native';
import images from 'app/config/images';
import styles from './styles';

const Spinner = ({ props, navigation }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={images.icons.loader}
                            style={{
                                width: 100,
                                height: 100
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Spinner;
