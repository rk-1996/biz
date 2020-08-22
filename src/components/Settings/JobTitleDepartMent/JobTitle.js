import React, { useState, useEffect, useMemo } from "react";
import { Collapse, Button, Input, Icon, Menu, Dropdown, Divider, message, Spin } from "antd";
import AddEditJobModal from "./Modals/AddEditJobModal";
import AssignJobTitle from "./Modals/AssignJobTitle";
import {connect} from "react-redux";
import { getJobRequest } from 'appRedux/actions/Common';
import { createJob, getJobMember } from './../../../services/company';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
const { Panel } = Collapse;
const { Search } = Input;

// const Jobs = [
//   {
//     name: "Server",
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
//     name: "Manager",
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
//     name: "Director",
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
//     name: "Owner",
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

// const members = [
//   {
//     id: 1,
//     firstName: "Mitul",
//     lastName: "Patel",
//   },
//   {
//     id: 1,
//     firstName: "Shekhar",
//     lastName: "Raval",
//   },
// ];

const JobTitle = (props) => {
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [edited, setedited] = useState(null);
  const [assignModal, setAssignModal] = useState(false);
  const [assignedMember, setAssignedMember] = useState(null);
  const [createJobLoader, setCreateJobLoader] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberLoader, setMemberLoader] = useState(false);

  const { getJobRequest, activeCompany, jobs, token } = props;

  useEffect(() => {
    const params = {
      company: activeCompany
    }
    getJobRequest(params);
  }, [getJobRequest, activeCompany]);

  useEffect(() => {
    if (!openModal) {
      setedited(null);
    }
  }, [openModal]);
  console.log('jobs', jobs)
  const getJobs = useMemo(() => {
    return jobs.filter(a => a.jobTitle && a.jobTitle.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, jobs])

  const editJobHandler = (value) => {
    setedited(value);
    setOpenModal(true);
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

  const openAssignmentHandler = (member) => {
    setAssignedMember(member);
    setAssignModal(true);
  };

  const createJobHandler = async (value) => {
    const params = {
      ...value,
      company: activeCompany
    }
    setCreateJobLoader(true);
    const result = await createJob(token, params);
    setCreateJobLoader(false);
    if(result.status === 201) {
      getJobRequest({company: activeCompany});
      setOpenModal(false);
      message.success('Job is created!')
    }
  }

  const onChangeCollapse = async (e) => {
    if(getJobs[e]) {
      const params = {
        id: getJobs[e].id
      }
      setMemberLoader(true);
      const result = await getJobMember(token, params);
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
            placeholder="Search Jobs"
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
        getJobs.length === 0 &&
        <div className="gx-pt-1 gx-pb-3">No Jobs Found!</div>
      }
      <Collapse accordion bordered={false} className="app-collaps" onChange={onChangeCollapse}>
        {getJobs &&
          getJobs.map((j, i) => {
            return (
              <Panel
                key={i}
                header={
                  <span>
                    {j.jobTitle} {j.count > 0 && (j.count)}
                  </span>
                }
                extra={genExtra(j)}
              >
                {
                  members.length === 0 && !memberLoader &&
                  <div className="gx-pt-1 gx-pb-3">No Member Found!</div>
                }
                {members && !memberLoader ?
                  members.map((m, i) => {
                    return (
                      <div key={i}>
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
                      </div>
                    );
                  }) : <div>
                    <Spin indicator={antIcon} />
                  </div>
                }
              </Panel>
            );
          })}
      </Collapse>
      <AddEditJobModal
        title={edited ? "Edit Job" : "Add New Job"}
        visible={openModal}
        handleOk={createJobHandler}
        handleCancel={() => setOpenModal(false)}
        edited={edited}
        createJobLoader={createJobLoader}
      />
      <AssignJobTitle
        Jobs={jobs}
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
    jobs: state.common.jobs,
    token: state.auth.authUser.tokens.accessToken,
  }
 };

 export default connect(mapStateToProps, {
  getJobRequest,
 })(JobTitle);
