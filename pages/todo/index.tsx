import { observer } from 'mobx-react';
import { Button, Card, Col, Input, Typography, Row, Select, Space, Checkbox, Tag, Image } from "antd";
import { Radio } from 'antd';
import { Footer } from "antd/lib/layout/layout";
import { useState } from "react";
import TodoStore from "../../models/__snapshots__/todo";
import TodoList from './../../components/TodoList';

import { SortDescendingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import GlobalStore from '../../models/__snapshots__/todo';
import { nextState, previousState } from '../../models/__snapshots__/history';

const { Text, Title } = Typography;

function Layout() {

    const [descriptionTodo, setDescriptionTodo] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);
    const [typeFilter, setTypeFilter] = useState('all');

    function addTodo(e: any) {
        GlobalStore.addTodo(descriptionTodo);
        setDescriptionTodo('');
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
                    <Tag>Undo: Ctrl+Z</Tag> 
                    {/* <Button onClick={(e) => nextState()}>Redo</Button> */}
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
                        
                        <Input
                            addonBefore={<Checkbox disabled={GlobalStore.todosLength === 0} indeterminate={GlobalStore.isInderminate()} checked={GlobalStore.isAllChecked()} onChange={(e: any) => taskToggleAll(e)} />}
                            addonAfter={isAscSort ? <SortAscendingOutlined onClick={() => toggleSort()}/> : <SortDescendingOutlined onClick={() => toggleSort()}/>}
                            style={{ width: '100%' }} value={descriptionTodo} onPressEnter={(e) => addTodo(e)} onChange={(e) => setDescriptionTodo(e.target.value)} size="large" placeholder="What needs to be done?" className="input" />
                        

                        <Card 
                            style={{ width: '100%' }} 
                            bordered={true}
                            actions={actions()}
                            >
                            
                            <TodoList tasks={GlobalStore.filteredTasks(typeFilter)} />
                            
                        </Card>

                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}><Text type="secondary"> Made with ❤️ by Esteban. Based on <a className="ant-typography" target="_blank" href="https://github.com/tastejs/todomvc/blob/master/app-spec.md#functionality" rel="noopener noreferrer">TodoMVC functionality</a> </Text> </Footer>
            </main>
            
        </>
    )
}

export default observer(Layout);