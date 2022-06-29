import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { PlatformColor } from 'react-native';
import { Theme } from '../Theme';

export const Navbar = (props) => {
    return (
        <View
            style={{
                ...styles.navbar,
                ...Platform.select({
                    ios: styles.navbarIOS,
                    android: styles.navbarAndroid,
                }),
            }}
        >
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.MAIN_COLOR,
    },
    navbarAndroid: {
        backgroundColor: Theme.MAIN_COLOR,
    },
    navbarIOS: {
        borderBottomColor: Theme.MAIN_COLOR,
    },
    text: {
        fontSize: 30,
        color: '#000',
    },
});
