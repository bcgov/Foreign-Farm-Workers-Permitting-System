import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const DeterminationSchema = yup.object().shape({
  determination: yup.string().oneOf(['incomplete', 'complete']).required('Determination is required'),
  notes: yup.string().required('Notes are required'),
});

// TODO ...
export const FormSchema = yup.object().noUnknown().shape({

});
