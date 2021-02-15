import React from 'react'
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
  section: {
    padding: '3rem 0',
  },
}))


export const Section = ({ children, className }) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.section, className)}>
      <Container>
        {children}
      </Container>
    </section>
  )
}


export default Section
