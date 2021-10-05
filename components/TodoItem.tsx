import { List, Checkbox, Input, Button, Divider } from 'antd';
import { observer } from 'mobx-react';
import { SortableHandle } from 'react-sortable-hoc';

import { DeleteOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons';

import { Typography } from 'antd';
import { useState } from 'react';
import { Status } from '../models/enums/Status.enum';
import GlobalStore from '../models/todo';
const { Link, Text } = Typography;

interface Props { 
    item: any;
}

const TodoItem: React.FC<Props> = ({item}) => {

    const [description, setNewDescription] = useState('');

    function taskToggle(checked: boolean, todo: any): void {
        GlobalStore.toggleTodo(checked, todo);    
    }

    function setEditItem(item: any) {
        GlobalStore.setEditingItem(item);
        setNewDescription(item.description);
    }

    function editItem(keyCode: any, item: any) {
        window.event?.preventDefault();
        if(keyCode === 13) {
            GlobalStore.editItem(description, item);
        }
    }

    function deleteTodo(item: any) {
        GlobalStore.deleteTodo(item);
    }

    const DragHandle = SortableHandle(() => <List.Item.Meta
        style={{ cursor: 'grab', color: '#999' }}
        avatar={avatar(item)}
        title={ title(item) }
        />
    );

    function actions(item: any) {
        return [
            item.status === Status.active ? <Button type="primary" icon={<EditOutlined />} onClick={() => setEditItem(item)}/> : null,  
            <Button key={item.id} type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteTodo(item)}/> ,
        ]
    }

    function avatar(item: any) {
        return (<><Checkbox checked={item.status === Status.completed} onChange={(e: any) => taskToggle(e.target.checked, item)} /></>);
    }

    function title(item: any) {
        var maxLength = 70;
        var _description = item.description.length >= maxLength ? item.description.substring(0, maxLength) + '...' : item.description;

        return item.status === Status.editing ? 
        <Input style={{ width: '100%' }} onFocus={(e) => e.target.select()} value={description} onBlur={(e) => editItem(13, item)} onKeyUp={(e: any) => editItem(e.keyCode, item)} onChange={(e: any) => setNewDescription(e.target.value)} autoFocus placeholder="Typing new description" /> 
        : item.status === Status.completed ? <> <Text delete disabled>{_description}</Text> <Divider type="vertical" />  <Text type="secondary" style={{ fontSize: '12px' }} disabled>{item.createAt.toLocaleString()}</Text> </> : <> {_description} <Divider type="vertical" /> <Text type="secondary" style={{ fontSize: '12px' }}>{item.createAt.toLocaleString()}</Text> </>
    }

    function getDescription(item: any) {
        return 'Create at: ' + item.createAt.toLocaleString();
    }


    return (
  
        <List.Item
            key={item.id}
            actions={actions(item)}>
            <DragHandle />
        </List.Item>

    )
}

export default observer(TodoItem)