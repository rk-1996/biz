import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { updateNotesEmployee,updateNotesContractor } from "services/people";

const { TextArea } = Input;


const Notes = (props) => {
  let { saveNotes, actionType, activeCompany, Data, token } = props
  let noteChangeHandler = (e) => {
    console.log(e.target.value)
    setNotes(e.target.value)
  }
  const [notes, setNotes] = useState();

  let saveNoteHandler = async (e) => {
    e.preventDefault()
    let obj = {
      notes: notes
    }
    if (actionType === 'contractor') {
      const result = await updateNotesContractor(token, {
        ...obj,
        id: Data.id,
        location: activeCompany.location,
        company: activeCompany.company,
        actionType: "employee",
      });

    } else {
      const result = await updateNotesEmployee(token, {
        ...obj,
        id: Data.id,
        location: activeCompany.location,
        company: activeCompany.company,
        actionType: "employee",
      });
    }
  }
  return (
    <div>
      <div>
        <TextArea onChange={noteChangeHandler} rows={20} placeholder="Notes" />
      </div>
      <div className="gx-pt-5 text-right">
        <Button onClick={saveNoteHandler} type="primary">Save</Button>
      </div>
    </div>
  );
};

export default Notes;
