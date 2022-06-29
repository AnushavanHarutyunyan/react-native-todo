import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const TodoItem = ({
    todo: { title, id },
    removeTodo,
    handleClickTodo,
}) => {
    const handlePress = (id) => {
        handleClickTodo(id);
    };

    const handleLongPress = (id) => {
        removeTodo(id);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => handleLongPress(id)}
            onPress={() => {
                handlePress(id);
            }}
        >
            <View style={styeles.todo}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styeles = StyleSheet.create({
    todo: {
        borderWidth: 1,
        borderColor: '#eeg',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
