import { SectionModel } from "../models/section";
import { TaskModel } from "../models/task";
import { ColumnModel } from "../models/column";

const project = {
    project_info: {id: 0, name: '', description: '', color: '', icon_src: '', updated_at: ''},
    columns: [] as Array<ColumnModel>,
    tasks: [] as Array<TaskModel>,
    sections: [] as Array<SectionModel>,
}

export function projectReducer(state = project, action: any){
    switch (action.type){
        default:
            return {...state}
        case "set-project-info":
            return {...state, project_info: action.project_info}
        case "set-columns":
            return {...state, columns: action.columns}
        case "set-tasks":
            return {...state, tasks: action.tasks}
        case "set-sections":
            return {...state, sections: action.sections}
        case "change-project-info":
            return {...state, project_info: {...state.project_info, [action.property]: action.value }}
        case "change-section":
            let newSections = [...state.sections];
            newSections[action.index] = {...newSections[action.index], ...action.data};
            return {...state, sections: [...newSections]}
        case "change-column":
            let newColumns = [...state.columns];
            newColumns[action.index] = {...newColumns[action.index], ...action.data};
            return {...state, columns: [...newColumns]}
        case "change-text-point":
            let newTasks = [...state.tasks]
            newTasks[action.taskIndex].points[action.pointIndex].text = action.text;
            return {...state, tasks: [...newTasks]}
    }
}
