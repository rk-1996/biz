import React, { useState } from 'react';
import {
  Select,
  Divider,
  Icon,
  message
} from "antd";
import { connect } from "react-redux";
import AddEditDepartmentModal from "./../../components/Settings/JobTitleDepartMent/Modals/AddEditDepartmentModal";
import { createDepartment } from 'services/company';
import { getDepartmentRequest } from 'appRedux/actions/Common';

const { Option } = Select;

const SelectDepartment = ({
  departments,
  authUser,
  getDepartmentRequest,
  activeCompany,
  selected,
  onChange
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [createDepartmentLoader, setcreateDepartmentLoader] = useState(false);

  const onChangeSelect = (e) => {
    onChange(e);
  }

  const createDepartmentHandler = async (value) => {
    const params = {
      ...value,
      company: activeCompany
    }
    setcreateDepartmentLoader(true);
    const result = await createDepartment(authUser.tokens.accessToken, params);
    setcreateDepartmentLoader(false);
    if (result.status === 201) {
      const params = {
        company: activeCompany
      }
      getDepartmentRequest(params);
      setOpenModal(false);
      message.success('Department is created!')
    }
  }

  return (
    <>
      <Select
        placeholder="Select Jobs"
        defaultValue={selected ? selected : null}
        onChange={onChangeSelect}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()}
              onClick={() => setOpenModal(true)}
            >
              <Icon type="plus" /> Add Department
          </div>
          </div>
        )}
      >
        {
          departments && departments.length ?
            departments.map((j, i) => {
              return (
                <Option value={j.department} key={i}>{j.department}</Option>
              )
            }) : ""
        }
      </Select>
      <AddEditDepartmentModal
        title="Add New Department"
        visible={openModal}
        handleOk={createDepartmentHandler}
        handleCancel={() => setOpenModal(false)}
        createDepartmentLoader={createDepartmentLoader}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    departments: state.common.departments,
    activeCompany: state.common.activeCompany.company,
    authUser: state.auth.authUser
  }
};

export default connect(mapStateToProps, {
  getDepartmentRequest
})(SelectDepartment);
