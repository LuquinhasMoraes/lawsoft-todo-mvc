import { observer } from 'mobx-react';
import { Button, Card, Col, Input, Typography, Row, Space, Checkbox, Tag, Image, Form, FormInstance } from "antd";
import { Radio } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import React, { useState } from "react";
import TodoList from './TodoList';

import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import GlobalStore from './../models/todo';
import TaskStore from '../models/utils';
import UtilsStore from '../models/utils';

const { Text, Title } = Typography;

function Layout() {

    const formRef = React.createRef<FormInstance>();
    const [isAscSort, setIsAscSort] = useState(true);

    function addTodo(e: any) {
        if (TaskStore.taskDescription != '') {
            GlobalStore.addTodo(TaskStore.taskDescription);
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
        if (GlobalStore.todosLength > 0) {
            return [
                <a key={0} href="setting">{GlobalStore.todosLeftLength} items left</a>,

                <Radio.Group defaultValue="a" buttonStyle="solid" key={1}>
                    <Radio.Button value="a" onClick={(e) => TaskStore.setFilter('all')} >All</Radio.Button>
                    <Radio.Button value="b" onClick={(e) => TaskStore.setFilter('active')} >Active</Radio.Button>
                    <Radio.Button onClick={(e) => TaskStore.setFilter('completed')} value="c">Completed</Radio.Button>
                </Radio.Group>,

                <Button disabled={GlobalStore.todosCompletedLength == 0} onClick={(e) => GlobalStore.clearCompleted()}>Clear Completed</Button>,
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
                    <Space className="space" direction="horizontal" style={{ width: '100%', height: 288, justifyContent: 'center' }}>
                        <Image src="/img/logo.png" alt="Logo" width={170} />
                        <Title style={{ color: 'white' }}>Lawsoft TodoMVC</Title>
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
                                style={{ marginBottom: 0 }}
                                rules={[{ required: true, message: 'Enter a task!' }]}
                            >
                                <Input
                                    addonBefore={<Checkbox disabled={GlobalStore.todosLength === 0} indeterminate={GlobalStore.isInderminate()} checked={GlobalStore.isAllChecked()} onChange={(e: any) => taskToggleAll(e)} />}
                                    addonAfter={isAscSort ? <SortAscendingOutlined onClick={() => toggleSort()} /> : <SortDescendingOutlined onClick={() => toggleSort()} />}
                                    style={{ width: '100%' }} value={TaskStore.taskDescription} onPressEnter={(e) => { addTodo(e); }} onChange={(e) => TaskStore.setDescriptionTask(e.target.value)} size="large" placeholder="What needs to be done?" className="input" />
                            </Form.Item>
                        </Form>


                        <Card
                            style={UtilsStore.isDragging ? { width: '100%', background: 'rgb(210, 241, 253)', transition: '0.5s'} : {width: '100%', transition: '0.5s'}}
                            bordered={true}
                            actions={actions()}
                        >   

                            <TodoList tasks={GlobalStore.filteredTasks(TaskStore.typeFilter)} />

                        </Card>

                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}><Text type="secondary"> Made with ❤️ by Lawsoft Team. Based on <a className="ant-typography" target="_blank" href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" rel="noopener noreferrer">TodoMVC functionality</a> </Text> </Footer>
            </main>

        </>
    )
}

export default observer(Layout);