import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Col, Row, Radio, Select } from "antd";
import stateList from "./../../util/State";
const FormItem = Form.Item;
const { Option } = Select;

const AddCompanyModal = ({
  visible,
  companies,
  handleOk,
  handleCancel,
  editedCompany,
  addCompanyHandler,
  addLocationHandler,
  editCompanyHandler,
  ...props
}) => {
  const [addType, setAddType] = useState('company');
  const { getFieldDecorator, setFieldsValue } = props.form;

  useEffect(() => {
    if(visible) {
      setFieldsValue({
        name: "",
        phone: "",
        street1: "",
        street2: "",
        state: "",
        city: "",
        zip: "",
        locationName: '',
        status: false,
        entity: null,
        ein: ""
      });
    }
  }, [setFieldsValue, visible])

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values);
        if(addType === 'company') {
          addCompanyHandler(values);
        } else {
          console.log('values', values);
          addLocationHandler(values);
        }
      }
    });
  };

  return (
    <Modal
      title={addType === 'company' ? "Add Company" : "Add Location"}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer company-add-modal"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={24} xs={24} md={24}>
            <Form.Item>
                <Radio.Group value={addType} onChange={(e) => setAddType(e.target.value)}>
                  <Radio value='company'>Add Company</Radio>
                  <Radio value='location'>Add Location</Radio>
                </Radio.Group>
            </Form.Item>
          </Col>
          {
            addType === 'company' ?
            <Col span={12} xs={24} md={12}>
              <FormItem label="Company Name" className="display-block">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your company name!",
                    },
                  ],
                })(<Input placeholder="Company Name" />)}
              </FormItem>
            </Col> :
            <>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Company" className="display-block">
                  {getFieldDecorator("company", {
                    rules: [
                      {
                        required: true,
                        message: "Please select company!",
                      },
                    ],
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Company"
                    >
                      {
                        companies && companies.length &&
                        companies.map((c,i) => {
                          return (
                            <Option value={c.cid} key={i}>
                              { c.name }
                            </Option>
                          )
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Location Name" className="display-block">
                  {getFieldDecorator("locationName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your location name!",
                      },
                    ],
                  })(<Input placeholder="Location Name" />)}
                </FormItem>
              </Col>
            </>
          }
          <Col span={12} xs={24} md={12}>
            <FormItem label="Phone Number" className="display-block">
              {getFieldDecorator("phone", {
                rules: [
                  { min: 10, message: "Min length 10 is required!" },
                  { max: 10, message: "Max length 10 is required!" },
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ],
              })(<Input type="text" placeholder="Phone Number" />)}
            </FormItem>
          </Col>
          {
            addType === 'company' &&
            <>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Entity Type" className="display-block">
                  {getFieldDecorator("entity")(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Entity-Type"
                    >
                      <Option value="C-Corp">C-Corp</Option>
                      <Option value="S-Corp">S-Corp</Option>
                      <Option value="LLC">LLC</Option>
                      <Option value="LLP">LLP</Option>
                      <Option value="Sole Proprietor">Sole Proprietor</Option>
                      <Option value="Partnership">Partnership</Option>
                      <Option value="Non-Profit">Non-Profit</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Federal EIN" className="display-block">
                  {getFieldDecorator("ein", {
                    rules: [
                      {
                        required: true,
                        message: "Please input EIN!",
                      },
                    ],
                  })(<Input type="text" placeholder="EIN" />)}
                </FormItem>
              </Col>
            </>
          }
          <Col span={24} className="gx-pt-2 gx-pb-2">
            Address:
          </Col>
          <Col span={24} className="gx-p-0">
            <Row>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Street 1" className="display-block">
                  {getFieldDecorator("street1", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your address street1!",
                      },
                    ],
                  })(<Input type="text" placeholder="Street 1" />)}
                </FormItem>
              </Col>
              <Col span={12} xs={24} md={12}>
                <FormItem label="Street 2" className="display-block">
                  {getFieldDecorator("street2")(
                    <Input type="text" placeholder="Street 2" />
                  )}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="City" className="display-block">
                  {getFieldDecorator("city", {
                    rules: [
                      { required: true, message: "Please input your city!" },
                    ],
                  })(<Input type="text" placeholder="City" />)}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="State" className="display-block">
                  {getFieldDecorator("state", {
                    rules: [
                      { required: true, message: "Please select your state!" },
                    ],
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="State"
                    >
                      {stateList.map((s, i) => {
                        return (
                          <Option key={i} value={s.abbreviation}>
                            {s.abbreviation}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} xs={24} md={8}>
                <FormItem label="Zip" className="display-block">
                  {getFieldDecorator("zip", {
                    rules: [
                      { min: 5, message: "Min length 5 is required!" },
                      { max: 5, message: "Max length 5 is required!" },
                      { required: true, message: "Please input your zip!" },
                    ],
                  })(<Input type="text" placeholder="Zip" />)}
                </FormItem>
              </Col>
              {editedCompany && (
                <Col span={8} xs={24} md={8}>
                  <Form.Item label="Status">
                    {getFieldDecorator("status")(
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>InActive</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <div className="flex-x center gx-pt-3">
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="gx-mb-0"
            >
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(AddCompanyModal);
export default WrappedModal;
