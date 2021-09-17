import { List } from 'antd';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import TodoStore, { ITodoSnapshotIn } from './../models/__snapshots__/todo';

import TodoItem from './TodoItem';

function TodoList() {

    var data = getSnapshot(TodoStore);

    return (
        <List
        itemLayout="horizontal"
        dataSource={data.todos}
        pagination={data.todos.length > 5 ? {
            onChange: page => {
              
            },
            pageSize: 5,
        } : false}
        renderItem={item => (
            <TodoItem item={item} />
        )}/>
    )
}

export default observer(TodoList)