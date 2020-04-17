import React, { Fragment, useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PhoneIcon from '@material-ui/icons/Phone';
import { Formik, Form as FormikForm, Field, FieldArray, useFormikContext } from 'formik';

import { FormSchema } from '../../constants';

import { Card, Divider, Page } from '../../components/generic';
import { RenderCheckbox, RenderRadioGroup, RenderSelectField, RenderTextField } from '../../components/fields';

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
        'temporaryForeignWorkerFacilityAddresses',
      ];
  }
}




const SectionOne = () => {
  return (
    <Fragment>

      {/** Title */}
      <Typography variant="subtitle1" paragraph>
        Apply for authorization from the BC Provincial Health Officer to receive temporary
        foreign workers at your workplace and protect workers during the COVID-19 pandemic
      </Typography>
      <Typography variant="body1" paragraph>
        Farm operators must ensure a safe workplace for their workers and demonstrate proof
        of a COVID-19 Infection Prevention and Control (IPC) protocol with the Ministry of
        Agriculture. While you have workers on the farm, you are still subject to all
        provincial laws and regulations.
      </Typography>

      {/** First Block */}
      <Typography variant="subtitle2" paragraph>
        Before you complete this form:
      </Typography>
      <Divider />
      <Box pt={2} pb={2}>
        <ExpansionPanel>
          <Box pt={3.5} pb={3.5} pl={3} pr={3}>
            <Typography variant="body1" gutterBottom>
              <b>Download and read the Province of BC's COVID-19 farm guidance document:</b>
            </Typography>
            <Typography variant="body1">
              <Link
                href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-farms-farm-workers.pdf"
                target="noreferrer noopenner"
              >
                Protecting BC Farmers and Farm Workers During the COVID-19 Pandemic
              </Link>
            </Typography>
          </Box>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">
              <b>
                Complete a COVID-19 risk assessment of your farm operation by following the
                directions in the guidance document.
              </b>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1" paragraph>
              Assessing each section in the guidance document will help you identify areas
              that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
            </Typography>
            <Card style={{ backgroundColor: '#e6e8e9', padding: '18px', marginBottom: '16px' }}>
              <Typography variant="body1" paragraph>
                <b>Example: Physical Distancing Risk</b>
              </Typography>
              <Typography variant="body1" paragraph>
                If workers need to be transported to the work site in vehicles where a 2m distance
                cannot be maintained, this should be identified as a risk.
              </Typography>
              <Typography variant="body1">
                Farm operators can take practical actions to reduce the risk of disease transmission
                (see section 7 of the guidance document).
              </Typography>
            </Card>
            <Typography variant="body1" paragraph>
              Have you worked through all the sections in Protecting BC farmers and farm workers
              during the COVID-19 pandemic to identify the risks at your farm?
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">
              <b>Create your Infection Prevention and Control protocol.</b>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1" paragraph>
              By following the guidance document you will be developing an Infection Prevention
              and Control (IPC) protocol. For each section of the guide where you identified a risk,
              the risk needs to be controlled.
            </Typography>
            <Card style={{ backgroundColor: '#e6e8e9', padding: '18px', marginBottom: '16px' }}>
              <Typography variant="body1" paragraph>
                <b>Example: Physical Distancing Risk</b>
              </Typography>
              <Typography variant="body1">
                If your workers ride together in a vehicle to the work site, and you follow the instructions
                to increase cleaning and hygiene, and increase physical distancing, this will form your IPC
                plan for transportation (see section 7 of the guidance document).
              </Typography>
            </Card>
            <Typography variant="body1" paragraph>
              Have you decided what is needed on your farm to prevent or control the risk of the transmission
              of COVID-19?
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
      {/*<Divider />*/}
      <Box mt={3} mb={4}>
        <Alert severity="info" icon={<PhoneIcon />}>
          <Typography variant="body2">
            If you need assistance completing these risk assessment or infection prevention tasks, please
            contact the Ministry of Agriculture (Toll-free: 1-888-xxx-xxxx) for help.
          </Typography>
        </Alert>
      </Box>

      {/** Second Block */}
      <Typography variant="subtitle2" paragraph>
        After submitting this application you will be subject to a site inspection:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" gutterBottom>
            You <b>will be subject to a site inspection</b> of your farm worksites and accommodations prior to the
            release of temporary foreign workers after their mandatory 14 day self-isolation period.
          </Typography>
        </li>
        <li>
          <Typography variant="body1" gutterBottom>
            The Province of BC will use the information you provide through this online form for the site inspection
            that determines your compliance and readiness to receive workers.
          </Typography>
        </li>
      </ul>
      <Box mt={4} mb={4}>
        <Alert severity="warning">
          <Typography variant="body2" gutterBottom>
            <b>
              If you fail to comply with these requirements, the arrival of temporary foreign workers at your farm will
              be delayed or denied.
            </b>
          </Typography>
          <Typography variant="body2">
            (source:&nbsp;
            <Link
              href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-order-travellers-employers.pdf"
              target="noreferrer noopenner"
            >
              Order of the Provincial Health Officer / Travellers and Employers Order - April 14, 2020)
            </Link>
          </Typography>
        </Alert>
      </Box>

      {/** Third Block */}
      <Typography variant="subtitle2" paragraph>
        To begin your application, please certify:
      </Typography>
      <Field
        name="hasDownloadedBCMinistryAgricultureCovid19Requirements"
        component={RenderCheckbox}
        label={(
          <Typography component="span">
            I have downloaded and read the BC Ministry of Agriculture’s COVID-19 requirements,&nbsp;
            <Link
              href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-farms-farm-workers.pdf"
              target="noreferrer noopenner"
            >
              Protecting BC Farmers and Farm Workers During the COVID-19 Pandemic.
            </Link>
          </Typography>
        )}
      />
      <Field
        name="hasCompletedCovid19WorkplaceRiskAssessment"
        component={RenderCheckbox}
        label="I have completed a COVID-19 workplace risk assessment of my farm operation"
      />
      <Field
        name="hasCreatedCovid19InfectionPreventionAndControlProtocol"
        component={RenderCheckbox}
        label="I have created a COVID-19 Infection Prevention and Control Protocol"
      />
    </Fragment>
  );
};

