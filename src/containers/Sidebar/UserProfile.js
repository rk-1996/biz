import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { connect } from "react-redux";
import { userSignOut } from "appRedux/actions/Auth";

const UserProfile = ({ authUser }) => {
  console.log('authUser', authUser)
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Switch to Contractor Profile</li>
      <li>Switch to User Profile</li>
      <li onClick={() => dispatch(userSignOut())}>Logout
      </li>
    </ul>
  );

  return (

    <div className="gx-flex-row gx-align-items-center gx-avatar-row padding-8px-big-device">

      {/* <div>

        <Avatar src={require("assets/images/avatar/domnic-harris.png")}
          className="gx-size-40 gx-pointer gx-mr-3" alt="" />
        {
          authUser && authUser.user.type === "admin" &&
          <span className="gx-avatar-name">Admin<i
            className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
        }
      </div>
      <div>
        123
        </div>
      <div>
        demo
        <div>
        </div>
      </div> */}

      {
        authUser && authUser.user.companies[0].type === "admin" &&

        <>
          <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
            <div className='display-flex align-item-center cursor-pointer'>
              <div>
                <Avatar src={require("assets/images/avatar/domnic-harris.png")}
                  className="gx-size-40 gx-pointer gx-mr-3" alt="" />
              </div>
              <div className='text-align-center'>
                <div>
                  <span className="gx-avatar-name admin-type-style">Admin</span>
                </div>
                <div className='email-sidebar'>
                  <span className="email-sidebar">{authUser.user.email}</span>
                </div>
              </div>
              <div>
                <i
                  className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
              </div>

            </div>
          </Popover>

        </>
      }
      {
        authUser && authUser.user.companies[0].type !== "admin" &&

        <>
          <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
            <div className='display-flex align-item-center cursor-pointer'>
              <div>
                <Avatar src={require("assets/images/avatar/domnic-harris.png")}
                  className="gx-size-40 gx-pointer gx-mr-3" alt="" />
              </div>
              <div className='text-align-center'>
                {/* <div>
                  <span className="gx-avatar-name admin-type-style">Admin</span>
                </div> */}
                <div className='email-sidebar'>
                  <span className="email-sidebar">{authUser.user.email}</span>
                </div>
              </div>
              <div>
                <i
                  className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
              </div>

            </div>
          </Popover>

        </>
      }
    </div>

  )
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser }
};


export default connect(mapStateToProps, null)(UserProfile);
