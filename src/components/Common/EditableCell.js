import React, { Component } from 'react';
import { Input } from 'antd';
export default class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }

  static defaultProps = {
    onChange: function() {},
    status: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      // if (nextProps.editable) {
      //   this.cacheValue = this.state.value;
      // }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'cancel') {
        this.setState({ value: nextProps.value });
        // this.props.onChange(this.cacheValue);
      } else if (nextProps.status === 'save') {
        // this.props.onChange(this.state.value);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { value, editable } = this.state;
    return (<div>
      {
        editable ?
        <div>
          <Input
            value={value}
            onChange={e => this.handleChange(e)}
          />
        </div>
        :
        <div className="editable-row-text">
          {value || ' '}
        </div>
      }
    </div>);
  }
}