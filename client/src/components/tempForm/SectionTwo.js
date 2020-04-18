import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field, FieldArray, useFormikContext } from 'formik';

import { Divider } from '../../components/generic';
import { RenderCheckbox, RenderSelectField, RenderTextField } from '../../components/fields';

export const SectionTwo = ({ isDisabled }) => {
  const { values, setFieldValue } = useFormikContext();
  const { isSameAsBusinessAddress, numberOfAdditionalAddresses, temporaryForeignWorkerFacilityAddresses } = values;

  useEffect(() => {
    if (isSameAsBusinessAddress === false) {
      if (numberOfAdditionalAddresses > temporaryForeignWorkerFacilityAddresses.length) {
        const numberOfFieldsToAdd = numberOfAdditionalAddresses - temporaryForeignWorkerFacilityAddresses.length;
        let newFields = [];
        [...Array(numberOfFieldsToAdd)].forEach(() => newFields.push({
          type: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          province: '',
          postalCode: '',
        }));
        const newValue = [...temporaryForeignWorkerFacilityAddresses, ...newFields];
        setFieldValue('temporaryForeignWorkerFacilityAddresses', newValue);
      } else {
        const newValue = temporaryForeignWorkerFacilityAddresses.slice(0, numberOfAdditionalAddresses);
        setFieldValue('temporaryForeignWorkerFacilityAddresses', newValue);
      }
    }
  }, [setFieldValue, isSameAsBusinessAddress, numberOfAdditionalAddresses]);

  return (
    <Fragment>
      <Grid container spacing={2}>

        {!isDisabled && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" paragraph>
              Provide your business contact information
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

        <Grid item xs={12} sm={6}>
          <Field
            name="isSameAsBusinessAddress"
            component={RenderCheckbox}
            label="Same as business address."
            disabled={isDisabled}
          />
        </Grid>

        {isSameAsBusinessAddress === false && (
          <FieldArray
            name="temporaryForeignWorkerFacilityAddresses"
            render={() => (
              <Fragment>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="numberOfAdditionalAddresses"
                    component={RenderSelectField}
                    label="Number of additional addresses?"
                    disabled={isDisabled}
                    options={[
                      { value: 1, label: '1' },
                      { value: 2, label: '2' },
                      { value: 3, label: '3' },
                      { value: 4, label: '4' },
                      { value: 5, label: '5' },
                      { value: 6, label: '6' },
                      { value: 7, label: '7' },
                      { value: 8, label: '8' },
                      { value: 9, label: '9' },
                      { value: 10, label: '10' },
                    ]}
                  />
                </Grid>
                <Grid container spacing={3}>
                  {temporaryForeignWorkerFacilityAddresses.map((item, index) => (
                    <Grid key={index} item xs={12} container spacing={3}>

                      {/* Title */}
                      <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Typography variant="subtitle2">Facility address {index + 1}</Typography>
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
                </Grid>
              </Fragment>
            )}
          />
        )}
      </Grid>
    </Fragment>
  );
};
