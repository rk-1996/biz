import React, { useEffect, useState } from "react";
import { Form, Modal, Row, Col, Input, InputNumber, Select, Button } from "antd";
import { updateStateDetail } from "services/people";
import { useSelector } from "react-redux";

const FormItem = Form.Item;
const { Option } = Select;

const StateTaxesModal = ({ visible, handleOk, handleCancel, ...props }) => {
  const [loader, setLoader] = useState(false);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { state, token, params, updateSavedObj } = props;
  const { company, location } = useSelector(x => x.common.activeCompany);

  useEffect(() => {
    if(state) {
      setFieldsValue({
        stateFilingStatus: state.filingStatus,
        withHoldingAllowances: state.withHoldingAllowances,
        extraWithHolding: state.extraWithHolding,
      });
    }
  }, [state, setFieldsValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async(err, values) => {
      if (!err) {
        setLoader(true);
        const obj = {
          filingStatus: values.stateFilingStatus,
          withHoldingAllowances: String(values.withHoldingAllowances),
          extraWithHolding: values.extraWithHolding,
        };
        const result = await updateStateDetail(token, {
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

  return (
    <Modal
      title="Edit State Taxes"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="hide-modal-footer"
    >
      <Form onSubmit={handleSubmit} className="gx-form-row0">
        <Row>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">State Filing Status</div>
            <div className="gx-text-muted gx-pb-2">
              The Head of Household status applies to unmarried individuals who
              have a relative living with them in their home. If unsure, read
              the CA Filing Status explanation.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("stateFilingStatus", {
                rules: [{ required: true, message: "Please select status!" }],
              })(
                <Select placeholder="Select Status">
                  <Option value={"Single or Married (with Two Incomes)"}>Single or Married (with Two Incomes)</Option>
                  <Option value={"Married (One Income)"}>Married (One Income)</Option>
                  <Option value={"Head of Household"}>Head of Household</Option>
                  <Option value={"Exempt from Witholding"}>Exempt from Witholding</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">Witholding Allowance</div>
            <div className="gx-text-muted gx-pb-2">
              This value is needed to calculate the employee's CA income tax
              withholding. It is often the same number as the federal
              withholding allowance. If unsure, use the CA DE-4 form to
              calculate the value manually.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("withHoldingAllowances", {
                rules: [
                  {
                    required: true,
                    message: "Please input witholding allowance!",
                  },
                ],
              })(<InputNumber style={{ width: "100%" }} />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <div className="gx-fs-xl gx-pt-3 gx-pb-3">
              Additional Witholding
            </div>
            <div className="gx-text-muted gx-pb-2">
              You can withhold an additional amount of California income taxes
              here.
            </div>
          </Col>
          <Col span={8} xs={24} md={24}>
            <FormItem className="display-block">
              {getFieldDecorator("extraWithHolding")(
                <Input
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

const WrappedModal = Form.create()(StateTaxesModal);
export default WrappedModal;
