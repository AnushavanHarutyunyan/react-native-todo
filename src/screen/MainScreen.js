import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { AddTodos } from '../components/AddTodos';
import { TodoItem } from '../components/TodoItem';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { Theme } from '../Theme';

export const MainScreen = () => {
    const { addTodos, removeTodo, todos } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const [widthDevice, setWidthDevice] = useState(
        Dimensions.get('window').width - Theme.PADDING_HORIZONTAL * 2
    );

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
});
