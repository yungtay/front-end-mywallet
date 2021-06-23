import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosExit } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

export default function Records() {
  let balance = 0;
  const records = [
    { id: "1", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "2", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "3", date: "30/11", description: "Almoço mãe", value: "39.90" },
    { id: "4", date: "30/11", description: "Almoço mãe", value: "0" },
    { id: "1", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "2", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "3", date: "30/11", description: "Almoço mãe", value: "39.90" },
    { id: "4", date: "30/11", description: "Almoço mãe", value: "0" },
    { id: "1", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "2", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "3", date: "30/11", description: "Almoço mãe", value: "39.90" },
    { id: "4", date: "30/11", description: "Almoço mãe", value: "0" },
    { id: "1", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "2", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "3", date: "30/11", description: "Almoço mãe", value: "39.90" },
    { id: "4", date: "30/11", description: "Almoço mãe", value: "0" },
    { id: "1", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "2", date: "30/11", description: "Almoço mãe", value: "-39.90" },
    { id: "3", date: "30/11", description: "Almoço mãe", value: "39.90" },
    { id: "4", date: "30/11", description: "Almoço mãe", value: "0" },
  ];
  return (
    <Container>
      <ContainerNameAndExit>
        Olá, Fulano
        <div>
          <IoIosExit color={"white"} size={"30px"} />
        </div>
      </ContainerNameAndExit>
      <ContainerRecords>
        {records.length ? (
          <>
            {records.map((record, index) => {
              balance += Number(record.value);
              return (
                <Record key={index}>
                  <RecordDescriptionAndDate>
                    <RecordDate>{record.date}</RecordDate> {record.description}
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
                    {Math.abs(record.value).toFixed(2)}
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
                {balance}
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
