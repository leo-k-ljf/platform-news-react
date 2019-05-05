import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select, SplitButton } from '@alifd/next';

import RichEditor from './RichEditor';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  handleSubmit = (values, errors) => {
    console.log('errors', errors, 'values', values);
    if (errors) {
      return false;
    }

    // ajax values
  };

  render() {
    return (
      <div className="content-editor">
        <IceContainer title="文章发布">
          <Form labelAlign="top" style={styles.form} >
           
            
            <FormItem label="描述">
              <Input.TextArea name="desc" placeholder="这里填写正文描述" />
            </FormItem>
            {/* <FormItem label="正文" required>
              <RichEditor name="body" />
            </FormItem> */}
            <FormItem label=" ">
              <Form.Submit validate type="primary" onClick={this.handleSubmit}>
                发布文章
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
