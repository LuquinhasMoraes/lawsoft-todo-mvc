import { List } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import GlobalStore from '../models/todo';

import TodoItem from './TodoItem';

interface Props {
    tasks: any[];
}

const TodoList: React.FC<Props> = ({ tasks }) => {

    function onSortEnd (event: any) {
        
        if (event.oldIndex !== event.newIndex) {
          const newData = arrayMoveImmutable([].concat(...tasks), event.oldIndex, event.newIndex).filter(el => !!el);
          GlobalStore.setNewOrderedItems(newData);
        }
      };

    const SortableItem = SortableElement((props: any, item: any) => <TodoItem item={item} {...props} />);

    const SortableContent = SortableContainer((props: any) => <div {...props} />);

    return (
        <SortableContent
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
        >
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                pagination={tasks.length > 5 ? {
                    onChange: page => {

                    },
                    pageSize: 5,
                } : false}
                renderItem={(item, index) => (

                    <SortableItem index={index} item={item} {...item} />
                    // <TodoItem item={item} />
                )} />
        </SortableContent>

    )
}

export default observer(TodoList)