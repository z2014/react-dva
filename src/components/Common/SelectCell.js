import React, { Component, PropTypes } from 'react';
import {Select} from 'antd';
const Option = Select.Option;

export default class SelectCell extends Component {
  state = {
    value: this.props.value
  }

  static defaultProps = {
    item: null,
    onChange: function() {},
    type: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
    this.props.onChange(this.props.type, this.props.item, value);
  }

  render() {
    return(
      <Select value={this.state.value} style={{ width: 100 }} onChange={this.handleChange} >
        {
          this.props.values.map(item => {
            return <Option key={item.key} value={item.text}>{item.text}</Option>
          })
        }
      </Select>
    );
  }
}