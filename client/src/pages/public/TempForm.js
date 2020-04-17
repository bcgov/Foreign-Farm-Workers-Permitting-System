import React, { useState } from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Formik, Form as FormikForm, useFormikContext } from 'formik';

import { dateToString } from '../../utils';
import { FormSchema } from '../../constants';

import { Card, Page } from '../../components/generic';
import { Certify } from '../../components/form/Certify';
import { PrimaryContactInformation } from '../../components/form/PrimaryContactInformation';
import { SelfIsolationPlan } from '../../components/form/SelfIsolationPlan';
import { TravelInformation } from '../../components/form/TravelInformation';

const steps = [
  'Before You Begin',
  'Contact Information',
  'Before Workers Arrive',
  'After Workers Arrive',
  'If Workers Become Ill',
  'Review',
];

function getStepFields(step) {
  switch (step) {
    case 0:
      return ['firstName', 'lastName', 'dob', 'telephone', 'email', 'address', 'city', 'province', 'postalCode'];
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const PrevNext = ({ activeStep, onBack, onNext }) => {
  const { submitForm, setTouched } = useFormikContext();
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleBackClicked = () => {
    onBack();
  };

  const handleNextClick = async () => {
    if (isLastStep) {
      await submitForm();
    } else {
      const relevantFields = getStepFields(activeStep);
      const fieldsToTouch = {};
      relevantFields.forEach((field) => fieldsToTouch[field] = true);
      const errors = await setTouched(fieldsToTouch);
      const hasOutstandingErrors = Object.keys(errors).some((key) => relevantFields.includes(key));
      if (!hasOutstandingErrors) onNext();
    }
  };

  return (
    <Box mt={3}>
      <Button
        disabled={isFirstStep}
        onClick={handleBackClicked}
      >
        Back
      </Button>
      <Button
        onClick={handleNextClick}
        variant="contained"
        color="primary"
      >
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </Box>
  );
};

export default () => {
  const [activeStep, setActiveStep] = useState(0);

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

    // Certified
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

  return (
    <Page>
      <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>

        {/** Progress */}
        <Box pt={4} pb={4} pl={2} pr={2}>
          <Card>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
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
                {activeStep === 0 && <PrimaryContactInformation />}
                {activeStep === 1 && <TravelInformation />}
                {activeStep === 2 && <SelfIsolationPlan />}
                {activeStep === 3 && <Certify />}
                <PrevNext
                  activeStep={activeStep}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              </FormikForm>
            </Formik>
          </Card>
        </Box>
      </Grid>
    </Page>
  );
};
