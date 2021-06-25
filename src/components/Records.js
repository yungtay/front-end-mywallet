import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IoIosExit } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import UserContext from "../context/UserContext";

export default function Records() {
  const { accountInformation, updateRecords, setUpdateRecords } = useContext(UserContext);
  const [records, setRecords] = useState(null);
  const [name, setName] = useState("");
  const history = useHistory();

  const autho = {
    headers: { Authorization: `Bearer ${accountInformation}` },
  };

  useEffect(() => {
    const request = axios.get("http://localhost:4000/records", autho);
    request.then((response) => {
      setRecords(response.data.records);
      setName(response.data.name);
      setUpdateRecords(false);
    });
    request.catch(() => alert("Houve um erro ao buscar o extrato"));
  }, [updateRecords]);

  let balance = 0;

  function logout() {
    const request = axios.post("http://localhost:4000/logout", {}, autho);
    request.then(() => {
      localStorage.removeItem("user");
      history.push("/");

    });
    request.catch(() => alert("Erro ao fazer logout"));
  }

  return (
    <Container>
      <ContainerNameAndExit>
        Olá, {name}
        <div>
          <IoIosExit onClick={() => logout()} color={"white"} size={"30px"} />
        </div>
      </ContainerNameAndExit>
      <ContainerRecords>
        {records?.length ? (
          <>
            {records.map((record, index) => {
              balance += Number(record.value);
              return (
                <Record key={index}>
                  <RecordDescriptionAndDate>
                    <RecordDate>
                      {dayjs(record.date).format("DD/MM")}
                    </RecordDate>{" "}
                    <Description>{record.description}</Description>
                  </RecordDescriptionAndDate>{" "}
                  <RecordValue
                    valuePositive={
                      record.value > 0
                        ? "positive"
                        : record.value < 0
                        ? "negative"
                        : "neutral"
                    }
                  >
                    {Math.abs(record.value/100).toFixed(2)}
                  </RecordValue>
                </Record>
              );
            })}
            <Balance>
              Saldo{" "}
              <RecordValue
                valuePositive={
                  balance > 0
                    ? "positive"
                    : balance < 0
                    ? "negative"
                    : "neutral"
                }
              >
                {(balance/100).toFixed(2)}
              </RecordValue>
            </Balance>
          </>
        ) : (
          <NoRecords>Não há registros de entrada ou saída</NoRecords>
        )}
      </ContainerRecords>
      <ContainerEntryAndOutput>
        <Link to="/entrys">
          <EntryAndOutput>
            <FiPlusCircle color={"white"} size={"20px"} />{" "}
            <TextEntryAndOutput>Nova entrada</TextEntryAndOutput>
          </EntryAndOutput>
        </Link>
        <Link to="/outputs">
          {" "}
          <EntryAndOutput>
            <FiMinusCircle color={"white"} size={"20px"} />{" "}
            <TextEntryAndOutput>Nova saída</TextEntryAndOutput>{" "}
          </EntryAndOutput>
        </Link>
      </ContainerEntryAndOutput>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 3.75vh 6.4vw 16px 6.4vw;
`;

const ContainerNameAndExit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  font-size: 26px;
  font-weight: 700;

  margin-bottom: 22px;
`;

const ContainerRecords = styled.div`
  height: 66.87vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 13px;
  padding: 23px 12px 12px 12px;
  overflow: scroll;
`;

const ContainerEntryAndOutput = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, calc((100% - 4vw) / 2));
  grid-column-gap: 4vw;
  justify-content: center;
`;

const EntryAndOutput = styled.div`
  height: 17.09vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 10px;
  background: #a328d6;
`;

const TextEntryAndOutput = styled.div`
  width: 41.3%;

  color: white;
  font-weight: 700;
`;

const NoRecords = styled.div`
  width: 70%;
  height: 66.87vh;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-family: Raleway;
  font-size: 20px;
  color: #868686;
`;

const RecordDate = styled.div`
  color: #c6c6c6;
  margin-right: 8px;
`;

const RecordDescriptionAndDate = styled.div`
  width: 100%;
  font-size: 16px;
  display: flex;

`;

const Description = styled.div`
width: 50%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
`

const Record = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
`;

const RecordValue = styled.div`
  font-weight: 400;
  color: ${(prop) =>
    prop.valuePositive === "positive"
      ? "green"
      : prop.valuePositive === "negative"
      ? "red"
      : "gray"};
`;

const Balance = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

export { Container };
