import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { SALARY_ARRAY } from "./Constants";

const FilterVacancies = ({
  vacancies,
  setCityFilter,
  setSalaryFilter,
  filteredProcess
}) => (
  <ChangingBlock>
    <Header>Зарплата</Header>
    <Salary>
      <SalaryItem onClick={setSalaryFilter(0)}>
        <NameDiv>Указана</NameDiv>
        <Quantity>
          {vacancies.filter(vacancy => vacancy.salary && vacancy.salary).length}
        </Quantity>
      </SalaryItem>
      {SALARY_ARRAY.map(salaryAmount => (
        <SalaryItem onClick={setSalaryFilter(salaryAmount)}>
          <NameDiv>от {salaryAmount}</NameDiv>
          <Quantity>{filteredProcess(salaryAmount, vacancies).length}</Quantity>
        </SalaryItem>
      ))}
    </Salary>
    <TextBlock
      id="outlined-basic"
      label="Город"
      variant="outlined"
      size="small"
      margin="dense"
      onChange={setCityFilter}
    />
  </ChangingBlock>
);

export default FilterVacancies;

const SalaryItem = styled.div`
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

const ChangingBlock = styled.div`
  position: fixed;
  margin-top: 30px;
  margin-left: 30px;
`;

const Header = styled.div`
  margin: 20px;
  font-size: 18px;
`;

const Salary = styled.div`
  margin-bottom: 10px;
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const NameDiv = styled.div`
  margin-left: 10px;
  color: #8a8a8a;
`;

const Quantity = styled.div`
  margin-right: 10px;
  color: #ababab;
`;

const TextBlock = styled(TextField)`
  width: 200px;
  margin: 20px;
`;
