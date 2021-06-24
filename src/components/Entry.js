import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Container } from "./Records";
import { LoginForm } from "./Login";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";

export default function Entry() {
  const [isLoading, setIsLoading] = useState(false);
  const { accountInformation, setUpdateRecords } = useContext(UserContext);
  const history = useHistory();
  const [userEntryInformation, setUserEntryInformation] = useState({
    value: "",
    description: "",
  });

  function submitEntry(e) {
    setIsLoading(true);
    e.preventDefault();
    for (const key in userEntryInformation) {
      if (!userEntryInformation[key]) {
        setIsLoading(false);
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }
    const request = axios.post(
      "http://localhost:4000/records",
      userEntryInformation,
      { headers: { Authorization: `Bearer ${accountInformation}` } }
    );
    request.then(submitEntrySucess);
    request.catch(submitEntryFail);
  }

  function submitEntrySucess() {
    setIsLoading(false);
    setUpdateRecords(true);
    setUserEntryInformation({ value: "", description: "" });
    history.push("/records");
  }

  function submitEntryFail(error) {
    setIsLoading(false);
    if (error.response.status) {
      alert("A entrada não é válida");
    }
  }

  return (
    <Container>
      <TitleEntryAndOutputs>Nova entrada</TitleEntryAndOutputs>
      <LoginForm
        onSubmit={(e) => submitEntry(e)}
        loading={isLoading ? "carregando" : ""}
      >
        <input
          disabled={isLoading}
          type="number"
          placeholder="Valor"
          value={userEntryInformation.value}
          onChange={(e) => {
            setUserEntryInformation({
              ...userEntryInformation,
              value: e.target.value,
            });
          }}
        />
        <input
          disabled={isLoading}
          type="text"
          placeholder="Descrição"
          value={userEntryInformation.description}
          onChange={(e) =>
            setUserEntryInformation({
              ...userEntryInformation,
              description: e.target.value,
            })
          }
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            "Entrar"
          )}
        </button>
      </LoginForm>
    </Container>
  );
}

const TitleEntryAndOutputs = styled.div`
  color: white;
  font-family: Raleway;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 40px;
`;

export { TitleEntryAndOutputs };
