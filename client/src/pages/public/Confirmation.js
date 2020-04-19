import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

import { ToastStatus } from '../../constants';
import { useToast } from '../../hooks';
import { convertElementToPDF } from '../../utils';

import { Button, Divider, Page } from '../../components/generic';
import { Form } from '../../components/form';

export default () => {
  const location = useLocation();

  const { openToast } = useToast();
  const [isPDFLoading, setPDFLoading] = useState(false);

  const handlePDFClick = async () => {
    const form = document.getElementById('form');
    const fileName = `submission_${location.state?.id}.pdf`;
    try {
      setPDFLoading(true);
      await convertElementToPDF(form, fileName);
    } catch (e) {
      openToast({ status: ToastStatus.Error, message: 'Failed to download PDF' });
    } finally {
      setPDFLoading(false);
    }
  };

  return (
    <div id="form">
      <Page>
        <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>

          {/** Status */}
          <Box pt={5} pb={2} pl={2} pr={2}>
            <Box mb={2}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="subtitle1" paragraph>
                    Write down this confirmation number and print this page for your records.
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    text="Download PDF"
                    onClick={handlePDFClick}
                    loading={isPDFLoading}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography variant="body1" paragraph>
              Thank you. Your form has been submitted.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Confirmation number:
            </Typography>
            <Typography variant="subtitle2" paragraph>
              <b>{location.state?.id || 'Failed to retrieve'}</b>
            </Typography>
            <Divider />
          </Box>

          {/** Form */}
          <Form
            initialValues={location.state?.formValues}
            isDisabled
          />
        </Grid>
      </Page>
    </div>
  );
};
