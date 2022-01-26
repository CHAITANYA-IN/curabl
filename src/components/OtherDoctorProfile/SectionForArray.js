import React from 'react';
import { Divider, Collapse, List, } from 'antd';

const { Panel } = Collapse;

function SectionForArray({ title, labels, values, }) {
  return (
    <>
      <Divider plain>
        <h1>
          {title}
        </h1>
      </Divider>
      {labels.map((label, i) => {
        return (
          <Collapse>
            <Panel showArrow={false}
              key={i}
              header={label}>
              <List key={i} dataSource={values[i]} renderItem={item => <List.Item>{item}</List.Item>} />
            </Panel>
          </Collapse>
        )
      })}

    </>
  );
}

export default SectionForArray;
