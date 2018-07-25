import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from "./index.css"

/**
 * @description 这个是一个组件的例子，请自行修改类明和描述
 * @author 
 * @export
 * @class Demo
 * @extends {Component}
 */
export default class Demo extends Component {
  static propTypes = {
    demoString: PropTypes.string.isRequired
  }
  
  render() {
    return (
      <div className={style.demoDiv}>
        {this.props.demoString}
      </div>
    )
  }
}
