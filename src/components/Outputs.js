import { useState, useContext } from "react";
import axios from "axios";
import { Container } from "./Records";
import { LoginForm } from "./Login";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { TitleEntryAndOutputs } from "./Entry";
import UserContext from "../context/UserContext";

export default function Outputs() {
  const [isLoading, setIsLoading] = useState(false);
  const { accountInformation, setUpdateRecords } = useContext(UserContext);
  const history = useHistory();
  const [userOutputInformation, setUserOutputInformation] = useState({
    value: "",
    description: "",
  });

  function submitOutputs(e) {
    setIsLoading(true);
    e.preventDefault();
    for (const key in userOutputInformation) {
      if (!userOutputInformation[key]) {
        setIsLoading(false);
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }
    const request = axios.post(
      "http://localhost:4000/records",
      { ...userOutputInformation, value: userOutputInformation.value * -1 },
      { headers: { Authorization: `Bearer ${accountInformation}` } }
    );
    request.then(submitOutputsSucess);
    request.catch(submitOutputsFail);

    setIsLoading(false);
    history.push("/records");
  }

  function submitOutputsSucess() {
    setUpdateRecords(true);
    setIsLoading(false);
    setUserOutputInformation({ value: "", description: "" });
    history.push("/records");
  }

  function submitOutputsFail(error) {
    setIsLoading(false);
    if (error.response.status) {
      alert("A entrada não é válida");
    }
  }

  return (
    <Container>
      <TitleEntryAndOutputs>Nova entrada</TitleEntryAndOutputs>
      <LoginForm
        onSubmit={(e) => submitOutputs(e)}
        loading={isLoading ? "carregando" : ""}
      >
        <input
          disabled={isLoading}
          type="number"
          step="any"
          placeholder="Valor"
          value={userOutputInformation.value}
          onChange={(e) =>
            setUserOutputInformation({
              ...userOutputInformation,
              value: e.target.value,
            })
          }
        />
        <input
          disabled={isLoading}
          type="text"
          placeholder="Descrição"
          value={userOutputInformation.description}
          onChange={(e) =>
            setUserOutputInformation({
              ...userOutputInformation,
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
