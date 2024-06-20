import React from "react";
import "./NotFound.css";
import { Button, Result } from 'antd'
import { useDispatch } from "react-redux";
import { siderActions } from "../../../actions/Sider.action";

function NotFound() {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(siderActions({
      selectedKey: ["DashBoard1"],
      openKey: ["dashBoard"],
    }))
    window.history.back();
  }
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
      />
    </>
  );
}

export default NotFound;
