import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Hidden from '@material-ui/core/Hidden';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Formik, Form as FormikForm } from 'formik';
import { useHistory } from 'react-router-dom';

import { FormSchema, Routes } from '../../constants';

import { SectionOne } from './SectionOne';
import { SectionTwo } from './SectionTwo';
import { SectionThree } from './SectionThree';
import { SectionFour } from './SectionFour';
import { SectionFive } from './SectionFive';
import { SectionSix } from './SectionSix';
import { Card, Button } from '../../components/generic';

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
      return [
        'hasDownloadedBCMinistryAgricultureCovid19Requirements',
        'hasCompletedCovid19WorkplaceRiskAssessment',
        'hasCreatedCovid19InfectionPreventionAndControlProtocol',
      ];
    case 1:
      return [
        'registeredBusinessName',
        'firstName',
        'lastName',
        'phoneNumber',
        'alternatePhoneNumber',
        'emailAddress',
        'addressLine1',
        'addressLine2',
        'city',
        'province',
        'postalCode',
        'isSameAsBusinessAddress',
        'numberOfAdditionalAddresses',
        'temporaryForeignWorkerFacilityAddresses',
      ];
    case 2:
      return [
        'hasSignage',
        'hasSomeoneIdentified',
        'hasContactedLocalMedicalHealthOfficer',
        'doCommonAreasAllowPhysicalDistancing',
        'bedroomAccommodation',
        'areBedsInRightConfiguration',
        'doesUnderstandNeedsForSelfIsolation',
        'hasSeparateAccommodationForWorker',
        'hasLaundryServices',
        'hasDisposableGloves',
        'hasWasteRemovalSchedule',
        'hasSturdyLeakResistantGarbageBags',
        'hasHandWashingSinks',
        'hasAppropriateSupplyOfSinkWater',
        'hasPlainSoap',
        'hasPaperTowels',
        'hasHandWashingSigns',
        'hasSleepingArrangements',
        'hasPhysicalBarriers',
        'hasScheduleToEnsureTouchAreasAreCleaned',
      ];
    case 3:
      return [
        'hasMaterialsOnRiskOfExposure',
        'hasMaterialsOnHandWashingPhysicalDistancingCoughSneeze',
        'hasMaterialsOnHandWashingFacilities',
        'hasMaterialsReadyOnHowToSeekFirstAid',
        'hasMaterialsReadyOnHowToReportExposure',
        'hasSchedulesForKitchenEatingAreas',
        'doWorkersHaveOwnDishware',
        'isDishwareWashedImmediately',
      ];
    case 4:
      return [
        'hasFacilitiesToSeparateAndSelfIsolate',
        'isPreparedToProvideIndividualsExhibitingSymptoms',
        'isPreparedToDirectPersonToHealthLinkBC',
        'isPreparedToCleanAndDisinfectRooms',
        'isWillingToInformManagementAboutCommercialAccommodation',
        'isAbleToProvideFoodInSafeManner',
        'isAbleToPerformAdequateHousekeeping',
        'isAbleToPerformWasteManagement',
      ];
    case 5:
      return [
        'doesCertify',
        'doesAgree',
      ];

    default:
      return [];
  }
}

