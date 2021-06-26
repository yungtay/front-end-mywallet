import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Container } from "./Records";
import { LoginForm } from "./Login";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";
import CurrencyInput from 'react-currency-masked-input'

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
      {...userEntryInformation, value: userEntryInformation.value * 100},
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
        <CurrencyInput
          disabled={isLoading}
          max="21474836.47"
          type="number"
          placeholder="Valor"
          value={userEntryInformation.value}
          onChange={(e,m) => {
            setUserEntryInformation({
              ...userEntryInformation,
              value: m,
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
            "Salvar entrada"
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
