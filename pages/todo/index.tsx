import { observer } from 'mobx-react';
import { Button, Card, Col, Input, Typography, Row, Select, Space, Checkbox } from "antd";
import { Radio } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { useState } from "react";
import TodoStore from "../../models/__snapshots__/todo";
import TodoList from './../../components/TodoList';

import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

function Layout() {

    const [descriptionTodo, setDescriptionTodo] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);
    const [typeFilter, setTypeFilter] = useState('all');

    function addTodo(e: any) {
        if(e.keyCode === 13) {
            TodoStore.addTodo(descriptionTodo);
            setDescriptionTodo('');
        }
    }

    function taskToggleAll(e: any) {
        TodoStore.toggleAll(e.target.checked);
    }

    function toggleSort() {
        var isAsc = isAscSort;
        isAsc = !isAsc;
        
        TodoStore.sort(isAsc);
        setIsAscSort(isAsc);
    }

    function actions() {
        if(TodoStore.todosLength > 0) {
            return [
                <a key={0} href="setting">{TodoStore.todosLeftLength} items left</a>,
                
                <Radio.Group defaultValue="a" buttonStyle="solid" key={1}>
                    <Radio.Button value="a" onClick={(e) => setTypeFilter('all')} >All</Radio.Button>
                    <Radio.Button value="b" onClick={(e) => setTypeFilter('active')} >Active</Radio.Button>
                    <Radio.Button onClick={(e) => setTypeFilter('completed')} value="c">Completed</Radio.Button>
                </Radio.Group>,
    
                TodoStore.todosCompletedLength > 0 ? <Button onClick={(e) => TodoStore.clearCompleted()}>Clear Completed</Button> : null,
              ];
        }

        return [];
    }
    
    return (
        
        <>
            <header>
                <Row justify="center">
                    <Space className="space" direction="horizontal" style={{width: '100%', height: 288, justifyContent: 'center'}}>
                        <img src="/img/logo.png" alt="Logo" height="165" />
                        <Title style={{color: 'white'}}>Lawsoft TodoMVC</Title>
                    </Space>
                </Row>
            </header>

            <main>
                <Row className="main-row" justify="center">
                    <Col span={12}>
                        
                        <Input
                            addonBefore={<Checkbox disabled={TodoStore.todosLength === 0} indeterminate={TodoStore.isInderminate()} checked={TodoStore.isAllChecked()} onChange={(e: any) => taskToggleAll(e)} />}
                            addonAfter={isAscSort ? <SortAscendingOutlined onClick={() => toggleSort()}/> : <SortDescendingOutlined onClick={() => toggleSort()}/>}
                            style={{ width: '100%' }} value={descriptionTodo} onKeyUp={(e) => addTodo(e)} onChange={(e) => setDescriptionTodo(e.target.value)} size="large" placeholder="What needs to be done?" className="input" />
                        

                        <Card 
                            style={{ width: '100%' }} 
                            bordered={true}
                            actions={actions()}
                            >
                            
                            <TodoList tasks={TodoStore.filteredTasks(typeFilter)} />
                            
                        </Card>

                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}><Text type="secondary"> Made with ❤️ by Steban. Based on <a className="ant-typography" target="_blank" href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" rel="noopener noreferrer">TodoMVC functionality</a> </Text> </Footer>
            </main>
            
        </>
    )
}

export default observer(Layout);