import {createStore} from "redux";
import {setUserReducer} from "./reducers/setUserReducer";

export const configureStore = () => createStore(
    setUserReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
