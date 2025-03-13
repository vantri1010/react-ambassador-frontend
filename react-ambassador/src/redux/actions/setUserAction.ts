import {User} from "../../models/user";

export const SET_USER = 'SET_USER';

interface SetUserAction {
    type: typeof SET_USER;
    user: User | null;
}

export const setUser = (user: User | null): SetUserAction => ({
    type: SET_USER,
    user
});
