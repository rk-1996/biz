import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Menu, Select, Icon } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { commonGetCompanyRequest, setActiveCompany } from 'appRedux/actions/Common';
import { useSelector } from "react-redux";

const MenuItemGroup = Menu.ItemGroup;
const { Option, OptGroup } = Select;

const SidebarContent = (props) => {
  const [searchText, setSearchText] = useState("");
  const { companies, activeCompany, activeLocation, commonGetCompanyRequest, setActiveCompany } = props;

  const getCompanies = useMemo(() => {
    if (companies && companies.length) {
      return companies.filter(a =>
        a.name && a.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return [];
  }, [searchText, companies]);

  useEffect(() => {
    const obj = {
      page: 1,
      active: true
    }
    commonGetCompanyRequest(obj)
  }, [])

  let { navStyle, themeType, pathname } = useSelector(({ settings }) => settings);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  const onChangeCompany = (location) => {
    const activeCompany = getCompanies.find(c => c.locations[0] && c.locations.map(l => l.lid).includes(location))
    if (activeCompany) {
      const obj = {
        company: activeCompany.cid,
        location
      }
      setActiveCompany(obj);
    } else {
      //set function for select all location of the company

      const activeCompany = getCompanies.find(c => c.cid == location)
      console.log(activeCompany)
    }
  }

  return (
    <>
      {
        (companies.length && activeCompany) ?
          <div className="company-select-menu">
            <Select
              style={{ width: '100%' }}
              showSearch
              filterOption={false}
              value={activeLocation}
              onChange={onChangeCompany}
              onSearch={(e) => setSearchText(e)}
            >
              {
                getCompanies.length && getCompanies.map((c, i) => {
                  return (
                    <OptGroup label={c.name} key={i}>
                      {
                        c.locations && c.locations[0] &&
                        c.locations.map((l, i) => {
                          return (
                            <Option value={l.lid} key={i}>{l.name}</Option>
                          )
                        })
                      }
                      <Option value={c.cid} key={i}>All Location</Option>
                    </OptGroup>
                  )
                })
              }
            </Select>
          </div> : ""
      }
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          {/* <AppsNavigation/> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            <Menu.Item key="overview">
              <Link to="/overview"><i className="icon icon-widgets" />
                <span><IntlMessages id="sidebar.overview" /></span></Link>
            </Menu.Item>
            {/* <Menu.Item key="reports">
              <Link to="/reports"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.reports"/></span></Link>
            </Menu.Item>
            <Menu.Item key="schedule">
              <Link to="/schedule"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.schedule"/></span></Link>
            </Menu.Item>*/}
            <Menu.Item key="timesheet">
              <Link to="/timesheet"><Icon type="clock-circle" />
                <span><IntlMessages id="sidebar.timesheet" /></span></Link>
            </Menu.Item>
            <Menu.Item key="people">
              <Link to="/people"><i className="icon icon-avatar -flex-column-reverse" />
                <span><IntlMessages id="sidebar.people" /></span></Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to="/settings"><i className="icon icon-setting" />
                <span><IntlMessages id="sidebar.settings" /></span></Link>
            </Menu.Item>
            {/* <Menu.Item key="payroll">
              <Link to="/payroll"><i className="icon icon-widgets"/>
                <span><IntlMessages id="sidebar.payroll"/></span></Link>
            </Menu.Item> */}
            <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.superadmin" />}>
              <Menu.Item key="superadmin/companies">
                <Link to="/superadmin/companies"><i className="icon icon-company" />
                  <span><IntlMessages id="sidebar.companies" /></span></Link>
              </Menu.Item>
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};

const mapStateToProps = (state) => {
  return {
    companies: state.common.companies,
    activeCompany: state.common.activeCompany.company,
    activeLocation: state.common.activeCompany.location
  }
};

export default connect(mapStateToProps, {
  commonGetCompanyRequest,
  setActiveCompany
})(SidebarContent);

