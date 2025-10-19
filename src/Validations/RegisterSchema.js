import * as yup from 'yup';

 const schema = yup.object({
    fullName: yup.string().required('Full Name is required').min(3, 'Name must be at least 3 characters'),
    userName: yup.string().required('User Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    phoneNumber: yup.string().required('Phone Number is required').min(10, 'Phone Number must be at least 10 characters'),
  })

  export default schema;