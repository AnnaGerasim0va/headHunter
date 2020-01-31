import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Contacts from "./Contacts";
import Loader from "./Loader";
import StarBorderIcon from "@material-ui/icons/StarBorder";

class VacancyDescription extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);

    this.state = {
      vacancyDescription: {},
      loading: true,
      error: false,
      showContacts: false
    };
  }
  getData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.hh.ru/vacancies/${this.props.match.params.id}`
      );
      this.setState({ vacancyDescription: data, loading: false });

      console.log("data", data);
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log(error);
      return "Не удается получить данные с сервера";
    }
  };

  showContactsHendler = () => () => {
    const { showContacts } = this.state;
    this.setState({ showContacts: !showContacts });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      showContacts,
      loading,
      vacancyDescription: {
        name,
        area,
        salary,
        address,
        experience,
        employment,
        description,
        employer,
        contacts
      }
    } = this.state;

    return (
      <>
        <Back to={"/"}>Вернуться</Back>
        {!loading ? (
          <Page>
            <NameBlock>{name}</NameBlock>
            <SalaryDiv>
              з/п
              {salary
                ? `от ${salary.from && salary.from} до ${salary.to &&
                    salary.to}`
                : "не указана"}
            </SalaryDiv>
            <CompanyDiv>
              <NameCompany>{employer.name}</NameCompany>
              <TextDiv>
                {address ? address.raw && address.raw : area.name}
              </TextDiv>
            </CompanyDiv>
            <ButtonsPanel>
              <Resp>
                <div>Откликнуться</div>
              </Resp>
              {contacts && (
                <ContactsDiv>
                  <div>Показать контакты</div>
                </ContactsDiv>
              )}
              <Favorites>
                <StarIcon />
              </Favorites>
            </ButtonsPanel>
            <TextDiv dangerouslySetInnerHTML={{ __html: description }} />
            <TextDiv></TextDiv>
            {contacts && (
              <ContactsInfo onClick={this.showContactsHendler()}>
                Контактная информация
              </ContactsInfo>
            )}
            {showContacts && <Contacts contacts={contacts} />}

            <h3></h3>
            <TextDiv></TextDiv>
            <h3></h3>
            <TextDiv></TextDiv>
            <h3></h3>
            <TextDiv></TextDiv>
          </Page>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

const Page = styled.div`
  margin: 30px 100px;
`;

const Back = styled(Link)`
  position: fixed;
  margin-left: 10px;
  text-decoration: none;
  color: black;
  :hover {
    cursor: pointer;
    color: #78b9ff;
  }
`;

const NameBlock = styled.h1`
  margin: 20px 0px;
`;

const SalaryDiv = styled.div`
  font-size: 18px;
  margin: 10px 0px;
`;

const CompanyDiv = styled.div`
  margin: 20px 0px;
`;

const NameCompany = styled.h2`
  color: #78b9ff;
  :hover {
    cursor: pointer;
    color: #c20000;
  }
`;

const TextDiv = styled.div``;

const ButtonsPanel = styled.div`
  margin: 20px 0px;
  display: flex;
`;

const Resp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  color: white;
  background-color: #8bcf32;
  :hover {
    cursor: pointer;
    background-color: #79b52b;
  }
`;

const ContactsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 199px;
  height: 39px;
  background-color: #f5f5f5;
  border: 1px solid #bfbfbf;
  :hover {
    cursor: pointer;
    border: 1px solid #878787;
  }
`;

const Favorites = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  height: 38px;
  width: 39px;
  background-color: #f5f5f5;
  border: 1px solid #bfbfbf;
  :hover {
    cursor: pointer;
    border: 1px solid #878787;
  }
`;

const StarIcon = styled(StarBorderIcon)`
  color: #bfbfbf;
`;

const ContactsInfo = styled.h3`
  color: #78b9ff;
  :hover {
    cursor: pointer;
    color: black;
  }
`;

export default VacancyDescription;
