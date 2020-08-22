import React, { useState } from "react";
import { Icon, Table, Menu, Dropdown, Button, Input } from "antd";
const { Search } = Input;

const data = [
  {
    key: "1",
    document: "2019 W4",
    status: "Signed on March 13, 2020",
  },
  {
    key: "2",
    document: "2019 W4",
    status: "Requires Signature!",
  },
];

const Document = () => {
  const [searchText, setSearchText] = useState("");
  const actionMenu = (
    <Menu>
      <Menu.Item>Download</Menu.Item>
      <Menu.Item>Invite to sign by E-mail</Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Dropdown overlay={actionMenu}>
            <Button size="small" className="gx-mb-0">
              <Icon type="more" className="cursor-pointer" />
            </Button>
          </Dropdown>
        </span>
      ),
    },
  ];
  return (
    <div>
      <Search
        value={searchText}
        placeholder="Search Document"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 200 }}
      />
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Document;
