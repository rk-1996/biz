import React, { useState } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import EditPersonalDetailModal from "./../Personal/EditPersonalDetailModal";
import { dateFormat, mobileFormat } from "util/constant";
import FederalTaxes from './../JobAndPay/FederalTaxes';
import StateTaxes from './../JobAndPay/StateTaxes';

const Personal = ({ employeeData, updateSavedObj, authUser, match }) => {
  const { params } = match;

  return (
    <div>
      {/* Federal Taxes */}
        <FederalTaxes
          params={params}
          token={authUser.tokens.accessToken}
          employeeData={employeeData}
          updateSavedObj={updateSavedObj}
        />
        {/* State Taxes */}
        <StateTaxes
          params={params}
          token={authUser.tokens.accessToken}
          employeeData={employeeData}
          updateSavedObj={updateSavedObj}
        />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser }
};
export default connect(mapStateToProps)(withRouter(Personal));
