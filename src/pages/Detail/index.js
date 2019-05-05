import React, { Component } from 'react';
import BasicDetailInfo from './components/BasicDetailInfo';
import Comment from './components/Comment';
import PostComment from './components/PostComment';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-page">
        {/* 基础详情信息展示 */}
        <BasicDetailInfo />
        {/* 适用于多卡片信息的展示 */}
        <Comment />
        {/* 内容编辑器 */}
        <PostComment />
      </div>
    );
  }
}
