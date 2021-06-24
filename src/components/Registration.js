import { ContainerLogin, LoginForm, ContainerForm } from "./Login";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Loader from "react-loader-spinner";
export default function Registration() {
  const [userRegisterInformation, setUserRegisterInformation] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function submitLogin(e) {
    setIsLoading(true);
    e.preventDefault();
    for (const key in userRegisterInformation) {
      if (!userRegisterInformation[key]) {
        setIsLoading(false);
        alert(`Por favor, preencha o campo: ${key}`);
        return;
      }
      if (
        userRegisterInformation.confirmPassword !==
        userRegisterInformation.password
      ) {
        setIsLoading(false);
        alert(`A senha é diferente no campo de confirmação, tente novamente`);
        setUserRegisterInformation({
          name: userRegisterInformation.name,
          email: userRegisterInformation.email,
          password: userRegisterInformation.password,
          confirmPassword: "",
        });
        return;
      }
    }
    const request = axios.post(
      "http://localhost:4000/sign-up",
      userRegisterInformation
    );
    request.then(submitRegisterSucess);
    request.catch(submitRegisterFail);
  }

  function submitRegisterSucess(response) {
    setIsLoading(false);
    setUserRegisterInformation({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    history.push("/");
  }

  function submitRegisterFail(error) {
    setIsLoading(false);
    if (error.response.status === 403) {
      alert("O e-mail inserido já está em uso");
    } else {
      alert("Um erro desconhecido ocorreu");
    }
  }

  return (
    <ContainerLogin>
      <LogoRegister>MyWallet</LogoRegister>
      <ContainerForm>
        <LoginForm
          onSubmit={(e) => submitLogin(e)}
          loading={isLoading ? "carregando" : ""}
        >
          <input
            disabled={isLoading}
            type="text"
            placeholder="Nome"
            value={userRegisterInformation.name}
            onChange={(e) =>
              setUserRegisterInformation({
                ...userRegisterInformation,
                name: e.target.value,
              })
            }
          ></input>
          <input
            disabled={isLoading}
            type="text"
            placeholder="E-mail"
            value={userRegisterInformation.email}
            onChange={(e) =>
              setUserRegisterInformation({
                ...userRegisterInformation,
                email: e.target.value,
              })
            }
          ></input>
          <input
            disabled={isLoading}
            type="password"
            placeholder="Senha"
            value={userRegisterInformation.password}
            onChange={(e) =>
              setUserRegisterInformation({
                ...userRegisterInformation,
                password: e.target.value,
              })
            }
          ></input>
          <input
            disabled={isLoading}
            type="password"
            placeholder="Confirme a senha"
            value={userRegisterInformation.confirmPassword}
            onChange={(e) =>
              setUserRegisterInformation({
                ...userRegisterInformation,
                confirmPassword: e.target.value,
              })
            }
          ></input>
          <button type="submit">
            {isLoading ? (
              <Loader type="ThreeDots" color="white" height={20} />
            ) : (
              "Entrar"
            )}
          </button>
          <Link to="/">Já tem uma conta? Entre agora!</Link>
        </LoginForm>
      </ContainerForm>
    </ContainerLogin>
  );
}

const LogoRegister = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 400;
  font-family: "Saira Stencil One", cursive;

  margin-top: 14.24vh;
  margin-bottom: 24px;
`;
