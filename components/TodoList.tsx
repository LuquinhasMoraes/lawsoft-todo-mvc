import { List } from 'antd';
import { arrayMoveImmutable } from 'array-move';
import { observer } from 'mobx-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import TodoItem from './TodoItem';

interface Props {
    tasks: any[];
}

const TodoList: React.FC<Props> = ({ tasks }) => {

    function onSortEnd (oldIndex: any, newIndex: any) {
        
        if (oldIndex !== newIndex) {
          const newData = arrayMoveImmutable([].concat(...tasks), oldIndex, newIndex).filter(el => !!el);
          console.log('Sorted items: ', newData);
        //   this.setState({ dataSource: newData });
        }
      };

    const SortableItem = SortableElement((props: any, item: any) => <TodoItem item={item} {...props} />);

    const SortableContent = SortableContainer((props: any) => <div {...props} />);

    const DraggableContainer = (props: any) => (
        <SortableContent
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );


    return (
        <SortableContent
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={() => console.log()}
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