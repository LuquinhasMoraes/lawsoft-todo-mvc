import { List } from 'antd';
import { observer } from 'mobx-react';

import TodoItem from './TodoItem';

interface Props { 
    tasks: any[];
}

const TodoList: React.FC<Props> = ({tasks}) => {

    return (
        <List
        itemLayout="horizontal"
        dataSource={tasks}
        pagination={tasks.length > 5 ? {
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