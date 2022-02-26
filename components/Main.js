import React, {Component} from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from "./WorldMap";
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";

// when users fill all the properties on the webpage and submit, SatSetting will gather those properties and call the onShow function which is defined in the Main.js as showNearbySatellite;
// the values transferred from the SatSetting is the setting object here that is a member of the state, when this object is updated by the transferred values gathered by SatSetting it will trigger a re-render operation;
// after receiving the setting, Main.js will set the loading list state as true and call the method provided by the axios to get the required satellite list;

// user flow: SatSetting(onShow(values)) -> Main.js(showNearbySatallite(setting)) -> Main.js(fetchSatellite(setting)) to de-construct the setting and form a request url
// -> set the loading state -> re-render -> call axios.get(url) -> get response and update the state -> re-render -> transfer the satInfo to the child component SatelliteList;
// it's a process of transferring data from child component to its parent component througn setState method and then sending the gatherred data to another child component through props;
class Main extends Component {
  constructor() {
    super();
    this.state = {
      satInfo: null,
      satList: null,
      setting: null,
      isLoadingList: false,
    };
  }
  render() {
    const { isLoadingList, satInfo, satList, setting } = this.state;
    return (
      <Row className="main">
        <Col span={8} className="left-side">
          <SatSetting onShow={this.showNearbySatellite} />
          <SatelliteList
            isLoad={isLoadingList}
            satInfo={satInfo}
            onShowMap={this.showMap}
          />
        </Col>
        <Col span={16} className="right-side">
          <WorldMap satData={satList} observerData={setting} />
        </Col>
      </Row>
    );
  }

  showMap = (selected) => {
    this.setState((preState) => ({
      ...preState,
      satList: [...selected],
    }));
  };

  showNearbySatellite = (setting) => {
    this.setState({
      isLoadingList: true,
      setting: setting,
    });
    this.fetchSatellite(setting);
  };

  fetchSatellite = (setting) => {
    const { latitude, longitude, elevation, altitude } = setting;
    const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

    this.setState({
      isLoadingList: true,
    });

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          satInfo: response.data,
          isLoadingList: false,
        });
      })
      .catch((error) => {
        console.log("err in fetch satellite -> ", error);
      });
  };
}
export default Main;
