import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Theme } from '../Theme';

export const AddTodos = (props) => {
    const [state, setState] = useState('');

    const addHandler = async () => {
        if (state) {
            props.onChanger(state.trim());
            setState('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Неправильный текст');
        }
    };

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setState(text)}
                value={state}
                placeholder="Введите текст"
            />
            <AntDesign.Button name="pluscircleo" onPress={addHandler}>
                Add Task
            </AntDesign.Button>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    textInput: {
        width: '70%',
        fontSize: 20,
        padding: 4,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: Theme.MAIN_COLOR,
    },
});
