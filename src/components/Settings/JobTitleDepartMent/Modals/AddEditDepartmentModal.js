import React from "react";
import { Modal, Button, Form, Input } from "antd";
const FormItem = Form.Item;

const AddEditDepartmentModal = ({
  visible,
  handleOk,
  handleCancel,
  edited,
  title,
  createDepartmentLoader,
  ...props
}) => {
  const { getFieldDecorator } = props.form;

  // useEffect(() => {
  //   if (editedCompany) {
  //     setFieldsValue({
  //       name: editedCompany.name,
  //       phone: editedCompany.phone,
  //       street1: editedCompany.address.street1,
  //       street2: editedCompany.address.street2,
  //       state: editedCompany.address.state,
  //       city: editedCompany.address.city,
  //       zip: editedCompany.address.zip,
  //       status: editedCompany.active
  //     });
  //   } else {
  //     setFieldsValue({
  //       name: "",
  //       phone: "",
  //       street1: "",
  //       street2: "",
  //       state: "",
  //       city: "",
  //       zip: "",
  //     });
  //   }
  // }, [editedCompany, setFieldsValue]);

  const handleSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        handleOk(values);
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
      width={300}
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <FormItem label="Department" className="display-block">
          {getFieldDecorator("department", {
            rules: [
              {
                required: true,
                message: "Please input department name!",
              },
            ],
          })(<Input placeholder="Department Name" />)}
        </FormItem>
        <div className="flex-x center gx-pt-2">
          <FormItem className="gx-mb-0">
            <Button loading={createDepartmentLoader} type="primary" htmlType="submit" className="gx-mb-0">
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(AddEditDepartmentModal);
export default WrappedModal;
