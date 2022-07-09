import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { AddTodos } from '../components/AddTodos';
import { TodoItem } from '../components/TodoItem';
import { AppButton } from '../components/ui/AppButton';
import { AppLoader } from '../components/ui/AppLoader';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { Theme } from '../Theme';

export const MainScreen = () => {
    const { addTodos, removeTodo, todos, fetchTodos, error, loading } =
        useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const [widthDevice, setWidthDevice] = useState(
        Dimensions.get('window').width - Theme.PADDING_HORIZONTAL * 2
    );

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

    useEffect(() => {
        fetchTodos();
        loadTodos();
    }, []);

    useEffect(() => {
        const uppdateWitdh = () => {
            const width =
                Dimensions.get('window').width - Theme.PADDING_HORIZONTAL * 2;
            setWidthDevice(width);
        };
        const listener = Dimensions.addEventListener('change', uppdateWitdh);

        return () => {
            listener.remove();
        };
    });

    if (loading) {
        return <AppLoader />;
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
                <AppButton onPress={loadTodos}>Reload</AppButton>
            </View>
        );
    }

    return (
        <View
            style={{
                width: widthDevice,
            }}
        >
            <AddTodos onChanger={addTodos} />
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        removeTodo={removeTodo}
                        handleClickTodo={changeScreen}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    todoItems: {
        flexDirection: 'column',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 20,
        color: Theme.DANGER_COLOR,
    },
});
