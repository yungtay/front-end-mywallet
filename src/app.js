import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Records from "./components/Records";
import Entry from "./components/Entry";
import Outputs from "./components/Outputs";
import UserContext from "./context/UserContext";

export default function App() {
  const userSerializado = localStorage.getItem("user");
  const [accountInformation, setAccountInformation] = useState(
    JSON.parse(userSerializado)
  );
  const [updateRecords, setUpdateRecords] = useState(false);

  return (
    <BrowserRouter>
      <ContainerGlobal>
        <Switch>
          <UserContext.Provider
            value={{
              accountInformation,
              setAccountInformation,
              updateRecords,
              setUpdateRecords,
            }}
          >
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/sign-up" exact>
              <Registration />
            </Route>
            <Route path="/records" exact>
              <Records />
            </Route>
            <Route path="/entrys" exact>
              <Entry />
            </Route>
            <Route path="/outputs" exact>
              <Outputs />
            </Route>
          </UserContext.Provider>
        </Switch>
      </ContainerGlobal>
    </BrowserRouter>
  );
}

const ContainerGlobal = styled.div`
  background: #8f53bf;
`;
