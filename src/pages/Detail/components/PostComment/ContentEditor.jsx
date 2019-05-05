import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, SplitButton } from '@alifd/next';
import {  postComment } from '../../../../api/api'

import RichEditor from './RichEditor';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  constructor(props){
    super(props)
    console.log(this.props)
  }

  handleSubmit = (values, errors) => {
    console.log('errors', errors, 'values', values);
    if (errors) {
      return false;
    }

    let params = {
      text: values.text,
      pubName: localStorage.getItem("username"),
      newsId: this.props.id
    }
    postComment(params).then( res => {
      console.log(res.data)
    })

    // ajax values
  };

  render() {
    return (
      <div className="content-editor">
        <IceContainer title="发布评论">
          <Form labelAlign="top" style={styles.form} >
           
            <FormItem label="">
              <Input.TextArea name="text" placeholder="这里填写评论" />
            </FormItem>
            {/* <FormItem label="正文" required>
              <RichEditor name="body" />
            </FormItem> */}
            <FormItem label=" ">
              <Form.Submit validate type="primary" onClick={this.handleSubmit}>
                发布
                </Form.Submit>
            </FormItem>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
