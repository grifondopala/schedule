export interface TaskModel{
    task: Task;
    points: Array<any>;
}

export interface Task{
    ID: number;
    order_number: number;
    project_id: number;
    section_id: number;
    UpdatedAt: string;
    DeletedAt: string | null;
    CreatedAt: string;
    done: boolean;
}