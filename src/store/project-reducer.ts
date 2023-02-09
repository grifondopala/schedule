const project = {
    project_info: {}
}

export function projectReducer(state = project, action: any){
    switch (action.type){
        default:
            return {...state}
        case "set-project-info":
            return {...state, project_info: action.project_info}
        case "change-project-info":
            return {...state, project_info: {...state.project_info, [action.property]: action.value }}
    }
}