import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Records from "./components/Records";
import Entry from "./components/Entry";
import Outputs from "./components/Outputs";
export default function App() {
  return (
    <BrowserRouter>
      <ContainerGlobal>
        <Switch>
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
        </Switch>
      </ContainerGlobal>
    </BrowserRouter>
  );
}

const ContainerGlobal = styled.div`
  background: #8f53bf;
`;
