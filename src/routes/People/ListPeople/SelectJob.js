import React, { useState } from 'react';
import {
    Select,
    Divider,
    Icon,
    message
} from "antd";
import { connect } from "react-redux";
import AddEditJobModal from "components/Settings/JobTitleDepartMent/Modals/AddEditJobModal";
import { createJob } from 'services/company';
import { getJobRequest } from 'appRedux/actions/Common';

const { Option } = Select;

const AddJob = ({ jobs, authUser, getJobRequest, activeCompany, selected, onChange }) => {
    const [openModal, setOpenModal] = useState(false);
    const [createJobLoader, setCreateJobLoader] = useState(false);

    const onChangeSelect = (e) => {
        onChange(e);
    }

    const createJobHandler = async (value) => {
        const params = {
            ...value,
            company: activeCompany
        }
        setCreateJobLoader(true);
        const result = await createJob(authUser.tokens.accessToken, params);
        setCreateJobLoader(false);
        if (result.status === 201) {
            const params = {
                company: activeCompany
            }
            getJobRequest(params);
            setOpenModal(false);
            message.success('Job is created!')
        }
    }

    return (
        <>
            <Select
                style={{ width: 120 }}
                // defaultValue={selected ? selected : null}
                placeholder="Select Jobs"
                onChange={onChangeSelect}
            //         dropdownRender={menu => (
            //             <div>
            //                 {menu}
            //                 <Divider style={{ margin: '4px 0' }} />
            //                 <div
            //                     style={{ padding: '4px 8px', cursor: 'pointer' }}
            //                     onMouseDown={e => e.preventDefault()}
            //                     onClick={() => setOpenModal(true)}
            //                 >
            //                     <Icon type="plus" /> Add Job
            //   </div>
            //             </div>
            //         )}
            >
                {
                    jobs && jobs.length ?
                        jobs.map((j, i) => {
                            return (
                                <Option value={j.jobTitle} key={i}>{j.jobTitle}</Option>
                            )
                        }) : ""
                }
            </Select>
            {/* <AddEditJobModal
                title="Add New Job"
                visible={openModal}
                handleOk={createJobHandler}
                handleCancel={() => setOpenModal(false)}
                createJobLoader={createJobLoader}
            /> */}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        jobs: state.common.jobs,
        activeCompany: state.common.activeCompany.company,
        authUser: state.auth.authUser
    }
};

export default connect(mapStateToProps, {
    getJobRequest
})(AddJob);
