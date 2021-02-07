import React from 'react'
import styled from 'styled-components';
import { Container } from '@material-ui/core';

const StyledSectionWrapper = styled.div`
  padding: 3rem 0;
`

export const Section = ({ children }) => {
  return (
    <StyledSectionWrapper>
      <Container>
        {children}
      </Container>
    </StyledSectionWrapper>
  )
}


export default Section
