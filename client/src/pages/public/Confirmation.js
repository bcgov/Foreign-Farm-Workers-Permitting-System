import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

import { Divider, Page } from '../../components/generic';
import { Form } from '../../components/form';

export default () => {
  const location = useLocation();
  const { state } = location;
  return (
    <Page>
      <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>

        {/** Status */}
        <Box pt={5} pb={2} pl={2} pr={2}>
          {!state?.id ? (
            <Typography variant="subtitle1" color="error" paragraph>
              Error: Form was not submitted successfully
            </Typography>
          ) : (
            <Fragment>
              <Typography variant="subtitle1" paragraph>
                Write down this confirmation number and print this page for your records.
              </Typography>
              <Typography variant="subtitle2" paragraph>
                Thank you. Your form has been submitted.
              </Typography>
              <Typography variant="subtitle2">
                Confirmation number:
              </Typography>
              <Typography variant="subtitle2" paragraph>
                <b>{state?.id}</b>
              </Typography>
            </Fragment>
          )}
          <Divider />
        </Box>

        {/** Form */}
        <Form
          initialValues={state?.formValues}
          isDisabled
        />
      </Grid>
    </Page>
  )
}
