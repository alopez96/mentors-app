import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View,
  TouchableOpacity, Image } from 'react-native';
import SignUpForm from './SignUpForm';
import Toast, {DURATION} from'react-native-easy-toast';

export default class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            name: '',
            email: '',
            password: '',
        };
    }
    
    validateInput = () => {
        const { name, email, password } = this.state;
        let errors = {};
        if (name == null || email.length == 0){
            errors['name'] = 'Please enter your full name'
        }
        if (email == null || !email.includes('@ucsc.edu')){
            errors['email'] = 'Email must be a UCSC email'
        }
        if (password == null || password.length < 8){
            errors['password'] = 'Password must be at least 8 letters'
            this.setState({ errors });
        }
        if (Object.keys(errors).length == 0){
        //submitData()
        }
        else {
            console.log(Object.values(errors))
            this.refs.toast.show(Object.values(errors).join(), 500)
        }
    }

    onNameInputChange = (nameInput) => {
        this.setState({name: nameInput});
    }

    onEmailInputChange = (emailInput) => {
        this.setState({email: emailInput});
    }

    onPasswordInputChange = (passwordInput) => {
        this.setState({password: passwordInput});
    }
    
    SubmitData = () => {
    fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password            
        })
    })
    .then(response => response.json())
    .then(user => {
    if(user.id){
        console.log('registered')
        // this.props.loadUser(user)
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
            <Text style={styles.title} >Unite</Text>
        </View>
        <View styles={styles.formContainer} >
            <SignUpForm
                onNameInputChange={this.onNameInputChange}
                onEmailInputChange={this.onEmailInputChange}
                onPasswordInputChange={this.onPasswordInputChange}>
            </SignUpForm>

            <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
                returnKeyType='go'
                onPress={this.validateInput}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.blackText}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
        <Toast ref="toast"/>
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
  blackText:{
    color:'#000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30
  }
  
});
