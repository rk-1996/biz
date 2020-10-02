import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { updateNotesEmployee, updateNotesContractor } from "services/people";

const { TextArea } = Input;


const Notes = (props) => {
  let { saveNotes, actionType, activeCompany, Data, token } = props
  let noteChangeHandler = (e) => {
    console.log(e.target.value)
    setNotes(e.target.value)
  }
  const [notes, setNotes] = useState(Data.notes);
  console.log("employee data", Data.notes)
  console.log("action type", actionType)
  console.log("employee data id", Data)
  console.log("company", activeCompany)
  let saveNoteHandler = async (e) => {
    e.preventDefault()

    if (actionType === 'contractor') {
      let params = {
        user: Data.cnid,
        company: activeCompany.company
      }
      console.log("in action")
      const result = await updateNotesContractor(token.accessToken, params, {
        note: notes
      });

    } else {
      let params = {
        user: Data.eid,
        company: activeCompany.company
      }
      const result = await updateNotesEmployee(token.accessToken, params, {
        note: notes,
      });
    }
  }
  return (
    <div>
      <div>
        <TextArea onChange={noteChangeHandler} value={notes} rows={20} placeholder="Notes" />
      </div>
      <div className="gx-pt-5 text-right">
        <Button onClick={saveNoteHandler} type="primary">Save</Button>
      </div>
    </div>
  );
};

export default Notes;
