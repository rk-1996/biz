import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Button, Input, Icon, Menu, Dropdown, Divider, message, Spin } from "antd";
import AddEditDepartmentModal from "./Modals/AddEditDepartmentModal";
import AssignDepartment from "./Modals/AssignDepartment";
import {connect} from "react-redux";
import { getDepartmentRequest } from 'appRedux/actions/Common';
import { createDepartment, getDepartmentMember } from './../../../services/company';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
const { Panel } = Collapse;
const { Search } = Input;

// const departments = [
//   {
//     name: "Department1",
//     count: 5,
//     members: [
//       {
//         id: 1,
//         firstName: "Mitul",
//         lastName: "Patel",
//       },
//       {
//         id: 1,
//         firstName: "Shekhar",
//         lastName: "Raval",
//       },
//     ],
//   },
//   {
//     name: "Department2",
//     count: 3,
//     members: [
//       {
//         id: 1,
//         firstName: "Mitul",
//         lastName: "Patel",
//       },
//       {
//         id: 1,
//         firstName: "Shekhar",
//         lastName: "Raval",
//       },
//     ],
//   },
//   {
//     name: "Department3",
//     count: 10,
//     members: [
//       {
//         id: 1,
//         firstName: "Mitul",
//         lastName: "Patel",
//       },
//       {
//         id: 1,
//         firstName: "Shekhar",
//         lastName: "Raval",
//       },
//     ],
//   },
//   {
//     name: "Department4",
//     count: 2,
//     members: [
//       {
//         id: 1,
//         firstName: "Mitul",
//         lastName: "Patel",
//       },
//       {
//         id: 1,
//         firstName: "Shekhar",
//         lastName: "Raval",
//       },
//     ],
//   },
//   {
//     name: "Unassigned",
//     count: 15,
//     members: [
//       {
//         id: 1,
//         firstName: "Mitul",
//         lastName: "Patel",
//       },
//       {
//         id: 1,
//         firstName: "Shekhar",
//         lastName: "Raval",
//       },
//     ],
//   },
// ];

const Department = (props) => {
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [edited, setedited] = useState(null);
  const [assignModal, setAssignModal] = useState(false);
  const [assignedMember, setAssignedMember] = useState(null);
  const [createDepartmentLoader, setCreateDepartmentLoader] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberLoader, setMemberLoader] = useState(false);

  const { getDepartmentRequest, activeCompany, departments, token } = props;

  useEffect(() => {
    const params = {
      company: activeCompany
    }
    getDepartmentRequest(params);
  }, [getDepartmentRequest, activeCompany]);


  useEffect(() => {
    if (!openModal) {
      setedited(null);
    }
  }, [openModal]);

  const getDepartment = useMemo(() => {
    return departments.filter(a => a.department.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, departments])

  const editJobHandler = (value) => {
    setedited(value);
    setOpenModal(true);
  };

  const openAssignmentHandler = (member) => {
    setAssignedMember(member);
    setAssignModal(true);
  };

  const menu = (j) => (
    <Menu>
      <Menu.Item onClick={() => editJobHandler(j)}>Edit</Menu.Item>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  );

  const genExtra = (j) => (
    <Dropdown overlay={() => menu(j)}>
      <Icon type="more" />
    </Dropdown>
  );

  const createDepartmentHandler = async (value) => {
    const params = {
      ...value,
      company: activeCompany
    }
    setCreateDepartmentLoader(true);
    const result = await createDepartment(token, params);
    setCreateDepartmentLoader(false);
    if(result.status === 201) {
      getDepartmentRequest({company: activeCompany});
      setOpenModal(false);
      message.success('Department is created!')
    }
  }

  const onChangeCollapse = async (e) => {
    if(getDepartment[e]) {
      const params = {
        id: getDepartment[e].id
      }
      setMemberLoader(true);
      const result = await getDepartmentMember(token, params);
      setMemberLoader(false);
      if (result.status === 200) {
        setMembers(result.data);
      }
    }
  }

  return (
    <div>
      <div className="flex-x align-center space-between table-search-section gx-pt-2 gx-pb-2">
        <div>
          <Search
            value={searchText}
            placeholder="Search Departments"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <Button
            type="primary"
            style={{ minWidth: "100px" }}
            onClick={() => setOpenModal(true)}
          >
            Add
          </Button>
        </div>
      </div>
      {
        getDepartment.length === 0 &&
        <div className="gx-pt-1 gx-pb-3">No Department Found!</div>
      }
      <Collapse accordion bordered={false} className="app-collaps" onChange={onChangeCollapse}>
        {getDepartment &&
          getDepartment.map((d, i) => {
            return (
              <Panel
                key={i}
                header={
                  <span>
                    {d.department} {d.count > 0 && (d.count)}
                  </span>
                }
                extra={genExtra(d)}
              >
                {
                  members.length === 0 && !memberLoader &&
                  <div className="gx-pt-1 gx-pb-3">No Member Found!</div>
                }
                {members && !memberLoader ?
                  members.map((m, i) => {
                    return (
                      <>
                        <div className="flex-x space-between align-center gx-pt-2 gx-pb-2">
                          <div>{`${m.firtsName} ${m.lastName}`}</div>
                          <div>
                            <Button
                              icon="edit"
                              type="primary"
                              size="small"
                              className="gx-mb-0"
                              onClick={() => openAssignmentHandler(m)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                        {i + 1 !== members.length && (
                          <Divider className="gx-mt-1 gx-mb-1" />
                        )}
                      </>
                    );
                  }): <div>
                    <Spin indicator={antIcon} />
                  </div>
                }
              </Panel>
            );
          })}
      </Collapse>
      <AddEditDepartmentModal
        title={edited ? "Edit Department" : "Add New Department"}
        visible={openModal}
        handleOk={createDepartmentHandler}
        handleCancel={() => setOpenModal(false)}
        edited={edited}
        createDepartmentLoader={createDepartmentLoader}
      />
      <AssignDepartment
        departments={departments}
        assignedMember={assignedMember}
        visible={assignModal}
        handleOk={() => setAssignModal(false)}
        handleCancel={() => setAssignModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    departments: state.common.departments,
    token: state.auth.authUser.tokens.accessToken,
  }
 };

 export default connect(mapStateToProps, {
  getDepartmentRequest,
 })(Department);