const SectionTwo = () => {
  const { values, setFieldValue } = useFormikContext();
  const { isSameAsBusinessAddress, temporaryForeignWorkerFacilityAddresses } = values;

  useEffect(() => {
    if (isSameAsBusinessAddress === false) {
      setFieldValue('temporaryForeignWorkerFacilityAddresses', [{
        type: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
      }]);
    } else {
      setFieldValue('temporaryForeignWorkerFacilityAddresses', []);
    }
  }, [setFieldValue, isSameAsBusinessAddress]);

  return (
    <Fragment>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Typography variant="subtitle1" paragraph>
            Apply for authorization from the BC Provincial Health Officer to receive temporary
            foreign workers at your workplace and protect workers during the COVID-19 pandemic
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="registeredBusinessName"
            component={RenderTextField}
            label="Registered Business Name"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Primary Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="firstName"
            component={RenderTextField}
            label="First Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="lastName"
            component={RenderTextField}
            label="Last Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="phoneNumber"
            component={RenderTextField}
            label="Phone Number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="alternatePhoneNumber"
            component={RenderTextField}
            label="Alternate phone number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="emailAddress"
            component={RenderTextField}
            label="E-mail Address"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Business Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="addressLine1"
            component={RenderTextField}
            label="Address line 1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="addressLine2"
            component={RenderTextField}
            label="Address line 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="city"
            component={RenderTextField}
            label="City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="province"
            component={RenderSelectField}
            label="Province"
            options={[
              { value: 'Alberta', label: 'Alberta' },
              { value: 'British Columbia', label: 'British Columbia' },
              { value: 'Manitoba', label: 'Manitoba' },
              { value: 'New Brunswick', label: 'New Brunswick' },
              { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
              { value: 'Northwest Territories', label: 'Northwest Territories' },
              { value: 'Nova Scotia', label: 'Nova Scotia' },
              { value: 'Nunavut', label: 'Nunavut' },
              { value: 'Ontario', label: 'Ontario' },
              { value: 'Prince Edward Island', label: 'Prince Edward Island' },
              { value: 'Québec', label: 'Québec' },
              { value: 'Saskatchewan', label: 'Saskatchewan' },
              { value: 'Yukon', label: 'Yukon' },
              { value: 'Other', label: 'Other' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="postalCode"
            component={RenderTextField}
            label="Postal code"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Temporary Foreign Worker facility address(es)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Field
            name="isSameAsBusinessAddress"
            component={RenderCheckbox}
            label="Same as business address."
          />
        </Grid>

        {isSameAsBusinessAddress === false && (
          <Grid item xs={12}>
            <FieldArray
              name="temporaryForeignWorkerFacilityAddresses"
              render={arrayHelpers => (
                <Fragment>
                  {temporaryForeignWorkerFacilityAddresses.map((item, index) => (
                    <Grid container key={index} spacing={3}>

                      {/* Title */}
                      <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <Typography variant="subtitle2">Facility address {index + 1}</Typography>
                          </Grid>
                          <Grid item>
                            <Button color="secondary" onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Fields */}
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].type`}
                          component={RenderTextField}
                          label="Facility type"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].addressLine1`}
                          component={RenderTextField}
                          label="Address line 1"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].addressLine2`}
                          component={RenderTextField}
                          label="Address line 2"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].city`}
                          component={RenderTextField}
                          label="City"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].province`}
                          component={RenderTextField}
                          label="Province"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].postalCode`}
                          component={RenderTextField}
                          label="Postal code"
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Box mt={2}>
                    <Button
                      color="primary"
                      onClick={() => arrayHelpers.push({
                        type: '',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        province: '',
                        postalCode: '',
                      })}
                    >
                      Add another facility +
                    </Button>
                  </Box>
                </Fragment>
              )}
            />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

const SectionThree = () => {
  return (
    <Fragment>
      <Grid container spacing={3}>

        {/** First Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Before workers arrive at your farm, please certify
          </Typography>
          <Box mt={3} mb={1}>
            <Alert severity="warning">
              <Typography variant="body2" gutterBottom>
                <b>
                  All tasks in this form (checked or left blank) will be subject to inspection.
                </b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <b>
                  If you have not completed a task, you will need to show your inspector your plan
                  to complete it before your workers arrive.
                </b>
              </Typography>
            </Alert>
          </Box>
        </Grid>

        {/** Second Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Be COVID-19 Aware
          </Typography>
          <Typography variant="body1" paragraph>
            Farm operators need to make all farm workers aware of the risks of COVID-19 and be prepared
            if workers have questions about COVID-19.
          </Typography>
          <Field
            name="hasSignage"
            component={RenderCheckbox}
            label="I have signage in place in the appropriate language on how workers can protect themselves from COVID-19."
          />
          <Field
            name="hasSomeoneIdentified"
            component={RenderCheckbox}
            label="I have someone identified that workers can go to if they have questions on COVID-19."
          />
          <Field
            name="hasContactedLocalMedicalHealthOfficer"
            component={RenderCheckbox}
            label="I have contacted my local Medical Health Officer to alert them to the arrival of temporary foreign workers to the region."
          />
        </Grid>

        {/** Third Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Provide safe lodging and accommodation for all workers
          </Typography>
          <Typography variant="body1" gutterBottom>
            Farm operators must be able to provide accommodations that minimize crowding, social interactions,
            and provide sufficient physical distance (beds 2m apart and head-to-toe in shared accommodations).
          </Typography>
          <Field
            name="doCommonAreasAllowPhysicalDistancing"
            component={RenderCheckbox}
            label="Common areas allow physical distancing of 2m / 6ft at all times."
          />
          <Box mt={1}>
            <Field
              name="bedroomAccommodation"
              component={RenderRadioGroup}
              label="Do you have:"
              options={[
                { value: 'single', label: 'Single occupancy bedrooms' },
                { value: 'shared', label: 'Shared occupancy bedrooms' },
                { value: '', label: 'Both' },
              ]}
            />
          </Box>
        </Grid>

        {/** Fourth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Provide self-isolation space if any worker comes down with COVID-19-like symptoms
          </Typography>
          <Typography variant="body1" gutterBottom>
            Self-isolation of any worker that becomes ill is a critical part of preventing the spread of COVID-19.
          </Typography>
          <Field
            name="doesUnderstandNeedsForSelfIsolation"
            component={RenderCheckbox}
            label="I understand what is needed for a person to self-isolate."
          />
          <Field
            name="hasSeparateAccommodationForWorker"
            component={RenderCheckbox}
            label="I have separate accommodation to let a worker self-isolate away from other workers or have arranged for separate accommodation."
          />
        </Grid>

        {/** Fifth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Make sure laundry facilities are available and handled safely
          </Typography>
          <Typography variant="body1" gutterBottom>
            Laundry must be performed properly to ensure the spread and transmission of COVID-19, including using
            hot water for laundry machines and having adequate supply of detergent.
          </Typography>
          <Field
            name="hasLaundryServices"
            component={RenderCheckbox}
            label="I have laundry services available for regular use."
          />
        </Grid>

        {/** Sixth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Practice good waste management at your work site and housing
          </Typography>
          <Typography variant="body1" gutterBottom>
            Proper collection and removal of garbage is crucial to reducing the risk of disease transmission.
            This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy,
            leak resistant garbage bags for containing waste.
          </Typography>
          <Field
            name="hasDisposableGloves"
            component={RenderCheckbox}
            label="I have disposable gloves for the handling of garbage or there is access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer."
          />
          <Field
            name="hasWasteRemovalSchedule"
            component={RenderCheckbox}
            label="I have a waste removal schedule."
          />
          <Field
            name="hasSturdyLeakResistantGarbageBags"
            component={RenderCheckbox}
            label="I have sturdy, leak resistant garbage bags."
          />
        </Grid>

        {/** Seventh Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Have proper hand-washing facilities at your work site and housing
          </Typography>
          <Typography variant="body1" gutterBottom>
            Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and
            other illnesses. Farm operators should ensure easy access to hand hygiene facilities either
            through hand hygiene stations or the provisions of hand sanitizer.
          </Typography>
          <Field
            name="hasHandWashingSinks"
            component={RenderCheckbox}
            label="I have disposable gloves for the handling of garbage or there is access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer."
          />
          <Field
            name="hasAppropriateSupplyOfSinkWater"
            component={RenderCheckbox}
            label="There is an appropriate supply of warm water for all sinks."
          />
          <Field
            name="hasPlainSoap"
            component={RenderCheckbox}
            label="I have provided plain soap."
          />
          <Field
            name="hasPaperTowels"
            component={RenderCheckbox}
            label="I have provided disposable paper towels."
          />
          <Field
            name="hasHandWashingSigns"
            component={RenderCheckbox}
            label="I have put up signs to promote regular hand washing."
          />
        </Grid>

        {/** Eighth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Create and maintain physical distancing barriers
          </Typography>
          <Typography variant="body1" paragraph>
            Keeping a 2 meter distance between people is one of the most important ways to break the chain of
            transmission of COVID-19.  Farm operators can take practical steps to ensure physical distancing
            is maintained while workers are transported to or from the work site, while working indoors or
            outdoors, during break times.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Physical barriers such as the use of plexi-glass, face shields, masks, and other techniques can
            be used where physical distancing is not possible.
          </Typography>
          <Field
            name="hasSleepingArrangements"
            component={RenderCheckbox}
            label="I have sleeping arrangements that maintains physical distancing or uses physical barriers."
          />
          <Field
            name="hasPhysicalBarriers"
            component={RenderCheckbox}
            label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
          />
        </Grid>

        {/** Ninth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Have a cleaning and disinfecting schedule
          </Typography>
          <Typography variant="body1" gutterBottom>
            All common areas and surfaces should be cleaned at the start and end of each day. Examples of common
            areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular
            household cleaners are effective against COVID-19, following the instructions on the label.
          </Typography>
          <Field
            name="hasSchedule"
            component={RenderCheckbox}
            label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day."
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};


const SectionFour = () => {
  return (
    <Fragment>

    </Fragment>
  );
};

const SectionFive = () => {
  return (
    <Fragment>

    </Fragment>
  );
};

const SectionSix = () => {
  return (
    <Fragment>

    </Fragment>
  );
};

export default () => {
  const [activeStep, setActiveStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const initialValues = {

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
    temporaryForeignWorkerFacilityAddresses: [],

    // Third Section
    hasSignage: null,
    hasSomeoneIdentified: null,
    hasContactedLocalMedicalHealthOfficer: null,
    doCommonAreasAllowPhysicalDistancing: null,
    bedroomAccommodation: null,
    doesUnderstandNeedsForSelfIsolation: null,
    hasSeparateAccommodationForWorker: null,
    hasLaundryServices: null,
    hasDisposableGloves: null,
    hasWasteRemovalSchedule: null,
    hasSturdyLeakResistantGarbageBags: null,
    hasHandWashingSinks: null,
    hasAppropriateSupplyOfSinkWater: null,
    hasPlainSoap: null,
    hasPaperTowels: null,
    hasHandWashingSigns: null,
    hasSleepingArrangements: null,
    hasPhysicalBarriers: null,
    hasSchedule: null,
  };

  const handleSubmit = async (values) => {
    // TODO: ...
  };

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
      // const relevantFields = getStepFields(activeStep);
      // const fieldsToTouch = {};
      // relevantFields.forEach((field) => fieldsToTouch[field] = true);
      // const errors = await setTouched(fieldsToTouch);
      // const hasOutstandingErrors = Object.keys(errors).some((key) => relevantFields.includes(key));
      // if (!hasOutstandingErrors) moveStepper(activeStep + 1);
      moveStepper(activeStep + 1);
    }
  };

  return (
    <Page>
      <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, setTouched }) => (
            <FormikForm>

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

              <Box pt={2} pb={2} pl={2} pr={2}>
                <Card>

                  {/** Form Sections */}
                  {activeStep === 0 && <SectionOne />}
                  {activeStep === 1 && <SectionTwo />}
                  {activeStep === 2 && <SectionThree />}
                  {activeStep === 3 && <SectionFour />}
                  {activeStep === 4 && <SectionFive />}
                  {activeStep === 5 && <SectionSix />}

                  {/** Desktop Prev / Next */}
                  <Hidden xsDown>
                    <Box mt={3}>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Button
                            disabled={isFirstStep}
                            onClick={handleBackClicked}
                          >
                            Back
                          </Button>
                          <Button
                            onClick={() => handleNextClicked(submitForm, setTouched)}
                            variant="contained"
                            color="primary"
                          >
                            {isLastStep ? 'Submit' : 'Next'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Hidden>
                </Card>
              </Box>

              {/** Mobile Stepper - Prev / Next */}
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
                        <Button size="small" onClick={handleBackClicked} disabled={isFirstStep}>
                          <KeyboardArrowLeft /> Back
                        </Button>
                      )}
                      nextButton={(
                        <Button size="small" onClick={() => handleNextClicked(submitForm, setTouched)} disabled={isLastStep}>
                          Next <KeyboardArrowRight />
                        </Button>
                      )}
                    />
                  </Card>
                </Box>
              </Hidden>
            </FormikForm>
          )}
        </Formik>
      </Grid>
    </Page>
  );
};
