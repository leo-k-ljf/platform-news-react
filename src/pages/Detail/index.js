import React, { Component } from 'react';
import BasicDetailInfo from './components/BasicDetailInfo';
import Comment from './components/Comment';
import PostComment from './components/PostComment';

export default class Detail extends Component {
  constructor(props) {
    super(props)
    if(this.props.history.action == "PUSH"){
      localStorage.setItem("newsId",this.props.location.query.id)
      localStorage.setItem("title",this.props.location.query.title)
    }
    this.state = {
      id: localStorage.getItem("newsId"),
      title: localStorage.getItem("title")
    };

  }

  render() {
    return (
      <div className="detail-page">
        {/* 基础详情信息展示 */}
        <BasicDetailInfo id={this.state.id} title={this.state.title}/>
        {/* 适用于多卡片信息的展示 */}
        <Comment id={this.state.id} />
        {/* 内容编辑器 */}
        <PostComment id={this.state.id}/>
      </div>
    );
  }
}
