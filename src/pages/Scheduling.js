// Doctor

import React, { useState } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';



import { Button, DatePicker, Layout, Calendar, Select, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space } from 'antd';

const Listbox = styled.ul`
display: grid;
grid-template-columns: repeat(9, 1fr);
grid-auto-rows: min-content;
grid-gap: 1em;
list-style: none;
margin: 0;
padding: 1em;
height: 355px;
overflow: auto;
border-top: 1px solid ${props => props.theme.secondary};
`;
const ListItem = styled.li`
padding: 0.75em 0.5em;
border: 1px solid;
background-color: lightblue;
margin: 0;
cursor: pointer;
text-align: center;
min-width: 99px;
`;
const { Header, Footer, Content } = Layout;

function onPanelChange(value, mode) {
    console.log(value, mode);
}
function onSelect(value) {
    console.log(value, "date selecteed");
}

function Scheduling() {
    var morning_schedule = [9, 9.15, 9.30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15, 34, 3434, 98, 65, 23432, 536, 4, 3436, 76, 123, 87, 3444, 171, 43, 4550];
    var evening_schedule = [6, 6.34, 7.45, 8, 8.34, 8.7545, 9, 10, 11];
    const [sched, changeDate] = useState(morning_schedule);

    function onChange(date, dateString) {
        changeDate(evening_schedule);
        console.log(dateString);
    }

    return (
        // center the element
        <div className="Scheduling" >
            <Row gutter={[24, 0]}>
                <Col span={24} md={24} className="mb-24">
                    <Card bordered={false}
                        className="header-solid h-full ant-invoice-card"
                    >


                        {/* <Layout> */}
                        <Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Upcoming Slots</Header>
                        <Header style={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
                            <DatePicker
                                disabledDate={(current) => {
                                    return moment().add(-1, 'days') >= current
                                }}
                                format="DD-MM-YYYY"
                                onChange={onChange} />

                            <Modal_shed /></Header>
                        <Content>
                            <>
                                {/* 
                        <List style={{ overflow: 'auto', height: '220px' }}
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={morning_schedule}
                        renderItem={item => (
                            <List.Item>
                            <Typography.Text mark>{item}</Typography.Text>
                            <Button type="primary" danger>
                            Delete
                            </Button>
                            </List.Item>
                            )}
                        /> */}

                                <Listbox style={{ overflow: 'auto', height: '420px' }}>
                                    {sched.map(slot => {
                                        // const isValid = validator ? validator(slot) : true;
                                        return (
                                            <ListItem
                                                key={slot}
                                                // isValid={isValid}
                                                onClick={() => alert(slot)}
                                            >
                                                {slot}
                                            </ListItem>
                                        );
                                    })}
                                </Listbox>

                            </>
                        </Content>




                    </Card>
                </Col>
            </Row>
        </div>
    )
};

export default Scheduling;
