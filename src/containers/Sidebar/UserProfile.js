import React from "react";
import {useDispatch} from "react-redux";
import {Avatar, Popover} from "antd";
import {connect} from "react-redux";
import {userSignOut} from "appRedux/actions/Auth";

const UserProfile = ({ authUser }) => {
  console.log('authUser', authUser)
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li onClick={() => dispatch(userSignOut())}>Logout
      </li>
    </ul>
  );

  return (

    <div className="gx-flex-row gx-align-items-center gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={require("assets/images/avatar/domnic-harris.png")}
                className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
        {
          authUser && authUser.user.type === "admin" &&
        <span className="gx-avatar-name">Admin<i
          className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
        }
      </Popover>
    </div>

  )
};

const mapStateToProps = ({auth}) => {
  const { authUser } = auth;
  return { authUser }
};


export default connect(mapStateToProps, null)(UserProfile);
