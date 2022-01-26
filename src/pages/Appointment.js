// Doctor

import React, { useState, useEffect } from 'react';
import Modal_shed from "./shedul_modal";
import moment from 'moment'
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import DisplayDetails from '../components/Profiles/OtherDoctorProfile/DisplayDetails';
import { Button, message, DatePicker, Layout, Calendar, Select, Radio, Col, Row, Typography, Empty, Card, List, Divider, Space } from 'antd';

const Listbox = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  background-color: #a2d8eb;
  margin: 0;
  cursor: pointer;
  text-align: center;
opacity: ${props => (props.isValid ? 1 : 0.3)};
:hover {
  cursor: ${props => (props.isValid ? 'pointer' : 'inherit')};
  color: ${props => (props.isValid ? props.theme.primary : 'inherit')};
}

`;
const { Header, Footer, Content } = Layout;

function isBooked(slot) {
    console.log(slot);
    if (slot.status == "free")
        return 1;
}
function Appointment() {
    const serverURL = process.env.REACT_APP_SERVER_URL;
    var morning_schedule = [9, 9.15, 9.30, 9.45, 10, 10.15, 10.30, 10.45, 11, 11.15, 11.30, 11.45, 12, 12.15, 34, 3434, 98, 65, 23432, 536, 4, 3436, 76, 123, 87, 3444, 171, 43, 4550];
    var evening_schedule = [6, 6.34, 7.45, 8, 8.34, 8.7545, 9, 10, 11];
    const [date, changeDate] = useState(moment().format("DD-MM-YYYY"));
    const [timeslot, submitted] = useState("");
    const [schedule, setschedule] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            let res, data;
            try {
                console.log(serverURL);
                res = await axios.post(`${serverURL}/profile/getUser`, {
                    email: "mmm@example.com",
                    isDoctor: true,
                });
            } catch (err) {
                console.error(err);
            }
            if (res?.data) {
                data = res.data;
                console.log(data);
                delete data.id;
                setUser(data);
            }
            return () => {

            };
        };
        getUser();
    });
    const [loading, setLoading] = useState(false);
    const [slotStatus, setStatus] = useState(false);
    const doctorID = "123", patientID = "test123";
    let redirection;

    if (slotStatus) {
        console.log("@@@redirection if")
        redirection = (<Redirect
            to={{
                pathname: "/payment",
                state: {
                    from: 'appointment', data_slot: { date: date, timeslot: timeslot, doctorID: doctorID, patientID: patientID }
                }
            }
            } />);
    } else {
        console.log("@@@redirection else")

        redirection = (<div></div>)
    }


    useEffect(() => {
        // Your code here
        onChange(date);
    }, []);
    const timeSlotsContent = (<div>
        <Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Select Slot</Header>

        <Header style={{ padding: '10px' }}>
            <List
                itemLayout="horizontal"
                className="invoice-list"

            >
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '5%' }}
                        title={
                            <DatePicker
                                disabledDate={(current) => {
                                    return moment().add(-1, 'days') >= current
                                }}
                                format="DD-MM-YYYY"
                                // defaultValue={moment()}
                                onChange={onChange} />
                        }
                    />
                    <div className="amount" style={{ marginRight: '10%' }}>Date: {date}</div>
                </List.Item>


            </List>
        </Header>
        <Content>
            <>
                <Listbox style={{ overflow: 'auto', height: '420px' }}>
                    {schedule.map(slot => {
                        const isValid = isBooked(slot);
                        return (
                            <ListItem
                                key={slot.slottime}
                                isValid={isValid}
                                onClick={() => isValid && onSelectSlot(slot.slottime)}
                            >
                                {slot.slottime}
                            </ListItem>
                        );
                    })}
                </Listbox>
            </>
        </Content>
    </div>
    );
    const submitContent = (
        <div><Header style={{ fontWeight: 900, fontSize: "22px" }} orientation="left">Appointment Datails</Header>

            <List
                itemLayout="horizontal"
                className="invoice-list"

            >
                <List.Item style={{ marginLeft: '37%' }}>
                    <List.Item.Meta
                        title={<Button onClick={() => {
                            // Back button is pressed, fetch updated slots
                            onChange(date);
                            onSelectSlot("")
                        }
                        }>Go Back</Button>
                        }
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Date"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{date}</div>
                </List.Item>
                <List.Item>
                    <List.Item.Meta style={{ marginLeft: '17%' }}
                        title={"Slot"}
                    />
                    <div className="amount" style={{ marginRight: '22%' }}>{timeslot}</div>
                </List.Item>
                <List.Item style={{ marginLeft: '33%' }}>
                    <List.Item.Meta
                        title={

                            <Button type='primary' loading={loading}
                                onClick={async () => {

                                    // Reserve the slot by setting it to processing
                                    const slot_status = await reserveSlot(date, timeslot, doctorID)
                                    console.log(slot_status, "slot stastus");
                                    if (slot_status) {
                                        message.success('Slot Reserved. Complete payment within 5 min to confirm slot.', 10);
                                        setStatus(true);
                                    }
                                    else
                                        message.error('This slot is not free. Please try again later or book another slot.', 5);
                                    setLoading(false)
                                }

                                }>
                                Confirm Schedule</Button>}
                    />

                </List.Item>


                {redirection}
            </List>

        </div >);

    let content;

    if (timeslot == "") {
        content = timeSlotsContent;
    } else {
        content = submitContent;
        console.log("newww contennntt");
    }
    async function reserveSlot(date, timeslot, doctorId) {
        setLoading(true)

        var res = "", res1 = ""
        try {
            res = await axios.post(`http://localhost:9000/reserveSlot/processing`, {
                date: date,
                timeslot: timeslot,
                doctorId: doctorId
            });
        } catch (err) {
            console.error(err);
        }
        if (res?.data) {
            console.log(res.data);

            try {
                res1 = await axios.post(`http://localhost:9000/reserveSlot/startBackendTimer`, {
                    date: date,
                    timeslot: timeslot,
                    doctorId: doctorId
                });
            } catch (err) {
                console.error(err);
            }
            if (res1?.data) {
                console.log(res1.data);
                return 1;
            }
        } else {
            console.log("null response")
            // Slot is already under processing or booked
            // Slot is not free
            return 0;
        }


    }

    async function onChange(date, dateString) {
        // changeDate(evening_schedule);
        console.log("in onChange functioonnn@");
        console.log("begore changeDate", date);
        try {
            // When date - Fri Jan 28 2022 16:22:46 GMT+0530 
            date = date.format("DD-MM-YYYY")

        }
        catch {
            // When date - 28-01-2022
        }
        console.log("after try catch date = ", date);
        changeDate(date)
        // console.log("date check", moment(date, 'DD/MM/YYYY', true).format(), date.format("YYYY-MM-DD"), moment(date.format("YYYY-MM-DD")));
        var res = "";
        try {
            res = await axios.post(`http://localhost:9000/getSlot`, {
                Date: date
            });
        } catch (err) {
            console.error(err);
        }
        if (res?.data) {
            if (res.data.length < 1) {
                console.log("empty");
                setschedule([])
            }
            else {
                // console.log(res.data);
                console.log(res.data[0], res.data[0].slottime);
                setschedule(res.data);
            }
            // setschedule(res.data);
        }

    }
    // function onChange(date, dateString) {
    //     changeDate(dateString);
    //     // Selected a date or changed , picked
    //     console.log(dateString);
    // }
    function onSelectSlot(slot) {
        // When a slot is selected
        console.log("in onSelectSlot function")
        submitted(slot);
        console.log(slot, " Slot is selected")
        // alert(" Slot is selected")
    }

    return (
        <div className="Appointment">
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24">
                    <Card bordered={false}
                        className="header-solid h-full ant-invoice-card"
                    >
                        {content}
                    </Card>
                </Col>
                <Col span={24} md={16} className="mb-24">
                    <DisplayDetails user={user} />
                </Col>
            </Row>
        </div>
    )
};

export default Appointment;
