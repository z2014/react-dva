import React, { Component } from 'react';

export default class MeetingEdit extends Component {
  handleClick = () => {
    this.props.seeMeeting(this.props.record)
  }
  handleEdit = () => {
    this.props.editMeeting(this.props.record)
  }
	render() {
    const {record} = this.props;
    if (record.status == '已召开') {
      return <a onClick={this.handleClick}>查看内容</a>;
    } else{
      return <a onClick={this.handleEdit}>编辑内容</a>;
    }
	}
}