export const Form = ({ initialValues, isDisabled }) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const formValues = initialValues ? initialValues : {

    // First section
    hasDownloadedBCMinistryAgricultureCovid19Requirements: false,
    hasCompletedCovid19WorkplaceRiskAssessment: false,
    hasCreatedCovid19InfectionPreventionAndControlProtocol: false,

    // Second section
    registeredBusinessName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    emailAddress: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: '',
    postalCode: '',
    isSameAsBusinessAddress: true,
    numberOfAdditionalAddresses: 1,
    temporaryForeignWorkerFacilityAddresses: [],

    // Third section
    hasSignage: false,
    hasSomeoneIdentified: false,
    hasContactedLocalMedicalHealthOfficer: false,
    doCommonAreasAllowPhysicalDistancing: false,
    bedroomAccommodation: null,
    areBedsInRightConfiguration: false,
    doesUnderstandNeedsForSelfIsolation: false,
    hasSeparateAccommodationForWorker: false,
    hasLaundryServices: false,
    hasDisposableGloves: false,
    hasWasteRemovalSchedule: false,
    hasSturdyLeakResistantGarbageBags: false,
    hasHandWashingSinks: false,
    hasAppropriateSupplyOfSinkWater: false,
    hasPlainSoap: false,
    hasPaperTowels: false,
    hasHandWashingSigns: false,
    hasSleepingArrangements: false,
    hasPhysicalBarriers: false,
    hasScheduleToEnsureTouchAreasAreCleaned: false,

    // Fourth section
    hasMaterialsOnRiskOfExposure: false,
    hasMaterialsOnHandWashingPhysicalDistancingCoughSneeze: false,
    hasMaterialsOnHandWashingFacilities: false,
    hasMaterialsReadyOnHowToSeekFirstAid: false,
    hasMaterialsReadyOnHowToReportExposure: false,
    hasSchedulesForKitchenEatingAreas: false,
    doWorkersHaveOwnDishware: false,
    isDishwareWashedImmediately: false,

    // Fifth section
    hasFacilitiesToSeparateAndSelfIsolate: false,
    isPreparedToProvideIndividualsExhibitingSymptoms: false,
    isPreparedToDirectPersonToHealthLinkBC: false,
    isPreparedToCleanAndDisinfectRooms: false,
    isWillingToInformManagementAboutCommercialAccommodation: false,
    isAbleToProvideFoodInSafeManner: false,
    isAbleToPerformAdequateHousekeeping: false,
    isAbleToPerformWasteManagement: false,

    // Sixth section
    doesCertify: false,
    doesAgree: false,
  };

  // TODO: Implement backend hookup...
  const handleSubmit = async (values) => {
    const { id } = (() => ({ id: 'abc' }))();
    history.push(Routes.Confirmation, { formValues: values, id });
    scrollUp();
  };

  const scrollUp = () => window.scrollTo(0, 0);

  const moveStepper = (index) => {
    setActiveStep(index);
  };

  const handleBackClicked = () => {
    moveStepper(activeStep - 1);
  };

  const handleNextClicked = async (submitForm, setTouched) => {
    if (isLastStep) {
      await submitForm();
    } else {
      const fieldsForCurrentStep = getStepFields(activeStep);
      const fieldsToTouch = {};
      fieldsForCurrentStep.forEach((field) => fieldsToTouch[field] = true);
      const errors = await setTouched(fieldsToTouch);
      const hasOutstandingErrors = Object.keys(errors).some((key) => fieldsForCurrentStep.includes(key));
      if (!hasOutstandingErrors) {
        scrollUp();
        moveStepper(activeStep + 1)
      }
    }
  };

  return (
    <Grid item xs={12} sm={isDisabled ? 12 : 11} md={isDisabled ? 12 : 10} lg={isDisabled ? 12 : 8} xl={isDisabled ? 12 : 6}>
      <Formik
        initialValues={formValues}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, setTouched }) => (
          <FormikForm>

            {!isDisabled && (
              <Box pt={4} pb={2} pl={2} pr={2}>
                <Card noPadding>

                  {/** Desktop Stepper */}
                  <Hidden xsDown>
                    <Stepper
                      alternativeLabel
                      activeStep={activeStep}
                    >
                      {steps.map((label, index) => (
                        <Step key={label}>
                          <StepButton onClick={() => moveStepper(index)}>
                            <StepLabel>{label}</StepLabel>
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                  </Hidden>

                  {/** Mobile Stepper - Text */}
                  <Hidden smUp>
                    <Box p={2}>
                      <Typography variant="body1" color="primary" gutterBottom>
                        Step {activeStep + 1} of {steps.length}
                      </Typography>
                      <Typography variant="body1">
                        <b>{activeStep + 1}. {steps[activeStep]}</b>
                      </Typography>
                    </Box>
                  </Hidden>
                </Card>
              </Box>
            )}

            <Box pt={2} pb={2} pl={2} pr={2}>
              <Card>

                {/** Form Sections */}
                {!isDisabled ? (
                  <Fragment>
                    {activeStep === 0 && <SectionOne isDisabled={isDisabled} />}
                    {activeStep === 1 && <SectionTwo isDisabled={isDisabled} />}
                    {activeStep === 2 && <SectionThree isDisabled={isDisabled} />}
                    {activeStep === 3 && <SectionFour isDisabled={isDisabled} />}
                    {activeStep === 4 && <SectionFive isDisabled={isDisabled} />}
                    {activeStep === 5 && <SectionSix handleEditClick={moveStepper} />}
                  </Fragment>
                ) : (
                  <SectionSix isDisabled />
                )}

                {/** Desktop Prev / Next */}
                {!isDisabled && (
                  <Hidden xsDown>
                    <Box mt={3}>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Grid container spacing={2}>
                            <Grid item>
                              <Button
                                disabled={isFirstStep}
                                onClick={handleBackClicked}
                                text="Back"
                                fullWidth={false}
                              />
                            </Grid>
                            <Grid item>
                              <Button
                                onClick={() => handleNextClicked(submitForm, setTouched)}
                                variant="contained"
                                color="primary"
                                fullWidth={false}
                                text={isLastStep ? 'Submit' : 'Next'}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Hidden>
                )}
              </Card>
            </Box>

            {/** Mobile Stepper - Prev / Next */}
            {!isDisabled && (
              <Hidden smUp>
                <Box pt={2} pb={4} pl={2} pr={2}>
                  <Card noPadding>
                    <MobileStepper
                      style={{ backgroundColor: '#FFFFFF' }}
                      steps={steps.length}
                      variant="text"
                      position="static"
                      activeStep={activeStep}
                      backButton={(
                        <Button
                          fullWidth={false}
                          text={(<Fragment><KeyboardArrowLeft /> Back</Fragment>)}
                          onClick={handleBackClicked} disabled={isFirstStep}
                        />
                      )}
                      nextButton={(
                        <Button
                          fullWidth={false}
                          text={(<Fragment>Next <KeyboardArrowRight /></Fragment>)}
                          onClick={() => handleNextClicked(submitForm, setTouched)} disabled={isLastStep}
                        />
                      )}
                    />
                  </Card>
                </Box>
              </Hidden>
            )}
          </FormikForm>
        )}
      </Formik>
    </Grid>
  );
};
