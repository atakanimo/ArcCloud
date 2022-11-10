import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Box, Button, Grid, Link, Checkbox} from '@mui/material';
import {commonStyles} from '../../Styles/Styles';
import AuthService from '../../Business/AuthService';
import {SaveConfiguration} from '../../Redux/Actions/Actions';
import {useNavigate} from 'react-router-dom';

export default function SignIn() {
  const {GetConfiguration} = AuthService;
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const {success, data, error} = await GetConfiguration(user);
    if (success == true) {
      SaveConfiguration(data);
      navigate('/myCompany');
    } else {
      let response = error.response.data;
      console.log(response, 'response');
    }
    setLoading(false);
  };

  const styles = {
    formArea: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      // backgroundColor: 'red',
      flexDirection: 'column',
      flex: 1,
    },
  };
  // if (loading == true) {
  //   return <div>...Loading</div>;
  // }

  const onChangeText = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };
  return (
    <Box sx={commonStyles.boxStyle}>
      <div style={styles.formArea}>
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} sx={{mt: 1}}>
          <InputComponent label={'Email Address'} name={'username'} autoComplete={'email'} onChangeText={onChangeText} />
          <InputComponent label={'Password'} name={'password'} type={'password'} onChangeText={onChangeText} />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2, height: 50}}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Copyright sx={{mt: 8, mb: 4}} />
      </div>
    </Box>
  );
}
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.advanco.com/">
        Advanco
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const InputComponent = ({onChangeText, label, type, autoComplete, name}) => {
  return (
    <TextField
      required
      margin="normal"
      onChange={onChangeText}
      fullWidth
      label={label}
      name={name}
      autoComplete={autoComplete ? autoComplete : null}
      autoFocus
      type={type}
    />
  );
};
