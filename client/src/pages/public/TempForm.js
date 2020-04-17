import React, { useState } from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Formik, Form as FormikForm } from 'formik';

import { dateToString } from '../../utils';
import { FormSchema } from '../../constants';

import { Card, Page } from '../../components/generic';
import { Certify } from '../../components/form/Certify';
import { PrimaryContactInformation } from '../../components/form/PrimaryContactInformation';
import { SelfIsolationPlan } from '../../components/form/SelfIsolationPlan';
import { TravelInformation } from '../../components/form/TravelInformation';

export default () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Before You Begin',
    'Contact Information',
    'Before Workers Arrive',
    'After Workers Arrive',
    'If Workers Become Ill',
    'Review',
  ];

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (index) => {
    setActiveStep(index);
  };

  return (
    <Page>
      <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>

        {/** Progress */}
        <Box pt={4} pb={4} pl={2} pr={2}>
          <Card>
            <Stepper
              alternativeLabel
              nonLinear
              activeStep={activeStep}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={() => handleStep(index)} completed={false}>
                    <StepLabel>{label}</StepLabel>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Card>
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
                  {activeStep === 0 && <PrimaryContactInformation />}
                  {activeStep === 1 && <TravelInformation />}
                  {activeStep === 2 && <SelfIsolationPlan />}
                  {activeStep === 3 && <Certify />}
                </Grid>
              </FormikForm>
            </Formik>
          </Card>
        </Box>

        {/** Prev / Next */}
        <Box>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>

      </Grid>
    </Page>
  );
};
