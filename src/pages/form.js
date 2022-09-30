import React from 'react'
import { Form,Input,Radio,DatePicker,Cascader,Table,Col,Row } from 'antd'
const { RangePicker } = DatePicker

class FormComp extends React.Component{
  constructor(){
    super()
    this.state={
      value: null
    }
    this.handleValidate=()=>{
      console.log('1111',111)
      // this.setState({value:this.state.value.match()})
    }
  }
  render(){
    return(
      <Form>
        <Row>
          <Col span={12}><Input addonBefore='姓名111' value={this.state.value} onChange={this.handleValidate}></Input></Col>
          <Col span={12}><Radio></Radio></Col>
        </Row>
        <Row>
          <Col span={12}><DatePicker></DatePicker></Col>
          <Col span={12}><DatePicker></DatePicker></Col>
        </Row>
        <Row>
          <Cascader></Cascader>
        </Row>
      </Form>
    )
  }
}