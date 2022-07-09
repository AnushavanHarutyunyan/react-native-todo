import React, { useContext, useReducer } from 'react';
import { Alert } from 'react-native';
import {
    ADD_TODO,
    CLEAT_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO,
} from '../type';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { changeScreen } = useContext(ScreenContext);

    const addTodos = async (title) => {
        try {
            clearError();
            showLoader();
            const data = await Http.post(
                'https://reacnative-todo-app-default-rtdb.firebaseio.com/todos.json',
                { title }
            );
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            console.log(e);
            showError('Error Add Todo');
        } finally {
            hideLoader();
        }
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
                    onPress: async () => {
                        changeScreen(null);
                        try {
                            clearError();
                            showLoader();
                            await Http.delete(
                                `https://reacnative-todo-app-default-rtdb.firebaseio.com/todos/${id}.json`
                            );
                            dispatch({ type: REMOVE_TODO, id });
                        } catch (e) {
                            showError('Remove Todo Error');
                        } finally {
                            hideLoader();
                        }
                    },
                    style: 'negative',
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const uppdateTitle = async (editValue, id) => {
        try {
            clearError();
            showLoader();

            await Http.patch(
                `https://reacnative-todo-app-default-rtdb.firebaseio.com/todos/${id}.json`,
                { title: editValue }
            );
        } catch (e) {
            showError('Error Update Title ');
        } finally {
            hideLoader();
        }
        dispatch({ type: UPDATE_TODO, title: editValue, id });
    };

    const fetchTodos = async () => {
        try {
            showLoader();
            clearError();

            const response = await fetch(
                'https://reacnative-todo-app-default-rtdb.firebaseio.com/todos.json',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await Http.get(
                'https://reacnative-todo-app-default-rtdb.firebaseio.com/todos.json'
            );
            if (data) {
                const todos = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key,
                }));
                dispatch({ type: FETCH_TODOS, todos });
            }

            return [];
        } catch (e) {
            showError('Error Fetch Data!!!!!!');
        } finally {
            hideLoader();
        }
    };

    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });
    const showError = (error) => dispatch({ type: SHOW_ERROR, payload: error });
    const clearError = () => dispatch({ type: CLEAT_ERROR });

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                error: state.error,
                loading: state.loading,
                fetchTodos,
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
