import React, { Component } from 'react';
import { Card, Rate, Input, InputNumber } from 'antd';
import style from './ReportCard.less';

export default class ReportCard extends Component {
  state = {
    comment: this.props.item.comment
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comment: nextProps.item.comment
    });
  }

  // 更新最终薪资
  handleReviewSalaryChange = (value) => {
    this.props.handleSalaryChange('review', value, this.props.item.id);
  }

  // 部长更新薪资意见
  handleFinalSalaryChange = (value) => {
    this.props.handleSalaryChange('final', value, this.props.item.id);
  }

  // 更新评分
  handleRateChange = (value) => {
    this.props.handleRateChange(value, this.props.item.id);
  }

  handleCommentChange = (value) => {
    this.setState({
      comment: value
    });
  }

  // 更新部长回评
  handleCommentSubmit = (value) => {
    this.props.handleCommentChange(value, this.props.item.id);
  }

  // 审核汇报卡片抬头
  renderTitle(item) {
    return (
      <div className={style.report_item_title}>
        <span>{item.username}</span>
        <span className={style.report_item_title_right}>{item.start_date + ' ~ ' + item.end_date}</span>
      </div>
    );
  }

  render() {
    const { item, currentUser } = this.props;
    const cardStyle = { width: '100%', 'margin': '0px auto', marginBottom: '10px' };
    if (this.props.type == 'review') {
      // 审核汇报卡片－可编辑
      return (
        <Card title={this.renderTitle(item)} style={cardStyle}>
          <div className={style.report_item_content}>
            <span className={style.report_item_title_span}>Ta的汇报：</span>
            {item.content}
          </div>
          <p className={style.report_item_suggestion}>
            <span className={style.report_item_title_span}>意见建议：</span>
            {item.suggestion}
          </p>
          <div className={style.report_item_comment}>
            <span className={style.report_item_title_span}>部长回评：</span>
            {
              item.status == 'expired'
              ? item.comment
              : <Input
                  type={'textarea'}
                  onBlur={e => this.handleCommentSubmit(e.target.value)}
                  onChange={e => this.handleCommentChange(e.target.value)}
                  value={this.state.comment}
                />
            }
          </div>
          {
            (item.status == 'expired')
            ? <Rate style={{fontSize: '18px'}} disabled allowHalf value={item.rate} />
            : <Rate style={{fontSize: '18px'}} onChange={this.handleRateChange} allowHalf defaultValue={item.rate} />
          }
          <div className={style.report_item_salary}>
            <span className={style.report_item_title_span}>部长薪资意见：</span>
            {
              (item.status == 'expired')
              ? <InputNumber max={400} disabled value={item.salary.review} />
              : <InputNumber onChange={this.handleReviewSalaryChange} max={400} defaultValue={item.salary.review} />
            }
          </div>
          {
            // 行政及以上角色有权限查看最终薪资
            (currentUser.role < 2)
            ? null
            : <div className={style.report_item_salary}>
                <span className={style.report_item_title_span}>Ta的最终薪资：</span>
                {
                  // 往期汇报无法修改薪资
                  (item.status == 'expired')
                  ? <InputNumber max={400} disabled value={item.salary.final} />
                  : <InputNumber onChange={this.handleFinalSalaryChange} max={400} defaultValue={item.salary.final} />
                }
              </div>
          }
        </Card>
      );
    } else {
      // 我的汇报－只读
      return (
        <Card title={item.start_date + ' ~ ' + item.end_date} style={cardStyle}>
          <p className={style.report_item_content}>
            <span className={style.report_item_title_span}>工作陈述：</span>
            {item.content}
          </p>
          <p className={style.report_item_suggestion}>
            <span className={style.report_item_title_span}>意见建议：</span>
            {item.suggestion}
          </p>
          <p className={style.report_item_comment}>
            <span className={style.report_item_title_span}>回评：</span>
            {item.comment}
          </p>
          <Rate style={{fontSize: '18px'}} disabled allowHalf value={item.rate} />
        </Card>
      );
    }
  }
}