import { TodoStore } from "../models/__snapshots__/todo";

const StoreTest = TodoStore.create({ tasks: [] });

it('adding tasks', () => {

    const description1 = 'Create tests with jests';
    const description2 = 'Run Jest tests';

    StoreTest.addTodo(description1);
    StoreTest.addTodo(description2);
    
    expect(StoreTest.tasks.length).toBe(2);
    expect(StoreTest.tasks[1].description).toBe(description1);
    expect(StoreTest.tasks[0].description).toBe(description2);
});

it('editing task', () => {

    const task = StoreTest.tasks[0];
    
    const newDescription = 'Task was edited';

    StoreTest.editItem(newDescription, task)
    
    expect(StoreTest.tasks[0].description).toBe(newDescription);
});

it('deleting task', () => {

    const task = StoreTest.tasks[1];

    StoreTest.deleteTodo(task)
    
    expect(StoreTest.tasks.length).toBe(1);
});

it('reseting store', () => {
    StoreTest.reset();
    expect(StoreTest.tasks.length).toBe(0);
});
