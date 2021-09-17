import { List, Checkbox, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import TodoStore from '../../models/__snapshots__/todo';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Typography } from 'antd';
import { useState } from 'react';
const { Link } = Typography;

interface Props { 
    item: any;
}

const TodoItem: React.FC<Props> = ({item}) => {

    const [description, setNewDescription] = useState(item.description);

    function taskToggle(checked: boolean, todo: any): void {
        TodoStore.toggleTodo(checked, todo);    
    }

    function setEditItem(item: any) {
        TodoStore.setEditingItem(item);
    }

    function editItem(keyCode: any, item: any) {
        window.event?.preventDefault();
        if(keyCode === 13) {
            TodoStore.editItem(description, item);
        }
    }

    function deleteTodo(item: any) {
        console.log(item);
        TodoStore.deleteTodo(item);
    }

    return (

            
        <List.Item
            actions={[
            !item.isCompleted ? <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditItem(item)}/> : null,  
            <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteTodo(item)}/> ]}>
            <List.Item.Meta
            avatar={<Checkbox checked={item.isCompleted} onChange={(e: any) => taskToggle(e.target.checked, item)} />}
            title={ item.isEditing ? <Input style={{ width: '100%' }} onFocus={(e) => e.target.select()} value={description} onBlur={(e) => editItem(13, item)} onKeyUp={(e: any) => editItem(e.keyCode, item)} onChange={(e: any) => setNewDescription(e.target.value)} autoFocus placeholder="Typing new description" /> : item.isCompleted ? <Link delete disabled href="#">{item.description}</Link> : <a href="#">{item.description}</a>}
            />
        </List.Item>

    )
}

export default observer(TodoItem)