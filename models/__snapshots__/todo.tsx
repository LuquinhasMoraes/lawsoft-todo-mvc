import { getSnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

const Task: any = types.model({
    id: types.number,
    description: types.string,
    isCompleted: types.boolean,
    isEditing: types.boolean,
    disabled: types.boolean,
});

const TodoStore = types
.model({
    tasks: types.array(Task)
})
.views((self) => {
    return {
        get todosLeftLength() {
            return self.tasks.filter((t) => !t.isCompleted).length
        },
        get todosCompletedLength() {
            return self.tasks.filter((t) => t.isCompleted).length
        },
        filteredTasks(type: string) {
            if(type === 'all')
                return self.tasks;
            else if(type === 'completed')
                return self.tasks.filter((t) => t.isCompleted);
            else
                return self.tasks.filter((t) => !t.isCompleted);
        },
        todosByDescription(_description: string) {
            return self.tasks.find((t) => t.description === _description);
        },
        isInderminate() : boolean {
            const isCompleted = self.tasks.filter(x => x.isCompleted);
            return isCompleted.length > 0 && isCompleted.length < self.tasks.length;
        },
        isAllChecked() : boolean {
            const isCompleted = self.tasks.filter(x => x.isCompleted);
            return self.tasks.length > 0 && isCompleted.length == self.tasks.length;
        }
    }
})
.actions((self: any) => {
    return {
        reset() {
            self.tasks = [];
            localStorage.setItem('todos', JSON.stringify(self.tasks));
        },
        toggleAll(checked: boolean) {
            self.tasks.forEach((x: any) => {
                x.isCompleted = checked;
                
            })
        },
        clearCompleted() {           
            self.tasks = self.tasks.filter((t: any) => !t.isCompleted);
        },
        toggleTodo(checked: boolean, todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.isCompleted = checked;
                }
            })
        },
        setEditingItem(todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.isEditing = true;
                }
            })
        },
        editItem(newDescription: string, todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.description = newDescription;
                    x.isEditing = false;
                }
            })
        },
        addTodo(_description: string) {
            if(_description != '' && self.todosByDescription(_description) == null) {

                self.tasks.push({
                    id: Math.random(),
                    description: _description,
                    isCompleted: false,
                    isEditing: false,
                    disabled: true,
                });
    
                localStorage.setItem('todos', JSON.stringify(self.tasks));
            }

        },
        deleteTodo(todo: any) {
            self.tasks = self.todtasksos.filter((x: any) => x.id !== todo.id);
        },
        sort(isAscSort: boolean) {
            self.tasks = self.tasks.sort((a: any, b: any) => {
                if(a.description > b.description) {
                    return isAscSort ? 1 : -1;
                }
            
                if(a.description < b.description) {
                    return isAscSort ? -1 : 1;
                }
                return 0;
            });
            localStorage.setItem('todos', JSON.stringify(self.tasks));
        }
    }
}).create({
    tasks: []
});

export interface ITodo extends Instance<typeof TodoStore> {}

export interface ITodoSnapshotIn extends SnapshotIn<typeof TodoStore> {}

export interface ITodoSnapshotOut extends SnapshotOut<typeof TodoStore> {}


export default TodoStore;