import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const Utils = types
.model({
    isDragging: types.boolean,
    taskDescription: types.string,
    typeFilter: types.string,
})
.actions((self: any) => {
    return {
        reset() {
            self.taskDescription = '';
        },
        setIsDragging(isDragging: boolean) {
            self.isDragging = isDragging;
        },
        setDescriptionTask(value: string) {
            self.taskDescription = value;
        },
        setFilter(value: string) {
            self.typeFilter = value
        }
    }
})

var UtilsStore = Utils.create({
    taskDescription: '',
    typeFilter: 'All',
    isDragging: false
});

export interface ITodo extends Instance<typeof UtilsStore> {}

export interface ITodoSnapshotIn extends SnapshotIn<typeof UtilsStore> {}

export interface ITodoSnapshotOut extends SnapshotOut<typeof UtilsStore> {}

export default UtilsStore;