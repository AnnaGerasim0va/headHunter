import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import ParseVacancies from "./ParseVacancies";
import Loader from "./Loader";
import FilterVacancies from "./FilterVacancies";

class ListVacancies extends Component {
  state = {
    vacancies: {},
    loading: true,
    error: false,
    showPanel: false,
    filteredFields: {
      city: { isFiltered: false, value: "" },
      salary: {
        isFiltered: false,
        value: 0
      }
    }
  };

  getData = async () => {
    try {
      const { data } = await axios.get("https://api.hh.ru/vacancies");
      this.setState({ vacancies: data, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log(error);
      return "Не удается получить данные с сервера";
    }
  };

  componentDidMount() {
    this.getData();
  }

  filteredProcess = quantitySalary => {
    const { vacancies } = this.state;
    return vacancies.items.filter(vacancy => {
      if (vacancy.salary) {
        if (vacancy.salary.from) {
          return vacancy.salary.from >= quantitySalary;
        }
        if (vacancy.salary.from && vacancy.salary.to) {
          return (
            (vacancy.salary.from + vacancy.salary.to) / 2 >= quantitySalary
          );
        }
      }
    });
  };

  setSalaryFilter = salaryAmount => () => {
    const { isFiltered } = this.state.filteredFields.salary;
    const {
      filteredFields,
      filteredFields: {
        salary: { value }
      }
    } = this.state;
    this.setState({
      filteredFields: {
        ...filteredFields,
        salary: {
          isFiltered: value === salaryAmount ? !isFiltered : true,
          value: salaryAmount
        }
      }
    });
  };

  setCityFilter = event => {
    const { value } = event.target;
    const { filteredFields } = this.state;
    this.setState({
      filteredFields: {
        ...filteredFields,
        city: {
          isFiltered: true,
          value
        }
      }
    });
  };

  filterVacancies = () => {
    const {
      vacancies,
      filteredFields: { city, salary },
      loading
    } = this.state;
    if (loading) {
      return vacancies;
    }
    return vacancies.items.filter(({ area, salary: vacancySalary }) => {
      let flag = true;
      if (city.isFiltered) {
        flag = area.name.toUpperCase().includes(city.value.toUpperCase());
      }
      if (salary.isFiltered) {
        flag = flag && vacancySalary && vacancySalary.from >= salary.value;
      }
      return flag;
    });
  };

  render() {
    const { loading, vacancies } = this.state;
    const filteredVacancies = this.filterVacancies();
    return !loading ? (
      <>
        <MainBlock>
          <Header>{vacancies.length} вакансий дня</Header>
          <FilterVacancies
            vacancies={filteredVacancies}
            setSalaryFilter={this.setSalaryFilter}
            setCityFilter={this.setCityFilter}
            filteredProcess={this.filteredProcess}
          />
          <VacancyBlock>
            {filteredVacancies.length ? (
              filteredVacancies.map((item, index) => (
                <ParseVacancies vacancy={item} key={index} />
              ))
            ) : (
              <Dialog>По Вашему запросу вакансий не найдено</Dialog>
            )}
          </VacancyBlock>
        </MainBlock>
      </>
    ) : (
      <Loader />
    );
  }
}

const Dialog = styled.div`
  display: flex;
  justify-content: center;
`;

const MainBlock = styled.div`
  margin: auto;
`;

const VacancyBlock = styled.ul`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Header = styled.h1`
  margin: 10px 40px;
  font-weight: normal;
  font-stretch: condensed;
  font-family: "Open Sans Condensed";
`;

export default ListVacancies;
