import * as Yup from 'yup';

const ValidationRegisterSchema = Yup.object().shape({
    username:Yup.string().required("Username is required !!").matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no special characters."
      ),
    ProfileUrl:Yup.string().url("Must be valid link !!").notRequired(),
    email:Yup.string().email("Invalid email fromat !!").required("Email is required !!"),
    password:Yup.string().min(8,"Passwore must be at least 8 characters !!")
        .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
  )
    .required("Password is required !!"),
    conPassword:Yup.string()
    .oneOf([Yup.ref("password")],'Password must be match !!')
        .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
  )
    .required("Password is required !!"),
    checkbox:Yup.bool().oneOf([true],"You must agree all the terms"),
    gender: Yup.string()
        .required("Gender is required !!")
})


export default ValidationRegisterSchema;
