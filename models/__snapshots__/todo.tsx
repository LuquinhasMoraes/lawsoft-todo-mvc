import { Instance, onSnapshot, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { parseCookies, setCookie } from "nookies";
import { ENUMS_MST, Status } from "../enums/Status.enum";

const Task: any = types.model({
    id: types.number,
    description: types.string,
    createAt: types.Date,
    status: types.enumeration("Status", ENUMS_MST.Status),
    isCompleted: types.boolean,
    isEditing: types.boolean,
    disabled: types.boolean,
});

export const TodoStore = types
.model({
    tasks: types.array(Task)
})
.views((self) => {
    return {
        getHigherTaskId() {
            if(self.tasks.length < 1) {
                return 0;
            } else {
                const arrayOfIds = self.tasks.map(task => task.id);
                return Math.max(...arrayOfIds);
            }
        },
        get todosLength() {
            return self.tasks.length
        },
        get todosLeftLength() {
            return self.tasks.filter((t) => t.status === Status.active).length
        },
        get todosCompletedLength() {
            return self.tasks.filter((t) => t.status === Status.completed).length
        },
        filteredTasks(type: string) {
            if(type === 'all')
                return self.tasks;
            else if(type === 'completed')
                return self.tasks.filter((t) => t.status === Status.completed);
            else
                return self.tasks.filter((t) => t.status === Status.active);
        },
        todosByDescription(_description: string) {
            return self.tasks.find((t) => t.description === _description);
        },
        isInderminate() : boolean {
            const isCompleted = self.tasks.filter(x => x.status === Status.completed);
            return isCompleted.length > 0 && isCompleted.length < self.tasks.length;
        },
        isAllChecked() : boolean {
            const isCompleted = self.tasks.filter(x => x.status === Status.completed);
            return self.tasks.length > 0 && isCompleted.length == self.tasks.length;
        }
    }
})
.actions((self: any) => {
    return {
        reset() {
            self.tasks = [];
        },
        toggleAll(checked: boolean) {
            self.tasks.forEach((x: any) => {
                x.status = checked ? Status.completed : Status.active;
            })
        },
        clearCompleted() {           
            self.tasks = self.tasks.filter((t: any) => t.status === Status.active);
        },
        toggleTodo(checked: boolean, todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.status = checked ? Status.completed : Status.active;
                }
            })
        },
        setEditingItem(todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.status = Status.editing;
                }
            })
        },
        editItem(newDescription: string, todo: any) {
            self.tasks.forEach((x: any) => {
                if(x.id === todo.id) {
                    
                    if(newDescription != '' && self.todosByDescription(newDescription) == null) {
                        x.description = newDescription;
                    }

                    x.status = Status.active;
                }
            })
        },
        addTodo(_description: string) {
            if(_description != '' && self.todosByDescription(_description) == null) {
                
                const incrementalId = self.getHigherTaskId() + 1;

                console.log(incrementalId);
                
                self.tasks.unshift({
                    id: incrementalId,
                    description: _description,
                    status: Status.active,
                    isCompleted: false,
                    isEditing: false,
                    disabled: true,
                    createAt: new Date()
                });
            }

        },
        deleteTodo(todo: any) {
            self.tasks = self.tasks.filter((x: any) => x.id !== todo.id);
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
        }
    }
})

var GlobalStore = TodoStore.create({
    tasks: parseCookies().todos != undefined ? JSON.parse(parseCookies().todos) : []
});

onSnapshot(GlobalStore, snapshot => {
    const _maxAge = 30 * 24 * 60 * 60;
    setCookie(null, 'todos', JSON.stringify(snapshot.tasks), {
        maxAge: _maxAge,
        path: '/',
    });
})

export interface ITodo extends Instance<typeof GlobalStore> {}

export interface ITodoSnapshotIn extends SnapshotIn<typeof GlobalStore> {}

export interface ITodoSnapshotOut extends SnapshotOut<typeof GlobalStore> {}

export default GlobalStore;