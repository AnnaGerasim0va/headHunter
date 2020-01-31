import React from "react";
import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import Contacts from "./Contacts"
import Typography from "@material-ui/core/Typography";

const VacancyContacts = ({ contacts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <VacContacts aria-describedby={id} onClick={handleClick}>
        Показать контакты
      </VacContacts>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Contacts contacts={contacts}/>
      </Popover>
    </>
  );
};

export default VacancyContacts;

const VacContacts = styled.div`
  color: #78b9ff;
  :hover {
    cursor: pointer;
    color: #c20000;
  }
`;




