import React, {createContext} from 'react'

export type AuthAction = { type: string; payload: { token: string | null }  };


export interface IAuthContext {
    state: {token: string | null};
    dispatch : React.Dispatch<AuthAction>;
}

export const getAuthInitialState = () => {
    const token = localStorage.getItem('flashcards-token');
    return { token: token };
};

export const AuthContext = createContext<IAuthContext>({state: {token: null}, dispatch: ()=> null});

