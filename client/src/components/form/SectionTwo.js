import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field, FieldArray, useFormikContext } from 'formik';

import { Card, Divider } from '../../components/generic';
import { RenderCheckbox, RenderRadioGroup, RenderSelectField, RenderTextField } from '../../components/fields';

const provinces = [
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
];

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
    <Card noPadding={isDisabled} noShadow={isDisabled}>
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
          <Divider isLight />
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
            label="Alternate phone number (optional)"
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
          <Divider isLight />
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
            label="Address line 2 (optional)"
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
            options={provinces}
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
          <Divider isLight />
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
          <Grid item xs={12} sm={6}>
            <Field
              name="numberOfAdditionalAddresses"
              component={RenderSelectField}
              label="Number of additional addresses?"
              disabled={isDisabled}
              options={[...Array(15)].map((_, index) => ({
                value: index + 1,
                label: index + 1,
              }))}
            />
          </Grid>
        )}

        {isSameAsBusinessAddress === false && (
          <Grid item xs={12}>
            <FieldArray
              name="temporaryForeignWorkerFacilityAddresses"
              render={() => (
                <Grid container spacing={3}>
                  {temporaryForeignWorkerFacilityAddresses.map((item, index) => (
                    <Grid key={index} item xs={12}>
                      <Card>
                        <Grid container spacing={3}>

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
                              component={RenderRadioGroup}
                              label="Facility type"
                              disabled={isDisabled}
                              options={[
                                { value: 'working', label: 'Where the TFWs will be working' },
                                { value: 'housed', label: 'Where the TFWs will be housed' },
                              ]}
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
                              label="Address line 2 (optional)"
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
                              component={RenderSelectField}
                              label="Province"
                              disabled={isDisabled}
                              options={provinces}
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
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
