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
} from "antd";
import {connect} from "react-redux";
import AddCompanyModal from "../../../components/company/AddCompanyModal";
import {
  createCompanyRequest,
  updateCompanyRequest,
  getCompanyRequest,
  createLocationRequest,
  deleteCompanyRequest
} from 'appRedux/actions/Company';
import AppLoader from 'components/Common/AppLoader';

const TabPane = Tabs.TabPane;
const { Search } = Input;

const Companies = (props) => {
  const [status, setStatus] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);

  const {
    createCompanyRequest,
    updateCompanyRequest,
    getCompanyRequest,
    createLocationRequest,
    deleteCompanyRequest,
    companies,
    loader,
    history
  }  = props;

  useEffect(() => {
    const obj = {
      page: 1,
      active: 'all'
    }
    getCompanyRequest(obj)
  }, [getCompanyRequest]);

  useEffect(() => {
    if (editedCompany) {
      setOpenModal(true);
    }
  }, [editedCompany]);

  // const setEditedComanyHandler = (record) => {
  //   setEditedCompany(record);
  // };

  const modalCloseHandler = () => {
    setOpenModal(false);
    setEditedCompany(null);
  };

  const deleteCompany = (info) => {
    deleteCompanyRequest({ id: info.cid })
  }

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="gx-link">{text}</span>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 300,
      render: (text, record) => <span>
        {`${text.street1} ${text.street2 ? text.street2 : ""}, ${text.city}, ${text.state}, ${text.zip}`}
      </span>,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => <span>{text ? "Active" : "InActive"}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {
            record.hasOwnProperty('type') &&
            <>
              <Tooltip placement="top" title="View Company">
                <Button
                  size="small"
                  className="gx-mb-0"
                  onClick={() => history.push(`/superadmin/viewcompany/${record.cid}`)}
                >
                  <Icon type="eye" className="cursor-pointer" />
                </Button>
              </Tooltip>
            <Tooltip placement="top" title="Delete Company">
              <Button
                type="danger"
                size="small"
                className="gx-mb-0"
                onClick={() => deleteCompany(record)}
              >
                <Icon type="delete" className="cursor-pointer" />
              </Button>
            </Tooltip>
          </>
          }
          {/* <Tooltip placement="top" title="Edit Company">
            <Button
              size="small"
              className="gx-mb-0"
              onClick={() => setEditedCompanyHandler(record)}
            >
              <Icon type="edit" className="cursor-pointer" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title={record.active ? 'Make Inactive' : 'Make Active'}>
            {
              record.active ?
              <Button size="small" className="gx-mb-0" type="primary" onClick={() => makeActiveHandler(record, false)}>
                <Icon type="delete" className="cursor-pointer" />
              </Button> :
              <Button size="small" className="gx-mb-0" type="danger" onClick={() => makeActiveHandler(record, true)}>
                <Icon type="delete" className="cursor-pointer" />
              </Button>
            }
          </Tooltip> */}
        </span>
      ),
    },
  ];

  const getFormatedCompany = useMemo(() => {
    return companies.map((c, i) => {
      return {
        key: i + 1,
        cid: c.cid,
        name: c.name,
        phone: c.phone,
        active: c.active,
        address: c.address,
        children: c.locations[0] ? c.locations : null,
        type: 'company'
      }
    })
  }, [companies])

  const getCompanies = useMemo(() => {
    if (status === 2) {
      return getFormatedCompany.filter(
        (a) =>
          a.active &&
          a.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (status === 3) {
      return getFormatedCompany.filter(
        (a) =>
          !a.active &&
          a.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return getFormatedCompany.filter((a) =>
      a.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [status, searchText, getFormatedCompany]);

  const onChangeCompanyStatus = (key) => {
    setStatus(Number(key));
  };

  const addCompanyHandler = (values) => {
    const companyCreateObj = {
      name: values.name,
      phone: Number(values.phone),
      ein: values.ein,
      entity: values.entity,
      address: {
        state: values.state,
        city: values.city,
        zip: Number(values.zip),
        street1: values.street1,
        street2: values.street2
      }
    }
    createCompanyRequest(companyCreateObj);
    setOpenModal(false);
  };

  const addLocationHandler = (values) => {
    const companyLocationObj = {
      name: values.locationName,
      phone: Number(values.phone),
      address: {
        state: values.state,
        city: values.city,
        zip: Number(values.zip),
        street1: values.street1,
        street2: values.street2
      },
      company: values.company
    }
    createLocationRequest(companyLocationObj);
    setOpenModal(false);
  }

  const editCompanyHandler = (values) => {
    const companyCreateObj = {
      id: editedCompany.id,
      name: values.name,
      phone: values.phone,
      address: {
        state: values.state,
        city: values.city,
        zip: values.zip,
        street1: values.street1,
        street2: values.street2
      },
      active: values.status,
    }
    updateCompanyRequest(companyCreateObj)
    setOpenModal(false);
  };

  // const makeActiveHandler = (record, active) => {
  //   const updateObj = {
  //     ...record,
  //     active: active,
  //   }
  //   updateCompanyRequest(updateObj)
  // }

  return (
    <div>
      {
        loader &&
        <AppLoader/>
      }
      <div className="gx-mb-30">
        <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Super Admin</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Company List</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Companies">
        <Tabs onChange={onChangeCompanyStatus}>
          <TabPane tab="ALL" key={1}></TabPane>
          <TabPane tab="ACTIVE" key={2}></TabPane>
          <TabPane tab="INACTIVE" key={3}></TabPane>
        </Tabs>
        <div className="flex-x space-between table-search-section">
          <div>
            <Search
              value={searchText}
              placeholder="Search Company"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
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
        {companies && (
          <div>
            <Table
              className="gx-table-responsive"
              columns={columns}
              dataSource={getCompanies}
            />
          </div>
        )}
      </Card>
      <AddCompanyModal
        visible={openModal}
        companies={companies}
        handleOk={() => setOpenModal(false)}
        handleCancel={modalCloseHandler}
        editedCompany={editedCompany}
        addCompanyHandler={addCompanyHandler}
        addLocationHandler={addLocationHandler}
        editCompanyHandler={editCompanyHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
 return {
   loader: state.company.loader,
   companies: state.company.companies,
   total: state.company.total,
 }
};

export default connect(mapStateToProps, {
  createCompanyRequest,
  updateCompanyRequest,
  getCompanyRequest,
  createLocationRequest,
  deleteCompanyRequest
})(Companies);
