import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, View,
  TouchableOpacity, Image,ScrollView } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';

export default class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            email: '',
            emailText: "Enter Your E-mail And We'll Send You A Link To Reset Your Password."
        };
    }
    
    validateInput = () => {
        const {  email } = this.state;
        let errors = {};
        if (email === null || email === ''){
            errors['email'] = 'Please Enter An E-mail'
        }
         if(!email.includes('@ucsc.edu')){
             errors['email'] = 'Email Must Be A UCSC E-mail'
         }
    }

    onEmailInputChange = (emailInput) => {
        this.setState({email: emailInput});
    }
      
    render() {
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer} >
            <Image style={styles.logo}
                source= {require('../../images/logo.png')}/>
            <Text style={styles.title} >Unite</Text>
        </View>
        <Text style={styles.emailText} onPress={this.onPressTitle}>
          {this.state.emailText}{'\n'}{'\n'}
        </Text>
        <View styles={styles.formContainer} >
        <ScrollView 
            scrollEnabled={false}
            contentContainerStyle={styles.main}
        >
            <TextInput 
            style={styles.input} 
            placeholder='email' 
            returnKeyType='next'
            onChangeText={this.props.onEmailInputChange}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            />  
            <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
                    returnKeyType='go'
                    onPress={this.validateInput}>Submit
                </Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles. backToLoginText}
                onPress={() => this.props.navigation.navigate('Login')}>
                    Back To Log In
                </Text>
            </TouchableOpacity>
            </ScrollView>
            
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
  emailText: {
    fontSize: 9,
    color:'#fff',
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '57%'


  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: 30,
    marginBottom: 80,
    color: '#fff',
    paddingHorizontal: 10
},
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
     
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
  backToLoginText:{
    color:'#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 60
  },
  buttonText:{
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',   
    
   },
   buttonContainer:{
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 110
    
   
   }
  
});
