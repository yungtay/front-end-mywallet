import styled from "styled-components";
import { useState } from "react";
import { Container } from "./Records";
import { LoginForm } from "./Login";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";

export default function Entry() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [userEntryInformation, setUserEntryInformation] = useState({
    value: "",
    description: "",
  });
  console.log(userEntryInformation)

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
    // const request = axios.post(
    //   "",
    //   userEntryInformation
    // );
    // request.then(submitEntrySucess);
    // request.catch(submitEntryFail);

    setIsLoading(false);
    history.push("/records");
  }

  function submitEntrySucess(response) {
    setIsLoading(false);
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
              value: e.target.value ,
           })
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

export { TitleEntryAndOutputs }
