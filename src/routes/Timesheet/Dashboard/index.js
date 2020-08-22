import React, { Fragment } from "react";
import { DatePicker, Breadcrumb, Icon, Typography, Dropdown, Menu, Button, Input, Table } from "antd";
import Column from "antd/lib/table/Column";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const tableData = [
    {
        date: "Mon 04/06",
        wageRate: "$11",
        timeCard: "01:00pm - 05:00pm",
        jobTitle: "Manager",
        department: "Back",
        reg: "8",
        ot: "1.2",
        dot: "0",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "9.2",
        estWages: "$102.40"
    },
    {
        date: "Mon 04/06",
        wageRate: "$11",
        timeCard: "01:00pm - 05:00pm",
        jobTitle: "Manager",
        department: "Back",
        reg: "8",
        ot: "0",
        dot: "0",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "8",
        estWages: "$88"
    },
    {
        date: "Mon 04/06",
        wageRate: "$11",
        timeCard: "01:00pm - 05:00pm",
        jobTitle: "Manager",
        department: "Back",
        reg: "6",
        ot: "0",
        dot: "0",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "6",
        estWages: "$66"
    },
    {
        date: "Mon 04/06",
        wageRate: "$11",
        timeCard: "01:00pm - 05:00pm",
        jobTitle: "Manager",
        department: "Back",
        reg: "4",
        ot: "0",
        dot: "0",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "4",
        estWages: "$44"
    },
    {
        date: "Total",
        reg: "26",
        ot: "1.2",
        dot: "0",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "27.2",
        estWages: "$300.40"
    }
];

const index = (props) => {
    const handleMenuClick = value => {

    };

    const menu = () => (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Departments</Menu.Item>
            <Menu.Item key="2">Value - 1</Menu.Item>
            <Menu.Item key="3">Value - 2</Menu.Item>
        </Menu>
    );

    return (
        <Fragment>
            <div className="gx-mb-10">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <span className="gx-link">
                            <Icon type="home" />
                        </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="gx-link">
                            <span>TIME SHEET</span>
                        </span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <Title level={3}>April 6th 2020 - April 8th 2020</Title>
                <div className="flex-x align-center filter-wrapper">
                    <div className="flex-1 flex-x">
                        <div className="arrow-btn flex-x center gx-mr-1 cursor-pointer">
                            <Icon type="left" />
                        </div>
                        <div className="date-picker-wrapper">
                            <RangePicker />
                        </div>
                        <div className="arrow-btn flex-x center gx-ml-1 cursor-pointer">
                            <Icon type="right" />
                        </div>
                    </div>
                    <div className="flex-x align-center">
                        <div className="gx-mr-2 search-box-wrapper">
                            <Input placeholder="Search" prefix={<Icon type="search" style={{ color: "#252733" }} />} />
                        </div>
                        <div className="flex-x center combo-box-1 gx-mr-2">
                            <div className="flex-1 flex-x center active cursor-pointer">
                                <Icon type="pause" rotate="90" style={{ fontSize: "16px", color: "#fff" }} />
                            </div>
                            <div className="flex-1 flex-x center cursor-pointer">
                                <Icon type="barcode" style={{ fontSize: "16px", color: "#303030" }} />
                            </div>
                        </div>
                        <div className="flex-x center combo-box-1 gx-mr-2">
                            <div className="flex-1 flex-x center active cursor-pointer">
                                <Icon type="user" style={{ fontSize: "16px", color: "#fff" }} />
                            </div>
                            <div className="flex-1 flex-x center cursor-pointer">
                                <Icon type="calendar" style={{ fontSize: "16px", color: "#303030" }} />
                            </div>
                        </div>
                        <div className="gx-mr-2 department-drp">
                            <Dropdown overlay={menu}>
                                <Button>
                                    Departments <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="setting-wrapper flex-x center gx-mr-2 cursor-pointer">
                            <Icon type="database" rotate="90" style={{ fontSize: "16px", color: "#757575" }} />
                        </div>
                        <div className="setting-wrapper flex-x center cursor-pointer">
                            <Icon type="setting" style={{ fontSize: "16px", color: "#757575"  }} />
                        </div>
                    </div>
                </div>

                <div className="gx-mt-4 summary-wrapper">
                    <span>Total Paid Hours: &nbsp;81.6 </span>
                    <span>Estimated Wages: &nbsp;$917.40</span>
                </div>
                {
                    Array(3).fill(3).map(x => (
                        <div className="table-card">
                            <div className="flex-x align-center table-wrapper">
                                <div className="flex-1">
                                    <Title level={4} className="gx-mb-0">Jason Bourne</Title>
                                </div>
                                <div className="flex-x center cursor-pointer">
                                    <Icon type="plus" style={{ color: "#fff" }} />
                                </div>
                            </div>
                            <div className="table-container">
                                <Table dataSource={tableData} pagination={false} bordered>
                                    <Column align="center" title="Date" dataIndex="date" key="date" />
                                    <Column align="center" title="Wage Rate" dataIndex="wageRate" key="wageRate" />
                                    <Column align="center" title="Time Card" dataIndex="timeCard" key="timeCard" />
                                    <Column align="center" title="Job Title" dataIndex="jobTitle" key="jobTitle" />
                                    <Column align="center" title="Department" dataIndex="department" key="department" />
                                    <Column align="center" title="REG" dataIndex="reg" key="reg" />
                                    <Column align="center" title="OT" dataIndex="ot" key="ot" />
                                    <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                                    <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                                    <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                                    <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                                    <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" />
                                    <Column
                                        align="center"
                                        title="Actions"
                                        dataIndex="actions"
                                        key="actions"
                                        render={(value, record) => (
                                            record.date !== "Total" &&
                                            <Fragment>
                                                <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} />
                                                <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} />
                                                <Icon className="cursor-pointer" type="delete" style={{ fontSize: "18px", color: "#757575" }} />
                                            </Fragment>
                                        )}
                                    />
                                </Table>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    );
};

export default index;
