import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

const Container = styled.section`
  flex-wrap: wrap;
  height: calc(100% - 56px - 60px);
`;

const PublicLayout = ({ children }: Props) => {
  return <Container className="container">{children}</Container>;
};

export default PublicLayout;
