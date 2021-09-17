import { observer } from 'mobx-react';
import { Button, Card, Col, Input, Typography, Row, Select, Space, Checkbox } from "antd";
import { Radio } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { useState } from "react";
import TodoStore from "../../models/__snapshots__/todo";
import TodoList from './TodoList';

import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';


const { Text, Title, Link } = Typography;


function Layout() {

    const [descriptionTodo, setDescriptionTodo] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);

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
        console.log(isAscSort);

        var isAsc = isAscSort;

        isAsc = !isAsc;

        console.log(isAsc);
        
        TodoStore.sort(isAsc);
        setIsAscSort(isAsc);

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
                        {/* <Input.Group compact> */}
                            <Input
                             addonBefore={<Checkbox indeterminate={TodoStore.isInderminate()} checked={TodoStore.isAllChecked()} onChange={(e: any) => taskToggleAll(e)} />}
                             addonAfter={isAscSort ? <SortAscendingOutlined onClick={() => toggleSort()}/> : <SortDescendingOutlined onClick={() => toggleSort()}/>}
                             style={{ width: '100%' }} value={descriptionTodo} onKeyUp={(e) => addTodo(e)} onChange={(e) => setDescriptionTodo(e.target.value)} size="large" placeholder="What needs to be done?" className="input" />
                        {/* </Input.Group> */}

                        <Card 
                            style={{ width: '100%' }} 
                            bordered={true}
                            actions={[
                                <a href="setting">{TodoStore.todosLeft} items left</a>,
                                
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="a">All</Radio.Button>
                                    <Radio.Button value="b">Active</Radio.Button>
                                    <Radio.Button onClick={(e) => TodoStore.clearCompleted()}value="c">Completed</Radio.Button>
                                </Radio.Group>,

                                TodoStore.todosCompleted > 0 ? <Button onClick={(e) => TodoStore.clearCompleted()}>Clear Completed</Button> : null,
                              ]}
                            >
                            
                            <TodoList />
                            
                        </Card>

                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}><Text type="secondary"> Made with ❤️ by Steban. Based on <a className="ant-typography" target="_blank" href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" rel="noopener noreferrer">TodoMVC functionality</a> </Text> </Footer>
            </main>
            
        </>
    )
}

export default observer(Layout);