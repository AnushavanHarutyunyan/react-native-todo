import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Navbar } from './Navbar';
import { Theme } from '../Theme';
import { MainScreen } from '../screen/MainScreen';
import { TodoScreen } from '../screen/TodoScreen';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext);

    let content = <MainScreen />;

    if (todoId) {
        content = <TodoScreen />;
    }

    return (
        <View>
            <Navbar title="Todo App" />
            <View style={styles.container}>
                {todoId ? <TodoScreen /> : <MainScreen />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Theme.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
