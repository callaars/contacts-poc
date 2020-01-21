import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export type ContactProps = {
  contact: PersistedContact;
};

const Underline = styled.span`
  font-size: 36px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    width: 0px;
    height: 5px;
    margin: 5px 0 0;
    transition: all 0.1s ease-in-out;
    transition-duration: 0.75s;
    opacity: 1;
    background-color: #212529;
    left: 0;
  }
`;

const UnderlineContainer = styled.div`
  &:hover {
    cursor: pointer;

    ${Underline} {
      &:before,
      &:after {
        width: 100%;
        opacity: 1;
      }
    }
  }
`;

const Contact: React.FC<ContactProps> = props => {
  const history = useHistory();

  return (
    <UnderlineContainer
      className="display-4 mt-2"
      onClick={() => history.push(`/contact/${props.contact.id}`)}
    >
      <Underline>{props.contact.name}</Underline>
    </UnderlineContainer>
  );
};

export default Contact;
