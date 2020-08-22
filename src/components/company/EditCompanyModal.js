import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Col, Row, Select } from "antd";
import stateList from "../../util/State";
const FormItem = Form.Item;
const { Option } = Select;

const EditCompanyModal = ({
  visible,
  handleOk,
  handleCancel,
  editedCompany,
  editCompanyHandler,
  editLocationHandler,
  editType = 'company',
  loading,
  ...props
}) => {
  const { getFieldDecorator, setFieldsValue } = props.form;

  useEffect(() => {
    if (editedCompany) {
      setFieldsValue({
        name: editedCompany.name,
        locationName: editedCompany.name,
        phone: editedCompany.phone,
        street1: editedCompany.address.street1,
        street2: editedCompany.address.street2,
        state: editedCompany.address.state,
        city: editedCompany.address.city,
        zip: editedCompany.address.zip,
        status: editedCompany.active,
        entity: editedCompany.entity,
        ein: editedCompany.ein
      });
    } else {
      setFieldsValue({
        name: "",
        phone: "",
        street1: "",
        street2: "",
        state: "",
        city: "",
        zip: "",
      });
    }
  }, [editedCompany, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (editType === "company") {
          editCompanyHandler(values);
        } else {
          editLocationHandler(values);
        }
      }
    });
  };

  return (
    <Modal
      title={editType === 'company' ? "Edit Company" : "Edit Location"}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer company-add-modal"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          {
            editType === 'company' ?
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
          }
          {
            editType === 'company' &&
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
                      // { min: 5, message: "Min length 5 is required!" },
                      // { max: 5, message: "Max length 5 is required!" },
                      { required: true, message: "Please input your zip!" },
                    ],
                  })(<Input type="text" placeholder="Zip" />)}
                </FormItem>
              </Col>
              {/* {editedCompany && (
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
              )} */}
            </Row>
          </Col>
        </Row>
        <div className="flex-x center gx-pt-3">
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="gx-mb-0"
              loading={loading}
            >
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(EditCompanyModal);
export default WrappedModal;
