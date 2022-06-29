import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';
import { Theme } from '../../Theme';

export const AppButton = ({ children, onPress, color = Theme.MAIN_COLOR }) => {
    const Wrapper =
        Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <Wrapper onPress={onPress}>
            <View style={{ ...styeles.button, backgroundColor: color }}>
                <Text>{children}</Text>
            </View>
        </Wrapper>
    );
};

const styeles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.MAIN_COLOR,
    },
});
