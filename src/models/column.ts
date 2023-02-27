export interface ColumnModel{
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    name: string;
    width: number;
    order_number: number;
    type: string;
    project_id: number;
}