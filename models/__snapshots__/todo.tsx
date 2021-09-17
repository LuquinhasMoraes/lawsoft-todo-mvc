import { getSnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

const Todo: any = types.model({
    id: types.number,
    description: types.string,
    isCompleted: types.boolean,
    isEditing: types.boolean,
    disabled: types.boolean,
});

const TodoStore = types
.model({
    todos: types.array(Todo)
})
.views((self) => {
    return {
        get todosLeft() {
            return self.todos.filter((t) => !t.isCompleted).length
        },
        get todosCompleted() {
            return self.todos.filter((t) => t.isCompleted).length
        },
        todosByDescription(_description: string) {
            return self.todos.find((t) => t.description === _description);
        },
        isInderminate() : boolean {
            const isCompleted = self.todos.filter(x => x.isCompleted);
            return isCompleted.length > 0 && isCompleted.length < self.todos.length;
        },
        isAllChecked() : boolean {
            const isCompleted = self.todos.filter(x => x.isCompleted);
            return self.todos.length > 0 && isCompleted.length == self.todos.length;
        }
    }
})
.actions((self: any) => {
    return {
        reset() {
            self.todos = [];
            localStorage.setItem('todos', JSON.stringify(self.todos));
        },
        toggleAll(checked: boolean) {
            self.todos.forEach((x: any) => {
                x.isCompleted = checked;
                
            })
        },
        clearCompleted() {           
            self.todos = self.todos.filter((t: any) => !t.isCompleted);
        },
        toggleTodo(checked: boolean, todo: any) {
            self.todos.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.isCompleted = checked;
                }
            })
        },
        setEditingItem(todo: any) {
            self.todos.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.isEditing = true;
                }
            })
        },
        editItem(newDescription: string, todo: any) {
            self.todos.forEach((x: any) => {
                if(x.id === todo.id) {
                    x.description = newDescription;
                    x.isEditing = false;
                }
            })
        },
        addTodo(_description: string) {
            if(_description != '' && self.todosByDescription(_description) == null) {

                self.todos.push({
                    id: Math.random(),
                    description: _description,
                    isCompleted: false,
                    isEditing: false,
                    disabled: true,
                });
    
                localStorage.setItem('todos', JSON.stringify(self.todos));
            }

        },
        deleteTodo(todo: any) {
            self.todos = self.todos.filter((x: any) => x.id !== todo.id);
        },
        sort(isAscSort: boolean) {
            self.todos = self.todos.sort((a: any, b: any) => {
                if(a.description > b.description) {
                    return isAscSort ? 1 : -1;
                }
            
                if(a.description < b.description) {
                    return isAscSort ? -1 : 1;
                }
                return 0;
            });
            localStorage.setItem('todos', JSON.stringify(self.todos));
        }
    }
}).create({
    todos: []
});

export interface ITodo extends Instance<typeof TodoStore> {}

export interface ITodoSnapshotIn extends SnapshotIn<typeof TodoStore> {}

export interface ITodoSnapshotOut extends SnapshotOut<typeof TodoStore> {}


export default TodoStore;