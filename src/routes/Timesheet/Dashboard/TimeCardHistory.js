import React, { Fragment, useEffect, useState } from "react";
import { DatePicker, Breadcrumb, Card, Icon, Typography, TimePicker, Modal, Tabs, Row, Col, Dropdown, Menu, Button, Input, Form, Table } from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const TimeCard = (props) => {
    let { closeFun } = props

    let closePopUp = (e) => {
        closeFun()
    }

    return (
        <Row>

            <ul class="events">
                <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                        <div className="flex-x center justify-content-space-between">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x title-history">
                                Clockin/Out
                                            </div>
                            <div className="flex-x date-history">
                                07/07/2020 @10:29pm
                                            </div>
                            {/* </FormItem> */}
                        </div>
                        <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Clock In
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Clock Out
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Employee
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Jhon watson
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x ml-35px date-history font-weight-normal">
                                    Note
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    I actually clocked in at 10am
                                                </div>

                            </div>
                        </Card>
                    </div>
                </li>
                <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                        <div className="flex-x center justify-content-space-between">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x title-history">
                                Break
                                            </div>
                            <div className="flex-x date-history">
                                07/07/2020 @10:29pm
                                            </div>
                            {/* </FormItem> */}
                        </div>
                        <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Break start
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Break end
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Break type
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Unpaid
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x ml-35px date-history font-weight-normal">
                                    Employee
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    John wetson
                                                </div>

                            </div>
                        </Card>
                    </div>
                </li>
                <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                        <div className="flex-x center justify-content-space-between">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x title-history">
                                Edit clockin/out
                                            </div>
                            <div className="flex-x date-history">
                                07/07/2020 @10:29pm
                                            </div>
                            {/* </FormItem> */}
                        </div>
                        <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Clock in
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Clock out
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Editor
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Sherlock holmes
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x ml-35px date-history font-weight-normal">
                                    Reason for edit
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Correction
                                                </div>

                            </div>
                        </Card>
                    </div>
                </li>
                <li>
                    <time datetime="10:03"></time>
                    <div className='add-line'>

                        <div className="flex-x center justify-content-space-between">
                            {/* <FormItem className="gx-m-0"> */}
                            <div className="flex-x title-history">
                                Edit break
                                            </div>
                            <div className="flex-x date-history">
                                07/07/2020 @10:29pm
                                            </div>
                            {/* </FormItem> */}
                        </div>
                        <Card style={{ width: `100%`, marginTop: `6px`, marginBottom: '0px', padding: `0 0 0 0` }}>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Break start
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Break end
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x ml-35px date-history font-weight-normal">
                                    Editor
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Sherlock holmes
                                                </div>

                            </div>
                            <div className="flex-x center justify-content-right mb-10px">
                                <div className="flex-x date-history ml-35px font-weight-normal">
                                    Edit break
                                                </div>
                                <div className="flex-x ml-20px title-history font-weight-normal">
                                    Tuesday, Jul 7, 2020 at 10:29am
                                                </div>

                            </div>
                        </Card>
                    </div>
                </li>
            </ul>
            <div className="flex-x center gx-mt-4 justify-content-space-between button-style">
                {/* <FormItem className="gx-m-0"> */}
                <div className="flex-x">
                    <Button
                        // loading={loader}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button button-close-history-model"
                        onClick={closePopUp}
                    >
                        Close
            </Button>
                </div>
                {/* </FormItem> */}
            </div>
        </Row>
    )
}

export default TimeCard