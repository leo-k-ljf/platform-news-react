import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Button, Dialog, Input, Select, Calendar, Message } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import moment from 'moment';

import { getInfo, getUser, putInfo } from '../../../../api/api'
import { loadavg } from 'os';

const Option = Select.Option

moment.locale('en',{
  longDateFormat: {
    L: "YYYY-MM-DD"
  }
});


export default class AccountPanel extends Component {
  static displayName = 'AccountPanel';


  constructor(props) {
    super(props);

    this.state = {
      date: null,
      data: {
        address: null,
        birthday: null,
        createTime: null,
        email: null,
        gender: null,
        id: null,
        isDelete: null,
        name: null,
        phone: null
      }
    };


    if (!localStorage.getItem("infoId")) {
      if (localStorage.getItem("username")) {
        getUser(localStorage.getInfo("username"))
      } else {
        localStorage.setItem("infoId", 3)
      }
    }

    this.infoId = localStorage.getItem("infoId")
    console.log(this.infoId)

    getInfo(this.infoId).then((res) => {
      let t = this;
      t.setState({
        data: res.data.data
      })
    })


  }

  handleOpenEditPanel = () => {
    this.setState({ open: true });
  };

  handleCloseEditPanel = () => {
    this.setState({ open: false });
  };

  formChange = value => {
    this.setState({value})  
  };

  handleCalendarSelect = (time) => {
    let year = time.get('year')    
    let month = time.get('month')+1
    let day = time.get('date')
    let birthday = year + '-' + month + '-' + day
    console.log(birthday)
    this.setState({value:{"birthday":birthday}})
    this.setState({date:time})
  }

  submitEdit = () => {
    putInfo(this.infoId,this.state.value).then((res) => {
      console.log(res.data)
      if(res.data.status == 200){
        Message.show({content: res.data.msg})
        this.setState({ open: false });
        location.reload()
      }
    })
  }



  render() {
    return (
      <Container>
        <div style={styles.header}>
          <h2 style={styles.title}>账号信息</h2>
          <div>
            <Button onClick={this.handleOpenEditPanel} type="primary">
              修改
            </Button>
          </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>用户名</div>
          <div style={styles.infoDetail}> {this.state.data.name} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>性别</div>
          <div style={styles.infoDetail}> {this.state.data.gender} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>email</div>
          <div style={styles.infoDetail}> {this.state.data.email} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>电话</div>
          <div style={styles.infoDetail}>{this.state.data.phone} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>生日</div>
          <div style={styles.infoDetail}> {this.state.data.birthday} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>地址</div>
          <div style={styles.infoDetail}> {this.state.data.address} </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号头像</div>
          <div style={styles.infoDetail}>
            <img
              src={require('./images/avatar.jpg')}
              style={{ width: 120 }}
              alt=""
            />
          </div>
        </div>

        <Dialog
          visible={this.state.open}
          onOk={this.submitEdit}
          onClose={this.handleCloseEditPanel}
          onCancel={this.handleCloseEditPanel}
          title="修改用户信息"
        >
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
          >
            <div>
              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>用户名:</span>
                <FormBinder name="name" max={10} >
                  <Input style={{ width: 500 }} placeholder={this.state.data.name} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="name" />

              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>性别:</span>
                <FormBinder name="gender" max={10} >
                  <Select id="basic-demo" defaultValue={this.state.data.gender} aria-label="name is" showSearch hasClear>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="gender" />

              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>email:</span>
                <FormBinder name="email" max={20} >
                  <Input style={{ width: 500 }} placeholder={this.state.data.email} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="email" />

              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>电话:</span>
                <FormBinder name="phone" max={20} >
                  <Input style={{ width: 500 }} placeholder={this.state.data.phone} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="phone" />

              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>生日:</span>
                <FormBinder name="birthday" max={20} >
                  <div style={styles.calendar}>
                    <Calendar onSelect={this.handleCalendarSelect}  value={this.state.date }shape="card" />
                  </div>
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="birthday" />
              

              <div style={styles.fromItem}>
                <span style={styles.infoLabel}>地址:</span>
                <FormBinder name="address" max={30} >
                  <Input style={{ width: 500 }} placeholder={this.state.data.address} />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="name" />

            </div>
          </FormBinderWrapper>
        </Dialog>
      </Container>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    margin: 0,
    paddingBottom: 20,
  },
  infoRow: {
    padding: '16px 0',
    display: 'flex',
    borderBottom: '1px solid #f6f6f6',
  },
  infoLabel: {
    flex: '0 0 100px',
    color: '#999',
  },
  infoDetail: {},

  fromItem: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: 15,
  },
  calendar: {
    width: '300px',
    border: '1px solid #C4C6CF',
    borderRadius: '3px',
    padding: '8px',
  }
};
