export enum Status { 
    active = '0',
    completed = '1',
    editing = '2',
    disabled = '3'
}

export const ENUMS_MST = {
    Status: Object.values(Status) as string[],
}
