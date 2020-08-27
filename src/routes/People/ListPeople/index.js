import React, { useState, useMemo, useEffect } from "react";
import {
  Breadcrumb,
  Icon,
  Tabs,
  Card,
  Table,
  Tooltip,
  Button,
  Input,
  Popconfirm,
  Checkbox,
  message
} from "antd";
import { connect, useSelector } from "react-redux";
import ChooseEmployeeModal from "components/People/ChooseEmployeeModal";
import { getPeopleRequest } from "appRedux/actions/People";
import AppLoader from "components/Common/AppLoader";
import { mobileFormat } from 'util/constant';
import { dissmissedPeople } from 'services/people';

const TabPane = Tabs.TabPane;
const { Search } = Input;

const ListPeople = (props) => {
  const [dissmissed, setDissmissed] = useState(false);
  const [status, setStatus] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { company, location } = useSelector(x => x.common.activeCompany);

  const {
    getPeopleRequest,
    activeCompany,
    people = [],
    loader = false,
    token,
    companies,
    activeLocation
  } = props;

  useEffect(() => {
    const getCompany = companies.find(a => a.cid === activeCompany);
    if (getCompany && getCompany.locations && getCompany.locations.length && getCompany.locations[0]) {
      const getLocationId = activeLocation ? activeLocation : getCompany.locations[0].lid
      const obj = {
        company: activeCompany,
        dissmissed: false,
        location: getLocationId
      };
      getPeopleRequest(obj);
    } else {
      message.error('No Location found!');
    }
  }, [activeCompany, getPeopleRequest, companies, activeLocation]);

  const getPeopleWithKey = useMemo(() => {
    if (people.length) {
      return people.map((p) => {
        return {
          ...p,
          key: p.id,
        };
      });
    }
    return [];
  }, [people]);

  const viewPeopleDetail = (people) => {
    if (people.type === "employee") {
      props.history.push(`people/view-employee/${people.eid}`);
    } else {
      props.history.push(`people/view-contractor/${people.cnid}`);
    }
  };

  const dissmissPeopleHandler = async (people) => {
    const obj = {
      id: null,
      dismiss: false,
      companyId: company,
      locationId: location,
      type: people.type
    }
    if (people.type === 'employee') {
      obj['id'] = people.eid
    } else {
      obj['id'] = people.cnid
    }
    const result = await dissmissedPeople(token, obj);
    if (result.status === 200) {
      const obj = {
        company: activeCompany,
        location: activeLocation,
        dissmissed: false,
      };
      getPeopleRequest(obj);
    }
  }

  const columns = [
    {
      title: "Full name and email",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => (
        <span>
          <div>
            <div
              className="cursor-pointer gx-link"
              onClick={() =>
                viewPeopleDetail(record)
              }
            >
              {
                record.type === "contractor" ?
                  <div>
                    {
                      record.businessName && record.businessName !== '' ?
                        <span>{`${record.hasOwnProperty('businessName') ? record.businessName : ""}`}</span> :
                        <span>{`${record.hasOwnProperty('firstName') ? record.firstName : ""} ${record.hasOwnProperty('lastName') ? record.lastName : ""}`}</span>
                    }
                  </div> :
                  <div>
                    {`${record.hasOwnProperty('firstName') ? record.firstName : ""} ${record.hasOwnProperty('lastName') ? record.lastName : ""}`}
                  </div>
              }
            </div>
          </div>
          <div className="gx-text-grey gx-mt-1">{record.email}</div>
        </span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text, record) => (
        <span>{mobileFormat(text)}</span>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Location",
      dataIndex: "type",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => <span>{status !== 4 ? "Active" : "Dismissed"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip placement="top" title="View Detail">
            <Button
              size="small"
              className="gx-mb-0"
              onClick={() => viewPeopleDetail(record)}
            >
              <Icon type="eye" className="cursor-pointer" />
            </Button>
          </Tooltip>
          {
            status !== 4 ?
              <Tooltip placement="top" title="Dismiss People">
                <Popconfirm placement="topLeft" title={'Are you sure to dismiss ?'} onConfirm={() => dissmissPeopleHandler(record)} okText="Yes" cancelText="No">
                  <Button size="small" className="gx-mb-0" type="danger">
                    <Icon type="delete" className="cursor-pointer" />
                  </Button>
                </Popconfirm>
              </Tooltip> :
              <Tooltip placement="top" title="Active People">
                <Popconfirm placement="topLeft" title={'Are you sure to Active ?'} onConfirm={() => dissmissPeopleHandler(record)} okText="Yes" cancelText="No">
                  <Button size="small" className="gx-mb-0" type="primary">
                    <Icon type="rollback" className="cursor-pointer" />
                  </Button>
                </Popconfirm>
              </Tooltip>
          }
        </span>
      ),
    },
  ];

  const getPeople = useMemo(() => {
    if (status === 2) {
      return getPeopleWithKey.filter(
        (a) =>
          a.type === "employee" &&
          ((a.firstName && a.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
            a.email.toLowerCase().includes(searchText.toLowerCase()) ||
            (a.lastName && a.lastName.toLowerCase().includes(searchText.toLowerCase())))
      );
    } else if (status === 3) {
      return getPeopleWithKey.filter(
        (a) =>
          a.type === "contractor" &&
          ((a.firstName && a.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
            a.email.toLowerCase().includes(searchText.toLowerCase()) ||
            (a.lastName && a.lastName.toLowerCase().includes(searchText.toLowerCase())))
      );
    } else if (status === 4) {
      return getPeopleWithKey.filter(
        (a) =>
          ((a.firstName && a.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
            a.email.toLowerCase().includes(searchText.toLowerCase()) ||
            (a.lastName && a.lastName.toLowerCase().includes(searchText.toLowerCase())))
      );
    }
    return getPeopleWithKey.filter(
      (a) =>
        ((a.firstName && a.firstName.toLowerCase().includes(searchText.toLowerCase())) ||
          a.email.toLowerCase().includes(searchText.toLowerCase()) ||
          (a.lastName && a.lastName.toLowerCase().includes(searchText.toLowerCase())))
    );
  }, [status, searchText, getPeopleWithKey]);

  const onChangePeopleTab = (key) => {
    const getCompany = companies.find(a => a.cid === activeCompany);
    let locationId = activeLocation ? activeLocation : getCompany.locations[0].lid
    if (Number(key) === 4) {
      const obj = {
        company: activeCompany,
        dissmissed: true,
        location: locationId
      };
      getPeopleRequest(obj);
    } else {
      const obj = {
        company: activeCompany,
        dissmissed: false,
        location: locationId
      };
      getPeopleRequest(obj);
    }
    setStatus(Number(key));
  };

  // const activeCompanyDetails = useMemo(() => {
  //   return companies.find(a => a.cid === activeCompany)
  // }, [companies, activeCompany]);

  // const handleChangeLocation = (e) => {
  //   setActiveLodation(e);
  //   const obj = {
  //     company: activeCompany,
  //     location: e,
  //     dissmissed: false,
  //   };
  //   getPeopleRequest(obj);
  // }

  return (
    <div>
      {loader && <AppLoader />}
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>People List</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="People">
        <Tabs onChange={onChangePeopleTab}>
          <TabPane tab="ALL" key={1}></TabPane>
          <TabPane tab="EMPLOYEES" key={2}></TabPane>
          <TabPane tab="CONTRACTORS" key={3}></TabPane>
          <TabPane tab="DISMISSED" key={4}></TabPane>
        </Tabs>
        <div className="flex-x align-center table-search-section">
          <div>
            <Search
              value={searchText}
              placeholder="Search People"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
          <div className="flex-1 gx-mb-3 gx-ml-4">
            <Checkbox checked={dissmissed} onChange={(e) => setDissmissed(e.target.checked)}>Show Dismissed</Checkbox>
          </div>
          {/* {
            activeCompanyDetails &&  activeCompanyDetails.locations[0] && activeCompanyDetails.locations.length &&
            <div className="gx-mb-3 gx-mr-4">
              <Select
                style={{ width: 150 }}
                placeholder="Select Location"
                defaultValue={(activeCompanyDetails.locations && activeCompanyDetails.locations.length) ? activeCompanyDetails.locations[0].lid : ''}
                onChange={handleChangeLocation}
              >
                {
                  activeCompanyDetails && activeCompanyDetails.locations && activeCompanyDetails.locations.length ?
                  activeCompanyDetails.locations.map((c,i) => {
                    return (
                      <Option value={c.lid}>{c.name}</Option>
                    )
                  }) : ""
                }
              </Select>
            </div>
          } */}
          <div>
            <Button
              type="primary"
              style={{ minWidth: "100px" }}
              onClick={() => setOpenModal(true)}
            >
              Add
            </Button>
          </div>
        </div>
        {getPeople && (
          <div>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={getPeople}
            />
          </div>
        )}
      </Card>
      <ChooseEmployeeModal
        visible={openModal}
        handleOk={() => setOpenModal(false)}
        handleCancel={() => setOpenModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location,
    companies: state.common.companies,
    people: state.people.people,
    loader: state.people.loader,
    token: state.auth.authUser && state.auth.authUser.tokens.accessToken
  };
};

export default connect(mapStateToProps, {
  getPeopleRequest,
})(ListPeople);
