import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/ContextProvider";

export default function Dashboard() {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      history("*");
    } else {
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 1000);
  }, []);
  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
