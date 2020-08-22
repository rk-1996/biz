import React, { useMemo } from 'react';
import {
  Select,
} from "antd";
import { connect } from "react-redux";

const { Option } = Select;

const SelectLocation = ({ companies, activeCompany }) => {

  const activeCompanyDetails = useMemo(() => {
    return companies.find(a => a.cid === activeCompany)
  }, [companies, activeCompany])

  return (
    <Select
      placeholder="Select Location"
      dropdownRender={menu => (
        <div>
          {menu}
        </div>
      )}
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
  );
};

const mapStateToProps = (state) => {
  return {
    activeCompany: state.common.activeCompany.company,
    companies: state.common.companies
  }
 };

export default connect(mapStateToProps, null)(SelectLocation);
