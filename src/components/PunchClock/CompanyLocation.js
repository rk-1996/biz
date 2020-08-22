import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Icon, Checkbox, Button } from 'antd';

const CompanyLocation = (props) => {
  const { setSelectedOption, selectedOption, setCurrentTab } = props
  const { searchText, setLocation, companies, activeLocation } = props.props;

  const getCompanies = useMemo(() => {
    if (companies && companies.length) {
      console.log(companies)
      return companies
    }
    return [];
  }, [searchText, companies]);

  const selectOption = (e, l) => {
    // e.stopPropogation()
    setSelectedOption(l)
    // setLocation(l)
    console.log(l)
  }

  return (
    <div className="verify-form-container">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div
            className="gx-p-4 m-auto gx-app-login-content"
            style={{ width: "100%" }}
          >
            <div className="gx-fs-xxxl text-center gx-pb-4">
              Which Location?
            </div>
            <div className="location-list">
              {
                getCompanies.length && getCompanies.map((c, i) => {
                  return (
                    <div>
                      {
                        c.locations && c.locations[0] &&
                        c.locations.map((l, i) => {
                          return (
                            <div onClick={(e) => { selectOption(e, l) }} className="location flex-x space-between">
                              {l.name} {
                                selectedOption && selectedOption.lid == l.lid &&
                                <Icon type="check" />
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  )

                })
              }
              {/* <div className="location flex-x space-between">
                Cafe Pesto <Icon type="check" />
              </div>
              <div className="location">
                Cafe Pesto
              </div>
              <div className="location">
                Cafe Pesto
              </div> */}
              <div className="gx-pt-3">
                <Checkbox value='remember'>Remember Selected Location for this Device</Checkbox>
              </div>
              <div className="text-center gx-pt-5">
                <Button type="primary" onClick={() => setCurrentTab("pin")}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.common.companies,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location
  }
};

export default CompanyLocation
