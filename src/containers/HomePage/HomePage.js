import { divide } from "lodash";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Slider from "./Section/Slider";
import Clinic from "./Section/Clinic";
import OutstandingDentist from "./Section/OutstandingDentist";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import * as actions from "../../store/actions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <>
        <HomeHeader />
        <Slider />
        <Specialty />
        <Clinic />
        <OutstandingDentist settings={settings} />
        <About />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAllLimit: () => dispatch(actions.fetchServiceAllLimit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
