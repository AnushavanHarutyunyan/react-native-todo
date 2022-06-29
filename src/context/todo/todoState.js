import React, { useContext, useReducer } from 'react';
import { Alert } from 'react-native';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../type';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen/screenContext';

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [
            { id: '1', title: 'Das enel' },
            { id: '2', title: 'Ertal xanut' },
            { id: '3', title: 'Ijnel pragulki' },
        ],
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { changeScreen } = useContext(ScreenContext);

    const addTodos = (title) => {
        dispatch({ type: ADD_TODO, title });
    };
    const removeTodo = (id) => {
        const selectedTodo = state.todos.find((item) => item.id === id);
        Alert.alert(
            'Remove this element',
            `Do you need remove "${selectedTodo.title}"`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        changeScreen(null);
                        dispatch({ type: REMOVE_TODO, id });
                    },
                    style: 'negative',
                },
            ],
            {
                cancelable: true,
            }
        );
    };
    const uppdateTitle = (editValue, id) => {
        dispatch({ type: UPDATE_TODO, title: editValue, id });
    };

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                addTodos,
                removeTodo,
                uppdateTitle,
                changeScreen,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
