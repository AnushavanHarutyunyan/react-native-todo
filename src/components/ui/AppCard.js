import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../Theme';

export const AppCard = (props) => {
    return (
        <View style={{ ...styeles.default, ...props.style }}>
            {props.children}
        </View>
    );
};

const styeles = StyleSheet.create({
    default: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#353535',
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 },
        elevation: 8,
        backgroundColor: 'white',
    },
});
