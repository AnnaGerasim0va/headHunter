import React from "react";
import styled from "styled-components";

const getPhone = phone => {
  if (phone) {
    console.log(phone.number, "number");
    return `+${phone.country}(${phone.city})${phone.number}`;
  }
};

const Contacts = ({ contacts }) => {
  const { name, email, phones } = contacts;
  console.log(contacts, "contacts");

  if (name) {
    return (
      <Wrapper>
        <NameDiv>{name}</NameDiv>
        <ContactsDiv>
          {phones && phones.map(phone => getPhone(phone))}
        </ContactsDiv>
        <ContactsDiv>{phones && phones.comment}</ContactsDiv>
        <EmailDiv>{email}</EmailDiv>
      </Wrapper>
    );
  }
};

export default Contacts;

const Wrapper = styled.div`
  padding: 20px;
`;

const NameDiv = styled.div`
  font-size: 17px;
  padding: 20px 0px;
`;

const ContactsDiv = styled.div`
  font-size: 15px;
`;

const EmailDiv = styled.a`
  font-size: 15px;
  text-decoration: none;
`;
