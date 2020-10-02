import React from "react";
import { Modal, Button, Form, Input } from "antd";
const FormItem = Form.Item;

const AddEditJobModal = ({
  visible,
  handleOk,
  handleCancel,
  edited,
  title,
  createJobLoader,
  ...props
}) => {
  const { getFieldDecorator, setFieldsValue } = props.form;

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

  const handleSubmitJobModel = (e) => {
    e.stopPropagation()
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        handleOk(values);
        setFieldsValue({
          jobTitle: "",
        })
      }
    });
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={handleCancel}
      className="hide-modal-footer"
      width={300}
    >
      <Form onSubmit={handleSubmitJobModel} className="gx-form-row0">
        <FormItem label="Job Title" className="display-block">
          {getFieldDecorator("jobTitle", {
            rules: [
              {
                required: true,
                message: "Please input job name!",
              },
            ],
          })(<Input placeholder="Job Name" />)}
        </FormItem>
        <div className="flex-x center gx-pt-2">
          <FormItem className="gx-mb-0">
            <Button loading={createJobLoader} type="primary" htmlType="submit" className="gx-mb-0">
              Submit
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(AddEditJobModal);
export default WrappedModal;
