import { Form, Input, Button, Space, InputNumber, Checkbox, Radio, Row, Col, Divider, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from "react";

const Prescription = () => {
  
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <>

      <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          style={{ paddingLeft: "4%", paddingRight: "4%", paddingTop: "4%", paddingBottom: "2%" }}
        >
          <Form.Item
            name='disease'
            rules={[{ required: true, message: 'Disease required' }]}
          >
            <Input style={{ width: "50%" }} placeholder="Input Disease" />

          </Form.Item>
        </Card>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>


              {fields.map(({ key, name, ...restField }) => (
                // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  style={{ paddingLeft: "4%", paddingRight: "4%", paddingTop: "4%", paddingBottom: "2%" }}
                >
                  <Row>
                    <Col flex={1}>

                      <Form.Item
                        {...restField}
                        name={[name, 'medicine']}
                        rules={[{ required: true, message: 'Missing medicine name' }]}
                      >
                        <Input placeholder="Medicine Name" />
                      </Form.Item>

                    </Col>

                  </Row>




                  <Row>
                    <Col flex={2}>
                      <p>Duration (In days)</p>

                      <Form.Item
                        {...restField}
                        name={[name, 'duration']}
                        rules={[{ required: true, message: 'Duration Missing' }]}
                      >
                        {/* <p>Duration</p> */}
                        <InputNumber 
                          min={1}
                          style={{
                            width: "80%",
                          }}
                        placeholder="Duration" />

                      </Form.Item>
                    </Col>
                    <Col flex={2} style={{ marginLeft: '10%' }}>
                      <Space key={key} >
                        <Col>
                          <p>Morning</p>
                          <Form.Item
                            {...restField}
                            name={[name, 'morning']}
                          //   rules={[{ required: true, message: 'Duration Missing' }]}
                          >
                            {/* <p>Morning</p> */}
                            <InputNumber
                              style={{
                                width: "35%",
                              }}
                              min={0}
                              max={10}
                              //  keyboard={mkeyboard}
                              step="0.5"
                              onChange={(value) => { console.log('changed', value) }}
                              stringMode
                            />

                          </Form.Item>
                        </Col>
                        <Col>
                          <p>Afternoon</p>
                          <Form.Item
                            {...restField}
                            name={[name, 'Afternoon']}
                          >

                            {/* <p>Afternoon</p> */}
                            <InputNumber
                              style={{
                                width: "35%",
                              }}
                              min={0}
                              max={10}
                              //  keyboard={akeyboard}
                              step="0.5"
                              onChange={(value) => { console.log('changed', value) }}
                              stringMode />
                          </Form.Item>
                        </Col>

                        <Col>
                          <p>Night</p>
                          <Form.Item
                            {...restField}
                            name={[name, 'night']}
                          //   rules={[{ required: true, message: 'Duration Missing' }]}
                          >
                            {/* <p>Night</p> */}
                            <InputNumber
                              style={{
                                width: "35%",
                              }}
                              min={0}
                              max={10}
                              //  keyboard={nkeyboard}
                              step="0.5"
                              onChange={(value) => { console.log('changed', value) }}
                              stringMode
                            />
                          </Form.Item>
                        </Col>
                      </Space>
                    </Col>
                    <Col flex={1}>
                      <Form.Item
                        {...restField}
                        name={[name, 'MedTime']}
                        rules={[{ required: true }]}
                      >
                        <Radio.Group size="small" style={{ marginTop: 16 }}>
                          <Radio value="after">Before Food</Radio>
                          <Radio value="before">After Food</Radio>

                        </Radio.Group>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col flex="auto">
                      <Form.Item
                        {...restField}
                        name={[name, 'Instruction']}
                      >
                        <Input.TextArea rows={4} autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Instruction" />
                        {/* <Input placeholder="Instruction" /> */}
                      </Form.Item>
                    </Col>
                  </Row>



                  <MinusCircleOutlined style={{ marginLeft: "50%" }} onClick={() => remove(name)} />
                </Card>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Medicine
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>


    </>
  );
};
export default Prescription;
// ReactDOM.render(<Demo />, mountNode);