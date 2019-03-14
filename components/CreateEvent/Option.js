import React, { Component } from 'react';
import { Container, Content, Icon, Picker, Form } from "native-base";
import { connect } from 'react-redux';


class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type: null
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    this.setState({
        type: value
      });
      this.props.updatePostType(value)
      if(value == 'post' || value == 'event'){
        this.props.navigation.navigate('createEvent')
      }
      
      if(value == 'homework' || value == 'question'){
        this.props.navigation.navigate('createQuestion')
      }
  }

  render() {
      const { type } = this.state;
    return (
        <Container>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="School"
              placeholder="Select the type of post"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ width: undefined }}
              selectedValue={type}
              onValueChange={this.onValueChange}
            >
              <Picker.Item label="New homework question" value="homework" />
              <Picker.Item label="New general question" value="question" />
              <Picker.Item label="New post" value="post" />
              <Picker.Item label="New event post" value="event" />
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
    return {
      updatePostType: (postType) => dispatch({
        type: 'POST_TYPE',
        payload: {
          postType
        }
      })
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(Option);