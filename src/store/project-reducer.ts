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
            let newSections = [...state.sections]
            newSections[action.index] = {...newSections[action.index], ...action.data}
            return {...state, sections: [...newSections]}
        case "change-column":
            let newColumns = [...state.columns]
            newColumns[action.index] = {...newColumns[action.index], ...action.data}
            return {...state, columns: [...newColumns]}
        case "change-task":
            let changedTasks = [...state.tasks];
            let indexTask = changedTasks.findIndex((task: TaskModel) => task.task.ID === action.task.ID)
            changedTasks[indexTask].task = action.task
            return {...state}
        case "change-text-point":
            let newTasks = [...state.tasks];
            let index = newTasks.findIndex((task: TaskModel) => task.task.ID === action.taskId)
            newTasks[index].points[action.pointIndex].text = action.text
            return {...state, tasks: [...newTasks]}
        case "add-column":
            let array = [...state.tasks]
            action.points.forEach((point: any, index: number) => {
                array[index].points.push(point);
            })
            return {...state, columns: [...state.columns, action.column], tasks: array}
        case "add-task":
            return {...state, tasks: [...state.tasks, action.task]}
        case "add-section":
            return {...state, sections: [...state.sections, action.section]}
    }
}
