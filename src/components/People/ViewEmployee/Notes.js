import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

const Notes = () => {
  return (
    <div>
      <div>
        <TextArea rows={20} placeholder="Notes"/>
      </div>
      <div className="gx-pt-5 text-right">
        <Button type="primary">Save</Button>
      </div>
    </div>
  );
};

export default Notes;
