import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import UserContext from '../context/UserContext'

export default function Login() {
  const [userLogInInformation, setUserLogInInformation] = useState({
    email: "",
    password: "",
  });
  const { setAccountInformation } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  if(localStorage.getItem("user")){
    history.push("/records")
  }

  function submitLogin(e) {
    setIsLoading(true);
    e.preventDefault();
    for (const key in userLogInInformation) {
      if (!userLogInInformation[key]) {
        setIsLoading(false);
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
    }
    const request = axios.post(
      "http://localhost:4000/sign-in",
      userLogInInformation
    );
    request.then(submitLoginSucess);
    request.catch(submitLoginFail);

  }

  function submitLoginSucess(response) {
    setIsLoading(false);
    setUserLogInInformation({ email: "", password: "" });
    setAccountInformation(response.data);
    const userSerializados = JSON.stringify(response.data);
    localStorage.setItem("user", userSerializados);
    history.push("/records");
  }

  function submitLoginFail(error) {
    setIsLoading(false);
    setUserLogInInformation({ email: userLogInInformation.email, password: "" });
    if (error.response.status === 403) {
      alert("E-mail ou senha incorretos");
    } else {
      alert("Um erro desconhecido ocorreu");
    }
  }

  return (
    <ContainerLogin>
      <Logo>MyWallet</Logo>
      <ContainerForm>
        <LoginForm
          onSubmit={(e) => submitLogin(e)}
          loading={isLoading ? "carregando" : ""}
        >
          <input
            disabled={isLoading}
            type="text"
            placeholder="E-mail"
            value={userLogInInformation.email}
            onChange={(e) =>
              setUserLogInInformation({
                ...userLogInInformation,
                email: e.target.value,
              })
            }
          ></input>
          <input
            type="password"
            placeholder="Senha"
            value={userLogInInformation.password}
            disabled={isLoading}
            onChange={(e) =>
              setUserLogInInformation({
                ...userLogInInformation,
                password: e.target.value,
              })
            }
          ></input>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader type="ThreeDots" color="white" height={20} />
            ) : (
              "Entrar"
            )}
          </button>
          <Link to="/sign-up">Primeira vez ? Cadastre-se!</Link>
        </LoginForm>
      </ContainerForm>
    </ContainerLogin>
  );
}

const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 400;
  font-family: "Saira Stencil One", cursive;

  margin-top: 24.13vh;
  margin-bottom: 24px;
`;

const ContainerForm = styled.div`
  width: 100%;
  padding: 0 6.4%;
`;

const LoginForm = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  input {
    height: 58px;

    padding: 0 0 0 15px;
    font-size: 20px;
    border: 0px solid;
    border-radius: 5px;

    margin-bottom: 13px;

    opacity: ${(prop) => (prop.loading ? 0.35 : 1)};
    background: ${(prop) => (prop.loading ? "#F2F2F2" : "white")};
    pointer-events: ${(prop) => (prop.loading ? "none" : "initial")};

    &::placeholder {
      color: black;
    }
  }
  button {
    height: 46px;

    font-size: 20px;
    color: white;
    border: 0 solid;
    border-radius: 5px;
    margin-bottom: 36px;
    background: #a328d6;

    pointer-events: ${(prop) => (prop.loading ? "none" : "initial")};
  }

  a {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 700;
    color: white;

    margin: auto;
  }
`;

export { ContainerLogin, ContainerForm, LoginForm };
