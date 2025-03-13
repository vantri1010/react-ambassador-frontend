import {User} from "../../models/user";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null
}

export const setUserReducer = (state = initialState, action: { type: string, user: User | null }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
