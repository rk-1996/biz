import React, { useState, useEffect } from "react";
import { Form, Modal, Row, Col, Select, Button, Checkbox, Input } from "antd";
import { updateFedralDetail } from "services/people";
import { useSelector } from "react-redux";
const FormItem = Form.Item;
const { Option } = Select;

const EmployeeEditModal = ({ visible, handleOk, handleCancel, ...props }) => {
  const [loader, setLoader] = useState(false);
  const [isHouseHold, setIsHouseHold] = useState(false);
  const [isFieldDisable, setIsFieldDisable] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { fedral, token, params, updateSavedObj } = props;
  const { company, location } = useSelector(x => x.common.activeCompany);

  useEffect(() => {
    if (fedral) {
      setIsHouseHold(fedral.multipleJobs);
      setFieldsValue({
        federalFilingStatus: fedral.filingStatus,
        dependent: fedral.dependent,
        otherIncome: fedral.otherIncome,
        deduction: fedral.deduction,
        extraWithHolding: fedral.extraWithHolding,
      });
    }
  }, [fedral, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoader(true);
        const obj = {
          filingStatus: values.federalFilingStatus,
          multipleJobs: isHouseHold,
          otherIncome: values.otherIncome,
          deduction: values.deduction,
          dependent: Number(values.dependent),
          extraWithHolding: values.extraWithHolding,
        };
        const result = await updateFedralDetail(token, {
          ...obj,
          id: params.id,
        }, company, location);
        setLoader(false);
        if (result.status === 200) {
          updateSavedObj(result.data);
          handleCancel();
        }
      }
    });
  };

  const onChangeStatus = (event) => {
    if (event === "Exempt from Witholding") {
      setIsFieldDisable(true);
    } else {
      setIsFieldDisable(false);
    }
  };

  return (
    <Modal
      title="Edit Federal Taxes"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Federal Filing Status (1c)
            </div>
            <div className="gx-text-muted gx-pb-2">
              If you select Exempt from withholding, we won't withhold federal
              income taxes, but we'll still report taxable wages on a W-2. Keep
              in mind that anyone who claims exemption from withholding needs to
              submit a new W-4 each year.`
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem label="Filing Status" className="display-block">
              {getFieldDecorator("federalFilingStatus", {
                rules: [{ required: true, message: "Please select status!" }],
              })(
                <Select placeholder="Select Status" onChange={onChangeStatus}>
                  <Option value={"Single or Married Filing Seperatly"}>
                    Single or Married Filing Seperatly
                  </Option>
                  <Option value={"Married filing Jointly"}>
                    Married filing Jointly
                  </Option>
                  <Option value={"Head of Household"}>Head of Household</Option>
                  <Option value={"Exempt from Witholding"}>
                    Exempt from Witholding
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Multiple jobs (2c) (optional)
            </div>
            <div className="gx-text-muted gx-pb-2">
              Includes spouse (if applicable). Answering 2c results in higher
              withholding, but to preserve privacy, this can be left unchecked.
              To learn more, read the IRS’s instructions.
            </div>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Checkbox
                checked={isHouseHold}
                onChange={(e) => setIsHouseHold(e.target.checked)}
              >
                Household only has 2 Jobs Total
              </Checkbox>
            </Form.Item>
          </Col>
          {/* <Col span={8} xs={24} md={8}>
            <FormItem label="Multiple Jobs" className="display-block">
              {getFieldDecorator("multiple_jobs", {
                rules: [
                  { required: true, message: "Please input multiple jobs!" },
                ],
              })(<Input placeholder="Multiple Jobs" />)}
            </FormItem>
          </Col> */}
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Dependent total (3) (if applicable)
            </div>
            <div className="gx-text-muted gx-pb-2">
              Enter the results for line 3 from the IRS calculator or form W-4.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("dependent")(
                <Input
                  disabled={isFieldDisable}
                  style={{ width: "100%" }}
                  prefix="$"
                />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Other income (4a) (optional)
            </div>
            <div className="gx-text-muted gx-pb-2">
              Enter the results for line 4a from the IRS calculator or form W-4.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("otherIncome")(
                <Input
                  disabled={isFieldDisable}
                  style={{ width: "100%" }}
                  prefix="$"
                />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Deductions (4b) (optional)
            </div>
            <div className="gx-text-muted gx-pb-2">
              Enter the results for line 4b from the IRS calculator or form W-4.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("deduction")(
                <Input
                  disabled={isFieldDisable}
                  style={{ width: "100%" }}
                  prefix="$"
                />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Extra withholding (4c) (optional)
            </div>
            <div className="gx-text-muted gx-pb-2">
              Enter the results for line 4c from the IRS calculator or form W-4.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("extraWithHolding")(
                <Input
                  disabled={isFieldDisable}
                  style={{ width: "100%" }}
                  prefix="$"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div className="flex-x center gx-mt-4">
          <FormItem className="gx-m-0">
            <Button
              type="secondary"
              className="login-form-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              loading={loader}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

const WrappedModal = Form.create()(EmployeeEditModal);
export default WrappedModal;
