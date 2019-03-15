import React, { Component } from 'react';
import { Container, Form, Picker, Icon, Item, Input, 
        Button, Text } from 'native-base';
import { connect } from 'react-redux';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
        role: undefined,
        school: ''
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value){
      this.setState({
          role: value
      })
  }

  submit = () => {
    fetch('http://localhost:3000/editProfile', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userid: this.props.user.id,
            role: this.state.role,
            school: this.state.school
        })
    })
    .then(user => {
        if(user){
            this.props.navigation.navigate('Main')
        }
        else{
            console.log('error updating user')
        }
        })
    .catch( err => console.log(err));
  }

  render() {
    return (
      <Container>
          <Form>
            <Picker style={{margin:20}}
              mode="dropdown"
              iosHeader="Role"
              placeholder="mentor or mentee?"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.role}
              onValueChange={this.onValueChange}
            >
              <Picker.Item label="Mentor" value="mentor" />
              <Picker.Item label="Mentee" value="mentee" />
              <Picker.Item label="Both" value="both" />
            </Picker>
          </Form>
          <Form>
            <Item style={{margin:20}}>
                <Input 
                placeholder="Enter school"
                label='school'
                onChangeText={(school) => this.setState({ school })}
                value={this.state.schol}
                />
            </Item>
          </Form>
          <Button transparent onPress={() => this.submit() }
          style={{margin:20, alignSelf: 'center'}}>
            <Text>Continue</Text>
          </Button>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Role);