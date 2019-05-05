import Container from '@icedesign/container';
import React, { Component } from 'react';
import fecha from 'fecha';

import { Pagination } from '@alifd/next';
import { getNews ,getCount} from '../../../../api/api';


const mokeDataTitle = [
  '【内容分类】获得更多曝光量！',
  '【活动入口已开启】2018造物节-达人图文内容招稿说明',
  '【微淘达人训练营第3期】L1&L2等级达人看过来，福利继续喽！',
  '【爆文创作挑战开启】6月爆文红榜美妆篇 ，五步掌握爆款技巧',
];

class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state ={
      list: [],
      total: 100
    }

    getCount().then( (res) => {
      this.setState({total:res.data.data})
    })

    getNews({page:1,limit:10}).then( (res) => {
      console.log(res.data.data)
      this.setState({list:res.data.data})
    })
  }

  handleChange = (current) => {
    console.log(current)
    getNews({page:current,limit:10}).then( (res) => {
      console.log(res.data.data)
      this.setState({list:res.data.data})
    })
  };

  render() {
    return (
      <Container>
        <h3 style={styles.header}>新闻列表</h3>
        <div>
          {this.state.list.map((notice, index) => {
            return (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                title={notice.name}
                href='#'
                style={styles.noticeItem}
              >
                <div>
                  <span style={styles.title}>{notice.name}</span>
                  {notice.top && (
                    <span style={{ ...styles.tag, ...styles.top }}>置顶</span>
                  )}
                </div>
                <span style={styles.time}>
                  {notice.publishTime}
                </span>
              </a>
            );
          })}
          <div style={{ textAlign: 'right', paddingTop: 20 }}>
            <Pagination total={this.state.total} onChange={this.handleChange} />
          </div>
        </div>
      </Container>
    );
  }
}

const styles = {
  header: {
    fontSize: 16,
    lineHeight: '16px',
    paddingBottom: 20,
    fontWeight: 700,
  },
  noticeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fafafa',
    lineHeight: '54px',
    height: 54,
    textDecoration: 'none',
  },
  title: {
    color: '#333',
  },
  tag: {
    fontSize: 12,
    lineHeight: '16px',
    marginLeft: 5,
    padding: '2px 8px',
    borderRadius: 20,
  },
  top: {
    backgroundColor: '#eff6ff',
    color: '#5e83fb',
  },
  hot: {
    backgroundColor: '#ffe8e8',
    color: '#ee706d',
  },
  new: {
    backgroundColor: '#fff4e2',
    color: '#f7da47',
  },
  time: { color: '#999' },
};

export default NoticeList;
