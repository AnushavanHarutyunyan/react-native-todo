import React from 'react';
import { StyleSheet, View } from 'react-native';

export const AppText = (props) => {
    return (
        <View style={{ ...styles.default, ...props.children }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    default: {},
});
