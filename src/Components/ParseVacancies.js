import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PopoverContacts from "./PopoverContacts";

const ParseVacancies = ({ vacancy }) => {
  const parseSalary = salary => {
    if (salary) {
      if (salary.from) {
        return `От ${salary.from}`;
      }
      if (salary.to) {
        return `До ${salary.to}`;
      }
    } else {
      return "Не указано";
    }
  };

  const checkResult = item => item || "Не указано";

  const {
    id,
    name,
    salary,
    area,
    employer,
    snippet,
    contacts
  } = vacancy;
  return (
    <>
      <VacancyItem>
        <Header>
          <StyledLink to={`/vacancies/${id}`}>{name}</StyledLink>
          <SalaryDiv>З/П {parseSalary(salary)}</SalaryDiv>
        </Header>
        <VacEmp>{checkResult(employer.name)} </VacEmp>
        <VacArea>{checkResult(area.name)},</VacArea>
        <VacDesc>Описание: {checkResult(snippet.responsibility)}</VacDesc>
        <VacDesc>Требования: {checkResult(snippet.requirement)}</VacDesc>
        <BottomPanel>
          <StyledLink>Откликнуться</StyledLink>
          {contacts && <PopoverContacts contacts={contacts} />}
        </BottomPanel>
      </VacancyItem>
    </>
  );
};

const VacancyItem = styled.li`
  border: 0.5px solid #dedede;
  list-style-type: none;
  margin: 0px 200px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  flex-basis: 100%;
  text-decoration: none;
  color: #78b9ff;
  :hover {
    cursor: pointer;
    color: #c20000;
  }
`;

const SalaryDiv = styled.div`
  flex: 0 0 auto;
  margin-left: 15px;
`;

const VacArea = styled.div`
  margin: 5px 0px;
  font-size: 15px;
  color: #ababab;
`;

const VacEmp = styled.span`
  margin: 5px 0px;
  font-size: 15px;
  color: #ababab;
  :hover {
    cursor: pointer;
    color: #c20000;
  }
`;

const VacDesc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
`;

const BottomPanel = styled.div`
  display: flex;
  margin: 20px 0px;
`;

const VacContacts = styled.div`
  flex: 0 0 auto;
  margin-left: 15px;
`;

export default ParseVacancies;
