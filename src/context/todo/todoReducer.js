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

export const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        title: action.title,
                    },
                ],
            };
        }
        case REMOVE_TODO: {
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
        }
        case UPDATE_TODO: {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        todo.title = action.title;
                    }
                    return todo;
                }),
            };
        }
        case FETCH_TODOS: {
            return {
                ...state,
                todos: action.todos,
            };
        }
        case SHOW_LOADER: {
            return {
                ...state,
                loading: true,
            };
        }
        case HIDE_LOADER: {
            return {
                ...state,
                loading: false,
            };
        }
        case SHOW_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case CLEAT_ERROR: {
            return {
                ...state,
                error: null,
            };
        }
        default:
            return state;
    }
};
