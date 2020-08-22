import React, { useState, useEffect, useCallback } from "react";
import {connect} from "react-redux";
import { Breadcrumb, Icon, Card } from "antd";
import EditCompanyModal from "components/company/EditCompanyModal";
import { getCompanyDetails, updateCompany, updateLocation } from './../../../services/company';
import AppLoader from "components/Common/AppLoader";

const ViewCompany = (props) => {
  const [editType, setEditType] = useState('company');
  const [isEdit, setIsEdit] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const {  match: { params }, token} = props;

  const getCompanyHandler = useCallback(async() => {
    try {
      const result = await getCompanyDetails(token, params);
      if(result.status === 200) {
        setCompanyDetail(result.data);
      }
    } catch (error) {

    }
  }, [token, params])

  useEffect(() => {
    getCompanyHandler()
  }, [params, getCompanyHandler]);

  const modalCloseHandler = () => {
    setIsEdit(false);
    setEditedCompany(null);
  };

  const openEditModal = (type = 'company', values) => {
    console.log('values', values)
    setEditType(type);
    setEditedCompany(values);
    setIsEdit(true);
  }

  const editCompanyHandler = async (values) => {
    setLoading(true)
    const updateCompanyObj = {
      id: editedCompany.cid,
      name: values.name,
      phone: Number(values.phone),
      entity: values.entity,
      ein: values.ein,
      address: {
        state: values.state,
        city: values.city,
        zip: Number(values.zip),
        street1: values.street1,
        street2: values.street2,
      }
    };
    const result = await updateCompany(token, updateCompanyObj);
    setLoading(false)
    if (result.status === 200) {
      setIsEdit(false);
      getCompanyHandler();
    }
  };

  const editLocationHandler = async (values) => {
    setLoading(true)
    const updateLocationObj = {
      id: editedCompany.lid,
      name: values.locationName,
      phone: Number(values.phone),
      address: {
        state: values.state,
        city: values.city,
        zip: Number(values.zip),
        street1: values.street1,
        street2: values.street2,
      }
    };
    console.log('updateLocationObj', updateLocationObj)
    const result = await updateLocation(token, updateLocationObj, companyDetail.cid);
    setLoading(false)
    if (result.status === 200) {
      setIsEdit(false);
      getCompanyHandler();
    }
  };

  return (
    <div>
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
          <Breadcrumb.Item
            onClick={() => props.history.push("/superadmin/companies")}
          >
            <span className="gx-link">
              <span>Companies</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Company Details</span>
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="gx-card" title="Company Details">
        {
          companyDetail ?
          <div>
            <div>
              <div className="gx-fs-lg gx-pb-2">Company Info</div>
              <div className="employee-detail-block gx-mb-3">
                <div className="edit-icon" onClick={() => openEditModal('company', companyDetail)}>
                  <Icon type="edit" /> Edit
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Legal Company Name
                  </div>
                  <div className="flex-1 gx-text-grey">
                    {companyDetail.name}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Entity-Type
                  </div>
                  <div className="flex-1 gx-text-grey">
                    {companyDetail.entity}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Federal EIN
                  </div>
                  <div className="flex-1 gx-text-grey">
                    {companyDetail.ein}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Phone
                  </div>
                  <div className="flex-1 gx-text-grey">
                    {companyDetail.phone}
                  </div>
                </div>
                <div className="flex-x">
                  <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                    Address
                  </div>
                  {
                    companyDetail.address &&
                    <div className="flex-1 gx-text-grey">
                      {`${companyDetail.address.street1} ${
                        companyDetail.address.street2 ? companyDetail.address.street2 : ""
                      }, ${companyDetail.address.city}, ${companyDetail.address.state}, ${companyDetail.address.zip}`}
                    </div>
                  }
                </div>
              </div>
            </div>
            <div>
              <div className="gx-fs-lg gx-pb-2">Location Info</div>
              <div>
                {
                  companyDetail.locations && companyDetail.locations[0] ?
                  companyDetail.locations.map((l,i) => {
                    return (
                      <div key={i} className="employee-detail-block gx-mb-3">
                        <div className="edit-icon" onClick={() => openEditModal('location', l)}>
                          <Icon type="edit" /> Edit
                        </div>
                        <div className="flex-x">
                          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                            Location Name
                          </div>
                        <div className="flex-1 gx-text-grey">{l.name}</div>
                        </div>
                        <div className="flex-x">
                          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                            Phone
                          </div>
                          <div className="flex-1 gx-text-grey">{l.phone}</div>
                        </div>
                        <div className="flex-x">
                          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                            Address
                          </div>
                          <div className="flex-1 gx-text-grey">
                            {
                              l.address &&
                              <div className="flex-1 gx-text-grey">
                                {`${l.address.street1} ${
                                  l.address.street2 ? l.address.street2 : ""
                                }, ${l.address.city}, ${l.address.state}, ${l.address.zip}`}
                              </div>
                            }
                          </div>
                        </div>
                        {/* <div className="flex-x">
                          <div className="flex-1 text-right gx-pr-5 gx-font-weight-medium">
                            Owner
                          </div>
                          <div className="flex-1 gx-text-grey">Banana, Inc</div>
                        </div> */}
                      </div>
                    )
                  }) : ""
                }
              </div>
              {isEdit && (
                <EditCompanyModal
                  visible={isEdit}
                  editType={editType}
                  handleOk={() => setIsEdit(false)}
                  handleCancel={modalCloseHandler}
                  editCompanyHandler={editCompanyHandler}
                  editLocationHandler={editLocationHandler}
                  editedCompany={editedCompany}
                  loading={loading}
                />
              )}
            </div>
          </div> :
          <AppLoader/>
        }
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.authUser.tokens.accessToken,
  }
 };

 export default connect(mapStateToProps, null)(ViewCompany);
