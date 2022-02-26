import React, {Component} from 'react';
import {Form, Button, InputNumber} from 'antd';

class SatSettingForm extends Component {

  // for Form.Item lable="...", the content of the label determines the name of the blank to be filled;
  // Decorator determines the format and rules of the input data and what variable will be assigned by those input data;
  // then the decorator will decorate all those input properties conformed with the format/style content;

  render() {
       const {getFieldDecorator} = this.props.form;
       const formItemLayout = {
           labelCol: {
               xs: { span: 24 },
               sm: { span: 11 },
           },
           wrapperCol: {
               xs: { span: 24 },
               sm: { span: 13 },
           },
       };
       return (
        <Form {...formItemLayout} className="sat-setting" onSubmit={this.showSatellite}>
            <Form.Item label="Longitude(degrees)">
                {
                    getFieldDecorator("longitude", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Longitude",
                            }
                        ],
                    })(<InputNumber min={-180} max={180}
                                    style={{width: "100%"}}
                                    placeholder="Please input Longitude"
                    />)
                }
            </Form.Item>

            <Form.Item label="Latitude(degrees)">
                {
                    getFieldDecorator("latitude", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Latitude",
                            }
                        ],
                    })(<InputNumber placeholder="Please input Latitude"
                                    min={-90} max={90}
                                    style={{width: "100%"}}
                    />)
                }
            </Form.Item>

            <Form.Item label="Elevation(meters)">
                {
                    getFieldDecorator("elevation", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Elevation",
                            }
                        ],
                    })(<InputNumber placeholder="Please input Elevation"
                                    min={-413} max={8850}
                                    style={{width: "100%"}}
                    />)
                }
            </Form.Item>

            <Form.Item label="Altitude(degrees)">
                {
                    getFieldDecorator("altitude", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Altitude",
                            }
                        ],
                    })(<InputNumber placeholder="Please input Altitude"
                                    min={0} max={90}
                                    style={{width: "100%"}}
                    /> )
                }
            </Form.Item>

            <Form.Item label="Duration(minutes)">
                {
                    getFieldDecorator("duration", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Duration",
                            }
                        ],
                    })(<InputNumber placeholder="Please input Duration" min={0} max={90} style={{width: "100%"}} />)
                }
            </Form.Item>
            <Form.Item className="show-nearby">
                <Button type="primary" htmlType="submit" style={{textAlign: "center"}}>
                    Find Nearby Satellite
                </Button>
            </Form.Item>
        </Form>
    );
  }

  // when a new form is submitted (onSubmit in line 19), the function below will be executed;
  // this function is to dispose the various conditions like validation, etc. after the form was submitted;
  showSatellite = e => {
    // preventDefault() is used to prevent the browser from doing any unexpected executions.
    // For example, tag <a /> will do the jumping action in the current webpage, this function would stop this action;
    e.preventDefault();
    // getting the form through the props is the samilar with through the reference;
    this.props.form.validateFields((err, values) => {
        if (!err) {
            // console.log('Received values of form: ', values);
            this.props.onShow(values);
        }
    });
  }
}

// the code below is an HOC - High Order Component.
// Form.create()(SatsettingForm) is a function and it transfers the props containing the form variable to the SatSettingForm;
// the added form object is used in the line 11;
const SatSetting1 = Form.create({name: 'satellite-setting'})(SatSettingForm)

export default SatSetting1;
