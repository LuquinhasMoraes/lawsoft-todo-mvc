import { observer } from 'mobx-react';
import { Button, Card, Col, Input, Typography, Row, Select, Space, Checkbox, Tag, Image, Form, FormInstance } from "antd";
import { Radio } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import React, { useState } from "react";
import TodoList from './../../components/TodoList';

import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import GlobalStore from '../../models/__snapshots__/todo';

const { Text, Title } = Typography;

function Layout() {

    const formRef = React.createRef<FormInstance>();
    const [descriptionTodo, setDescriptionTodo] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);
    const [typeFilter, setTypeFilter] = useState('all');

    function addTodo(e: any) {
        if(descriptionTodo != '') {
            GlobalStore.addTodo(descriptionTodo);
            formRef.current!.resetFields();
        }
    }

    function taskToggleAll(e: any) {
        GlobalStore.toggleAll(e.target.checked);
    }

    function toggleSort() {
        var isAsc = isAscSort;
        isAsc = !isAsc;
        
        GlobalStore.sort(isAsc);
        setIsAscSort(isAsc);
    }

    

    function actions() {
        if(GlobalStore.todosLength > 0) {
            return [
                <a key={0} href="setting">{GlobalStore.todosLeftLength} items left</a>,
                
                <Radio.Group defaultValue="a" buttonStyle="solid" key={1}>
                    <Radio.Button value="a" onClick={(e) => setTypeFilter('all')} >All</Radio.Button>
                    <Radio.Button value="b" onClick={(e) => setTypeFilter('active')} >Active</Radio.Button>
                    <Radio.Button onClick={(e) => setTypeFilter('completed')} value="c">Completed</Radio.Button>
                </Radio.Group>,
    
                GlobalStore.todosCompletedLength > 0 ? <Button onClick={(e) => GlobalStore.clearCompleted()}>Clear Completed</Button> : null,
                <>
                    <Tag color="blue">Undo: Ctrl+Z</Tag> 
                </>

              ];
        }

        return [<Tag key={5}>Undo: Ctrl+Z</Tag>];
    }
    
    return (
        
        <>
            <header>
                <Row justify="center">
                    <Space className="space" direction="horizontal" style={{width: '100%', height: 288, justifyContent: 'center'}}>
                        <Image src="/img/logo.png" alt="Logo" width={170} />
                        <Title style={{color: 'white'}}>Lawsoft TodoMVC</Title>
                    </Space>
                </Row>
            </header>

            <main>
                <Row className="main-row" justify="center">
                    <Col span={12}>
                        
                        <Form
                        ref={formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        >
                            <Form.Item
                                name="descriptionTodo"
                                style={{marginBottom: 0}}
                                rules={[{ required: true, message: 'Enter a task!' }]}
                            >
                            <Input      
                                addonBefore={<Checkbox disabled={GlobalStore.todosLength === 0} indeterminate={GlobalStore.isInderminate()} checked={GlobalStore.isAllChecked()} onChange={(e: any) => taskToggleAll(e)} />}
                                addonAfter={isAscSort ? <SortAscendingOutlined onClick={() => toggleSort()}/> : <SortDescendingOutlined onClick={() => toggleSort()}/>}
                                style={{ width: '100%' }} value={descriptionTodo} onPressEnter={(e) => { addTodo(e);}} onChange={(e) => setDescriptionTodo(e.target.value)} size="large" placeholder="What needs to be done?" className="input" />
                            </Form.Item>
                        </Form> 
                         

                        <Card 
                            style={{ width: '100%' }} 
                            bordered={true}
                            actions={actions()}
                            >
                            
                            <TodoList tasks={GlobalStore.filteredTasks(typeFilter)} />
                            
                        </Card>

                          


                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}><Text type="secondary"> Made with ❤️ by Lawsoft Team. Based on <a className="ant-typography" target="_blank" href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" rel="noopener noreferrer">TodoMVC functionality</a> </Text> </Footer>
            </main>
            
        </>
    )
}

export default observer(Layout);