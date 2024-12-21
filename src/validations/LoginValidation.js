import * as Yup from 'yup';

const ValidationLoginSchema = Yup.object().shape({
    username:Yup.string().required("Username is required !!").matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no special characters."
      ),
    password:Yup.string().min(8,"Passwore must be at least 8 characters !!")
        .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
  )
    .required("Password is required !!"),
})

export default ValidationLoginSchema;
