import React, { useCallback, useRef, useState } from "react";

import styled from "styled-components";

import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import COLORS_PALLETE from "../../../constants/COLORS_PALLETE";

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: ${COLORS_PALLETE.brighter};
`;

const FooterText = styled.p`
  text-align: center;
  margin-bottom: 0;
`;

const Footer = () => {
  const target = useRef(null);
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => setShow((state) => !state), [setShow]);

  return (
    <Container>
      <FooterText className="container">
        Feito com o ❤️ por{" "}
        <span ref={target} onMouseEnter={toggleShow} onMouseLeave={toggleShow}>
          🧰
        </span>
      </FooterText>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Baú
          </Tooltip>
        )}
      </Overlay>
    </Container>
  );
};

export default Footer;
