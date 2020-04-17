import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import moment from 'moment';
import { Formik, Form as FormikForm } from 'formik';

import { dateToString } from '../../utils';
import { FormSchema } from '../../constants';

import { Card, Page } from '../../components/generic';
import { Certify } from '../../components/form/Certify';
import { PrimaryContactInformation } from '../../components/form/PrimaryContactInformation';
import { SelfIsolationPlan } from '../../components/form/SelfIsolationPlan';
import { TravelInformation } from '../../components/form/TravelInformation';

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const formValues = {

    // Primary contact information
    firstName: '',
    lastName: '',
    dob: '',
    telephone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',

    // Travel information
    includeAdditionalTravellers: null,
    numberOfAdditionalTravellers: 1,
    additionalTravellers: [],
    arrival: {
      date: dateToString(moment.now()),
      by: '',
      from: '',
      flight: '',
    },

    // Self isolation plan
    accomodations: null,
    isolationPlan: {
      type: '',
      city: '',
      address: '',
    },
    ableToIsolate: null,
    supplies: null,
    transportation: [],
    certified: false,
  };

  const handleSubmit = async (values) => {
    // TODO: ...
  };

  return (
    <Page>
      <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>

        {/** Progress */}
        <Box pt={4} pb={4} pl={2} pr={2}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/** Form */}
        <Box pl={2} pr={2} pb={4}>
          <Card>
            <Formik
              initialValues={formValues}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
            >
              <FormikForm>
                <Grid container spacing={2}>
                  <PrimaryContactInformation />
                  <TravelInformation />
                  <SelfIsolationPlan />
                  <Certify />
                </Grid>
              </FormikForm>
            </Formik>
          </Card>
        </Box>

      </Grid>
    </Page>
  );
};
