import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View,
  TouchableOpacity, Image } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';
import LoginForm from './LoginForm';


export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {  
        email: '',
        password: '',
    };
}

validateInput = () => {
  const { email, password } = this.state;
  console.log('validating input')
  let errors = {};
  if (email == null || !email.includes('@ucsc.edu')){
      errors['email'] = 'Email must be a UCSC email'
  }
  if (password == null || password.length < 3){
      errors['password'] = 'Password must be at least 3 letters'
      this.setState({ errors });
  }
  if (Object.keys(errors).length == 0){
      this.signInUser()
  }
  else {
      console.log(Object.values(errors))
      // this.refs.toast.show(Object.values(errors).join(), 500)
  }
}

onEmailInputChange = (emailInput) => {
  this.setState({email: emailInput});
}

onPasswordInputChange = (passwordInput) => {
  this.setState({password: passwordInput});
}



signInUser = () => {
  console.log('signin user')
  fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      email: this.state.email,
      password: this.state.password        
      })
  })
  .then(response => response.json())
    .then(user => {
      if(user.id){
        // this.props.loadUser(user)
        this.props.navigation.navigate('Main')
      }
    })
    .catch( err => console.log(err));
  }

  render() {
    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.logoContainer} >
            <Image style={styles.logo}
            source= {require('../../images/logo.png')}/>
            <Text style={styles.title} > Unite </Text>
      </View>
      <View styles={styles.formContainer} >
        <LoginForm
          onEmailInputChange={this.onEmailInputChange}
          onPasswordInputChange={this.onPasswordInputChange}>
        </LoginForm>

        <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
                returnKeyType='go'
                onPress={this.validateInput}>Login</Text>
            </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUpText}
        onPress={() => this.props.navigation.navigate('SignUp')} >Don't have an account?</Text>
      </TouchableOpacity>
      </View>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  }
  ,title:{
      color: '#fff',
      marginTop: 10,
      opacity: 0.9
  },
  formContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50
   },
   buttonText:{
     textAlign: 'center',
     color: '#fff',
     fontWeight: '700',   
    },
  forgotText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  signUpText:{
    color:'#000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30
  }
  
});
