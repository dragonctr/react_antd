import 'antd/dist/antd.css'
import './App.css'
import React, {useState,Component} from 'react'
import { Form,Input,Radio,DatePicker,Cascader,Table,Button,InputNumber,Select } from 'antd'
import { render } from 'less'
import moment from 'moment'
const { RangePicker } = DatePicker
const {TextArea} = Input
const {Option} = Select

const App = () => {
  const [userName,setUserName] = useState(undefined);
  const [sexValue, setSexValue] = useState(1);
  const [birthStartDate, setBirthStartDate] = useState(moment());
  const [birthEndDate, setBirthEndDate] = useState();
  const [selectionType, setSelectionType] = useState('checkbox');
  const [flag,setFlag] = useState(true)

  let [form] = Form.useForm()
  form = {form}

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange=(e)=>{
    const filterName = e.target.value.replace(/[^\u4E00-\u9FA5]/g,'')
    setUserName(filterName)
  }
  const handleSex = (e) => {
    setSexValue(e.target.value);
  };

  const handleBirthDate=(param1,dataStr)=>{
    setBirthStartDate(moment(dataStr))
  }
  const handleEndDate=(param1,dataStr)=>{
    setBirthEndDate(moment(dataStr))
  }

  const disabledDate = (current) => {
    return current && current < moment(birthStartDate).endOf('day');
  };
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
    },
    {
      title:'籍贯',
      dataIndex: 'homeTown'
    },
    {
      title: '备注',
      dataIndex: 'other'
    }
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      sex: 'male',
      birthDate: '2000-00-00',
      homeTown: '河南',
      other: '无'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <div>
    <Form
      name="basic"
      labelCol={{
        offset: 4,
        span: 4,
      }}
      wrapperCol={{
        span: 4,
      }}
      initialValues={{
        username: userName,
        sex: sexValue,
        birthStartDate,
        birthEndDate
      }}
      setFieldsValue={({
        username: userName,
        sex: sexValue,
        birthStartDate,
        birthEndDate
      })=>{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="姓名"
        name="username"
        rules={[
          {
            max:5,
            message: '至多5位'
          }
        ]}
        validateTrigger={['onChange','onBlur']}
      >
        <Input onChange={handleChange} maxLength={5} value={userName}/>
      </Form.Item>
  
      <Form.Item
      label="性别"
      name="sex"
      >
        <Radio.Group onChange={handleSex}>
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="birthStartDate" label="开始出生日期">
        <DatePicker value={birthStartDate} onChange={handleBirthDate}/>
      </Form.Item>
      <Form.Item name="birthEndDate" label="结束出生日期">
        <DatePicker disabledDate={disabledDate} onChange={handleEndDate}/>
      </Form.Item>

      <Form.Item label="籍贯">
        <Cascader
          options={cityList}
        />
      </Form.Item>

      <Form.Item gutter={[20,30]} wrapperCol={{offset: 7,span: 6,}}>
        <Button>查询</Button>
        <Button>增加</Button>
        <Button>删除</Button>
      </Form.Item>
    </Form>
    <Form.Item wrapperCol={{offset:4,span:12}}>
      <Table rowSelection dataSource={data} columns={columns}/>
    </Form.Item>
    {flag===true?(<FormEdit></FormEdit>):null}
    </div>
  );
};
class FormEdit extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    return(
      <div>
        <Form
        labelCol={{
          offset: 4,
          span: 4,
        }}
        wrapperCol={{
          span: 4,
        }}
        initialValues={{
          sex:1
        }}
        >
          <Form.Item label="姓名" name="userName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <InputNumber min={0}></InputNumber>
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Select>
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          </Form.Item>
          <Form.Item label="出生日期" name="birthDate">
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item label="手机号码" name="number">
            <Input maxLength={11}></Input>
          </Form.Item>
          <Form.Item label="籍贯" name="homeTown">
            <Cascader></Cascader>
          </Form.Item>
          <Form.Item label="备注" name="other">
            <TextArea maxLength={150}></TextArea>
          </Form.Item>
          <Form.Item name="addButton" wrapperCol={{offset: 8,span: 6,}}>
            <Button type="primary">增加</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const cityList = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
      },
      {
        value: 'ningbo',
        label: '宁波',
      },
      {
        value: 'wenzhou',
        label: '温州',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'suqian',
        label: '宿迁',
      },
    ],
  },
  {
    value: 'henan',
    label: '河南',
    children: [
      {
        value: 'nanyang',
        label: '南阳',
      },
    ],
  },
]

export default App;