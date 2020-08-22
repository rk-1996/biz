import React from "react";
import { Spin, Icon } from "antd";
import classNames from "classnames";

const antIcon = (
  <Icon
    type="loading"
    style={{ fontSize: 30 }}
    spin
    className="primary--text"
  />
);

const AppLoader = ({ className }) => {
  return (
    <div className={classNames("app-loader", className)}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default AppLoader;
