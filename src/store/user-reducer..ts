const user = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
}

export function userReducer(state = user, action: any){
    switch (action.type){
        default:
            return {...state}
        case "setUser":
            return {...action.user}
    }
}