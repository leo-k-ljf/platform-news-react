import React, { Component } from 'react';
import { Icon, Grid } from '@alifd/next';
import Filter from './Filter';

import { getCommentList} from '../../../../api/api'

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 11 }).map((item, index) => {
    return {
      title: `淘宝首页-P${index}`,
      desc: `产品方案 - 共 ${index} 个埋点`,
      creator: '张明',
      leader: '淘小宝',
      time: '2017-06-05 14:03',
    };
  });
};

export default class CardList extends Component {
  static displayName = 'CardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    
    this.state = {
      list: []
    };

    let params = {
      newsId: this.props.id,
      page: 1,
      limit: 8
    }

    getCommentList(params).then(res => {
      console.log( res.data.data.length) 
      this.setState({
        list: res.data.data,
        count: res.data.data.lentgh
      })
    })
  
  }



  render() {
    return (
      <div style={styles.container}>
        {/* <Filter /> */}
        <Row wrap gutter="20">
          
          {this.state.list.map((item, index) => {
            return (
              <Col l="6" xs="12" xxs="24" key={index}>
                <div style={styles.card}>
                  <div style={styles.head}>
                    <h4 style={styles.title}>{item.pubName}</h4>
                    <p style={styles.desc}>{item.createTime}</p>
                  </div>
                  <div style={styles.body}>
                    <p style={{ ...styles.creator, ...styles.info }}>
                      {item.text}
                    </p>
                    {/* <p style={{ ...styles.leader, ...styles.info }}>
                      技术负责人：
                      {item.leader}
                    </p>
                    <p style={{ ...styles.time, ...styles.info }}>
                      创建时间：
                      {item.time}
                      <Icon type="edit" style={styles.editIcon} />;
                    </p> */}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fafafa',
  },
  createScheme: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '190px',
    cursor: 'pointer',
  },
  card: {
    displayName: 'flex',
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '6px',
  },
  head: {
    position: 'relative',
    padding: '16px 16px 8px',
    borderBottom: '1px solid #e9e9e9',
  },
  title: {
    margin: '0 0 5px',
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  desc: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  body: {
    position: 'relative',
    padding: '16px',
  },
  info: {
    margin: '0 0 8px',
    fontSize: '13px',
    color: '#666',
  },
  time: {
    position: 'relative',
  },
  addIcon: {
    marginRight: '10px',
  },
  editIcon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    cursor: 'pointer',
  },
};
