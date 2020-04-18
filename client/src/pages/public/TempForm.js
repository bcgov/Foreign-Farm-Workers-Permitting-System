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
import EditIcon from '@material-ui/icons/Edit';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
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
    case 2:
      return [
        'hasSignage',
        'hasSomeoneIdentified',
        'hasContactedLocalMedicalHealthOfficer',
        'doCommonAreasAllowPhysicalDistancing',
        'bedroomAccommodation',
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
  }
}

const SectionOne = ({ isDisabled }) => {
  return (
    <Fragment>

      {!isDisabled && (
        <Fragment>
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
        </Fragment>
      )}

      {/** Third Block */}
      {!isDisabled && (
        <Typography variant="subtitle2" paragraph>
          To begin your application, please certify:
        </Typography>
      )}
      <Field
        name="hasDownloadedBCMinistryAgricultureCovid19Requirements"
        component={RenderCheckbox}
        disabled={isDisabled}
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
        disabled={isDisabled}
      />
      <Field
        name="hasCreatedCovid19InfectionPreventionAndControlProtocol"
        component={RenderCheckbox}
        label="I have created a COVID-19 Infection Prevention and Control Protocol"
        disabled={isDisabled}
      />
    </Fragment>
  );
};

const SectionTwo = ({ isDisabled }) => {
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

        {!isDisabled && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" paragraph>
              Apply for authorization from the BC Provincial Health Officer to receive temporary
              foreign workers at your workplace and protect workers during the COVID-19 pandemic
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Field
            name="registeredBusinessName"
            component={RenderTextField}
            label="Registered Business Name"
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="lastName"
            component={RenderTextField}
            label="Last Name"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="phoneNumber"
            component={RenderTextField}
            label="Phone Number"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="alternatePhoneNumber"
            component={RenderTextField}
            label="Alternate phone number"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="emailAddress"
            component={RenderTextField}
            label="E-mail Address"
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="addressLine2"
            component={RenderTextField}
            label="Address line 2"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="city"
            component={RenderTextField}
            label="City"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="province"
            component={RenderSelectField}
            label="Province"
            disabled={isDisabled}
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
            disabled={isDisabled}
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
            disabled={isDisabled}
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
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Typography variant="subtitle2">Facility address {index + 1}</Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="contained"
                              size="small"
                              onClick={() => arrayHelpers.remove(index)}
                              startIcon={<MinusIcon />}
                            >
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
                          disabled={isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].addressLine1`}
                          component={RenderTextField}
                          label="Address line 1"
                          disabled={isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].addressLine2`}
                          component={RenderTextField}
                          label="Address line 2"
                          disabled={isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].city`}
                          component={RenderTextField}
                          label="City"
                          disabled={isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].province`}
                          component={RenderTextField}
                          label="Province"
                          disabled={isDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name={`temporaryForeignWorkerFacilityAddresses[${index}].postalCode`}
                          component={RenderTextField}
                          label="Postal code"
                          disabled={isDisabled}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <Box mt={2}>
                    <Button
                      color="primary"
                      disabled={isDisabled}
                      endIcon={<PlusIcon />}
                      onClick={() => arrayHelpers.push({
                        type: '',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        province: '',
                        postalCode: '',
                      })}
                    >
                      Add another facility
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

const SectionThree = ({ isDisabled }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>

        {/** First Block */}
        {!isDisabled && (
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
        )}

        {/** Second Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Be COVID-19 Aware
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" paragraph>
              Farm operators need to make all farm workers aware of the risks of COVID-19 and be prepared
              if workers have questions about COVID-19.
            </Typography>
          )}
          <Field
            name="hasSignage"
            component={RenderCheckbox}
            label="I have signage in place in the appropriate language on how workers can protect themselves from COVID-19."
            disabled={isDisabled}
          />
          <Field
            name="hasSomeoneIdentified"
            component={RenderCheckbox}
            label="I have someone identified that workers can go to if they have questions on COVID-19."
            disabled={isDisabled}
          />
          <Field
            name="hasContactedLocalMedicalHealthOfficer"
            component={RenderCheckbox}
            label="I have contacted my local Medical Health Officer to alert them to the arrival of temporary foreign workers to the region."
            disabled={isDisabled}
          />
        </Grid>

        {/** Third Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Provide safe lodging and accommodation for all workers
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              Farm operators must be able to provide accommodations that minimize crowding, social interactions,
              and provide sufficient physical distance (beds 2m apart and head-to-toe in shared accommodations).
            </Typography>
          )}
          <Field
            name="doCommonAreasAllowPhysicalDistancing"
            component={RenderCheckbox}
            label="Common areas allow physical distancing of 2m / 6ft at all times."
            disabled={isDisabled}
          />
          <Box mt={1}>
            <Field
              name="bedroomAccommodation"
              component={RenderRadioGroup}
              label="Do you have:"
              disabled={isDisabled}
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
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              Self-isolation of any worker that becomes ill is a critical part of preventing the spread of COVID-19.
            </Typography>
          )}
          <Field
            name="doesUnderstandNeedsForSelfIsolation"
            component={RenderCheckbox}
            label="I understand what is needed for a person to self-isolate."
            disabled={isDisabled}
          />
          <Field
            name="hasSeparateAccommodationForWorker"
            component={RenderCheckbox}
            label="I have separate accommodation to let a worker self-isolate away from other workers or have arranged for separate accommodation."
            disabled={isDisabled}
          />
        </Grid>

        {/** Fifth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Make sure laundry facilities are available and handled safely
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              Laundry must be performed properly to ensure the spread and transmission of COVID-19, including using
              hot water for laundry machines and having adequate supply of detergent.
            </Typography>
          )}
          <Field
            name="hasLaundryServices"
            component={RenderCheckbox}
            label="I have laundry services available for regular use."
            disabled={isDisabled}
          />
        </Grid>

        {/** Sixth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Practice good waste management at your work site and housing
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              Proper collection and removal of garbage is crucial to reducing the risk of disease transmission.
              This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy,
              leak resistant garbage bags for containing waste.
            </Typography>
          )}
          <Field
            name="hasDisposableGloves"
            component={RenderCheckbox}
            label="I have disposable gloves for the handling of garbage or there is access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer."
            disabled={isDisabled}
          />
          <Field
            name="hasWasteRemovalSchedule"
            component={RenderCheckbox}
            label="I have a waste removal schedule."
            disabled={isDisabled}
          />
          <Field
            name="hasSturdyLeakResistantGarbageBags"
            component={RenderCheckbox}
            label="I have sturdy, leak resistant garbage bags."
            disabled={isDisabled}
          />
        </Grid>

        {/** Seventh Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Have proper hand-washing facilities at your work site and housing
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and
              other illnesses. Farm operators should ensure easy access to hand hygiene facilities either
              through hand hygiene stations or the provisions of hand sanitizer.
            </Typography>
          )}
          <Field
            name="hasHandWashingSinks"
            component={RenderCheckbox}
            label="I have disposable gloves for the handling of garbage or there is access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer."
            disabled={isDisabled}
          />
          <Field
            name="hasAppropriateSupplyOfSinkWater"
            component={RenderCheckbox}
            label="There is an appropriate supply of warm water for all sinks."
            disabled={isDisabled}
          />
          <Field
            name="hasPlainSoap"
            component={RenderCheckbox}
            label="I have provided plain soap."
            disabled={isDisabled}
          />
          <Field
            name="hasPaperTowels"
            component={RenderCheckbox}
            label="I have provided disposable paper towels."
            disabled={isDisabled}
          />
          <Field
            name="hasHandWashingSigns"
            component={RenderCheckbox}
            label="I have put up signs to promote regular hand washing."
            disabled={isDisabled}
          />
        </Grid>

        {/** Eighth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Create and maintain physical distancing barriers
          </Typography>
          {!isDisabled && (
            <Fragment>
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
            </Fragment>
          )}
          <Field
            name="hasSleepingArrangements"
            component={RenderCheckbox}
            label="I have sleeping arrangements that maintains physical distancing or uses physical barriers."
            disabled={isDisabled}
          />
          <Field
            name="hasPhysicalBarriers"
            component={RenderCheckbox}
            label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
            disabled={isDisabled}
          />
        </Grid>

        {/** Ninth Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Have a cleaning and disinfecting schedule
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              All common areas and surfaces should be cleaned at the start and end of each day. Examples of common
              areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular
              household cleaners are effective against COVID-19, following the instructions on the label.
            </Typography>
          )}
          <Field
            name="hasScheduleToEnsureTouchAreasAreCleaned"
            component={RenderCheckbox}
            label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day."
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const SectionFour = ({ isDisabled }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>

        {/** First Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" paragraph>
            After temporary foreign workers arrive at the farm
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" paragraph>
              Once your temporary foreign workers arrive at the farm, you are expected to continue your work
              following your infection prevention and control protocol and minimize the risk of transmission of
              COVID-19 through these key activities.
            </Typography>
          )}
        </Grid>

        {/** Second Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            Train workers on COVID-19 infection control
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" paragraph>
              Farm operators must provide workers with training in their language about the risk of COVID-19,
              safe work practices, and how to report symptoms.
            </Typography>
          )}
          <Field
            name="hasMaterialsOnRiskOfExposure"
            component={RenderCheckbox}
            label="I have materials ready on the risk of exposure of COVID-19 and the signs and symptoms of the disease."
            disabled={isDisabled}
          />
          <Field
            name="hasMaterialsOnHandWashingPhysicalDistancingCoughSneeze"
            component={RenderCheckbox}
            label="I have materials ready on hand washing, physical distancing, and cough/sneeze etiquette."
            disabled={isDisabled}
          />
          <Field
            name="hasMaterialsOnHandWashingFacilities"
            component={RenderCheckbox}
            label="I can provide locations of hand washing facilities, including dispensing stations for alcohol-based hand rubs."
            disabled={isDisabled}
          />
          <Field
            name="hasMaterialsReadyOnHowToSeekFirstAid"
            component={RenderCheckbox}
            label="I have materials ready on how to seek first aid."
            disabled={isDisabled}
          />
          <Field
            name="hasMaterialsReadyOnHowToReportExposure"
            component={RenderCheckbox}
            label="I have materials ready on how to report an exposure to or symptoms of COVID-19."
            disabled={isDisabled}
          />
        </Grid>

        {/** Third Block */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" paragraph>
            All farm operators and workers must practice good food handling and hygiene practices.
          </Typography>
          {!isDisabled && (
            <Typography variant="body1" gutterBottom>
              This includes safe food practices like protecting foods from contamination, minimizing direct handling
              of food and preventing cross contamination of foods.
            </Typography>
          )}
          <Field
            name="hasSchedulesForKitchenEatingAreas"
            component={RenderCheckbox}
            label="I have schedules in place for kitchen/eating areas to limit contact and maintain 2 metre physical distancing."
            disabled={isDisabled}
          />
          <Field
            name="doWorkersHaveOwnDishware"
            component={RenderCheckbox}
            label="Each worker has their own dishware, utensils and drinking cup or provide disposable alternatives."
            disabled={isDisabled}
          />
          <Field
            name="isDishwareWashedImmediately"
            component={RenderCheckbox}
            label="Used dishware will be washed immediately."
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const SectionFive = ({ isDisabled }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>

        {!isDisabled && (
          <Fragment>
            {/** First Block */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" paragraph>
                If workers become ill at the farm
              </Typography>
            </Grid>
          </Fragment>
        )}


        {/** Second Block */}
        <Grid item xs={12}>

          {!isDisabled && (
            <Fragment>
              <Typography variant="subtitle2" paragraph>
                Plan to manage individuals suspected with COVID-19 infection
              </Typography>
              <Typography variant="body1" paragraph>
                Farm operators must have an infection control protocol to deal with workers demonstrating symptoms
                of COVID-19 (fever, cough, sore throat), including immediate self-isolation of the worker and notifying
                the local health authority.
              </Typography>
              <Typography>
                If there is an outbreak where two or more workers becomes sick, you must notify the local&nbsp;
                <Link
                  href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/medical-health-officers"
                  rel="noreferrer noopener"
                >
                  Medical Health Officer
                </Link>
                &nbsp;of the outbreak.
              </Typography>
            </Fragment>
          )}

          <Field
            name="hasFacilitiesToSeparateAndSelfIsolate"
            component={RenderCheckbox}
            label="I have the facilities to promptly separate and self-isolate the individual from others in their own accommodation."
            disabled={isDisabled}
          />
          <Field
            name="isPreparedToProvideIndividualsExhibitingSymptoms"
            component={RenderCheckbox}
            label="I am prepared to provide individuals exhibiting symptoms of COVID-19 with a surgical/procedural mask or tissues to cover their mouth and nose."
            disabled={isDisabled}
          />
          <Field
            name="isPreparedToDirectPersonToHealthLinkBC"
            component={RenderCheckbox}
            label="I am prepared to direct the person to call HealthLinkBC (8-1-1)."
            disabled={isDisabled}
          />
          <Field
            name="isPreparedToCleanAndDisinfectRooms"
            component={RenderCheckbox}
            label=" am prepared to clean and disinfect any rooms that the person has been in while symptomatic."
            disabled={isDisabled}
          />
          <Field
            name="isWillingToInformManagementAboutCommercialAccommodation"
            component={RenderCheckbox}
            label="If commercial accommodation is being used to self-isolate, then I will inform management of the situation and necessary requirements."
            disabled={isDisabled}
          />
        </Grid>

        {/** Third Block */}
        {!isDisabled && (
          <Grid item xs={12}>
            <Box mb={3}>
              <Alert severity="warning">
                <Typography variant="body2">
                  <b>
                    As COVID-19 recommendations are evolving daily, please keep up-to-date with&nbsp;
                    <Link
                      href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19"
                      rel="noreferrer noopener"
                    >
                      BC Centre for Disease Control guidance.
                    </Link>
                  </b>
                </Typography>
              </Alert>
            </Box>

            <Typography variant="subtitle2" paragraph>
              Provide food for ill workers
            </Typography>

            <Box mt={1.5} mb={2}>
              <Field
                name="isAbleToProvideFoodInSafeManner"
                component={RenderCheckbox}
                label="I am able to provide food in a safe manner to a self-isolated worker."
                disabled={isDisabled}
              />
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1">
                    <b>What does this mean?</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Gloves are not required when delivering or picking up food trays.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Proper hand hygiene must be practiced before delivering and after picking up food trays.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Do NOT enter a room to deliver or pick up food trays for workers who are ill. Deliver and
                        pick up food trays from outside their door.
                      </Typography>
                    </li>
                  </ul>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>

            <Box mt={2} mb={2}>
              <Field
                name="isAbleToPerformAdequateHousekeeping"
                component={RenderCheckbox}
                label="I am able to perform adequate housekeeping for a self-isolated worker."
                disabled={isDisabled}
              />
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1">
                    <b>What does this mean?</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Site operators must identify and record the locations of all self-isolating guests.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Do NOT provide cleaning service inside rooms where people are in self-isolation.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Ensure staff do NOT enter self-isolation rooms until authorized.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Use alternate means of assisting workers in isolation, such as leaving fresh linens,
                        toiletries and cleaning supplies outside the door during the period of isolation.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Once the individual(s) in self-isolation have left a room, complete a thorough cleaning
                        of all hard surfaces with an approved disinfectant, launder all removable cloth items (sheets, towels).
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1">
                        Discard all personal soap and shampoo remnants.
                      </Typography>
                    </li>
                  </ul>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>

            <Box mt={2} mb={2}>
              <Field
                name="isAbleToPerformWasteManagement"
                component={RenderCheckbox}
                label="I am able to perform waste management for supporting a self-isolated worker."
                disabled={isDisabled}
              />
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1">
                    <b>What does this mean?</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ul>
                    <li>
                      <Typography variant="body1">
                        Wherever possible, waste from all self-isolation rooms should be handled by a designated person
                        or small, designated team.
                      </Typography>
                    </li>
                  </ul>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

const SectionSix = ({ handleEditClick }) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box mb={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    1. Declarations
                  </Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<EditIcon />} color="primary" variant="contained" size="small" onClick={() => handleEditClick(0)}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
            <SectionOne isDisabled />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box mb={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    2. Your business contact information
                  </Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<EditIcon />} color="primary" variant="contained" size="small" onClick={() => handleEditClick(1)}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
            <SectionTwo isDisabled />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box mb={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    3. Before workers arrive at your farm, please certify
                  </Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<EditIcon />} color="primary" variant="contained" size="small" onClick={() => handleEditClick(2)}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
            <SectionThree isDisabled />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box mb={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    4. After temporary foreign workers arrive at your farm
                  </Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<EditIcon />} color="primary" variant="contained" size="small" onClick={() => handleEditClick(3)}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
            <SectionFour isDisabled />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box mb={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    5. If workers become ill at the farm
                  </Typography>
                </Grid>
                <Grid item>
                  <Button startIcon={<EditIcon />} color="primary" variant="contained" size="small" onClick={() => handleEditClick(4)}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
            <SectionFive isDisabled />
          </Card>
        </Grid>
      </Grid>
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

    // Third section
    hasSignage: false,
    hasSomeoneIdentified: false,
    hasContactedLocalMedicalHealthOfficer: false,
    doCommonAreasAllowPhysicalDistancing: false,
    bedroomAccommodation: null,
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
                  {activeStep === 5 && <SectionSix handleEditClick={moveStepper} />}

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
