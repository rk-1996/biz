import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker, Row, Col, Input, Select, Button } from "antd";
import moment from 'moment';
import { updateEmploymentDetail } from 'services/people';
import SelectJob from 'components/Common/SelectJob';


const FormItem = Form.Item;
const { Option } = Select;

const AddAdditionalLocationEmployee = ({ onFinish, jobs, setFormTab, onCompleteDetail, setDisplayModalAddLocation, activeCompany, ...props }) => {
    const [loader, setLoader] = useState(false);
    const { getFieldDecorator, setFieldsValue } = props.form;
    const { token, params, updateSavedObj } = props;
    const [loaderChangeStatus, setLoaderChangeStatus] = useState(false)

    // useEffect(() => {
    //     if (employmentDetails) {
    //         setFieldsValue({
    //             pin: employmentDetails.pin,
    //             manager: employmentDetails.manager,
    //             startDate: moment(employmentDetails.startDate),
    //             employmentClass: employmentDetails.type,
    //             role: employmentDetails.role
    //         });s
    //     }
    // }, [employmentDetails, setFieldsValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                // loaderAddLocation(true);
                // const obj = {
                //     pin: values.pin,
                //     manager: values.manager,
                //     startDate: moment(values.startDate),
                //     type: values.employmentClass,
                //     company: activeCompany.company,
                //     location: activeCompany.location,
                //     role: values.role
                // }
                // const result = await updateEmploymentDetail(token, { ...obj, id: params.id });
                // loaderAddLocation(false);
                // if (result.status === 200) {
                //   updateSavedObj(result.data);
                //   handleCancel();
                // }
                onFinish({ ...values });
                // setFormTab("3");
            } else {
                console.log(err)
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="gx-form-row0">
            <Row>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Job Title" className="display-block">
                        {getFieldDecorator("jobTitle", {
                            rules: [{ required: true, message: "Please input job title!" }],
                        })(
                            <SelectJob onChange={(e) => {
                                setFieldsValue({
                                    jobTitle: e
                                })
                            }} />
                        )}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Effective Date" className="display-block">
                        {getFieldDecorator("effectiveDate", {
                            rules: [
                                { required: true, message: "Please select effective date!" },
                            ],
                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Employment Type" className="display-block">
                        {getFieldDecorator("type", {
                            rules: [
                                { required: true, message: "Please input employment type!" },
                            ],
                        })(
                            <Select placeholder="Select Type">
                                <Option value="Salary/No Overtime">Salary/No Overtime</Option>
                                <Option value=" Salary/Eligible for overtime">
                                    {" "}
                    Salary/Eligible for Overtime
                  </Option>
                                <Option value="Hourly">Hourly</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Wage" className="display-block">
                        {getFieldDecorator("rate", {
                            rules: [{ required: true, message: "Please input wage!" }],
                        })(<Input style={{ width: "100%" }} prefix="$" />)}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Per" className="display-block">
                        {getFieldDecorator("per", {
                            rules: [{ required: true, message: "Please input per!" }],
                        })(
                            <Select placeholder="Select per">
                                <Option value="Hour">Hour</Option>
                                <Option value="Week">Week</Option>
                                <Option value="Month">Month</Option>
                                <Option value="Year">Year</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Default Hours" className="display-block">
                        {getFieldDecorator("defaultHours")(
                            <Input type="text" placeholder="Default Hours" />
                        )}
                    </FormItem>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <FormItem label="Reason for Change" className="display-block">
                        {getFieldDecorator("reasonofChange", {
                            rules: [{ required: true, message: "Please input reason!" }],
                        })(<Input type="text" placeholder="Reason" />)}
                    </FormItem>
                </Col>
            </Row>
            <div className="flex-x center gx-mt-4">
                <FormItem className="gx-m-0">
                    <Button
                        type="secondary"
                        className="login-form-button"
                        onClick={() => { setDisplayModalAddLocation(false) }}
                    >
                        Cancel
            </Button>
                    <Button
                        loading={loaderChangeStatus}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Save
            </Button>
                </FormItem>
            </div>
        </Form>
    );
};

const WrappedModal = Form.create()(AddAdditionalLocationEmployee);
export default WrappedModal;
