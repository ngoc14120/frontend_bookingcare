import React, { Component } from "react";
import { connect } from "react-redux";
import "./ServiceOther.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";

class ServiceOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDentists: [],
    };
  }
  componentDidMount() {
    this.props.fetchServiceAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allService !== this.props.allService) {
      this.setState({
        arrDentists: this.props.allService,
      });
    }
  }
  handleClickDetailService = (service) => {
    if (this.props.history) this.props.history.push(`${service.id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    let dentists = this.state.arrDentists;
    return (
      <div className="section-service-other">
        <div className="outstanding-dentist-container">
          <div className="outstanding-dentist-header">
            <div className="title-outstanding-dentist">
              <span className="title-header">DỊCH VỤ KHÁC</span>
            </div>
          </div>
          <div className="outstanding-dentist-body">
            <Slider {...settings}>
              {dentists &&
                dentists.length > 0 &&
                dentists.map((item, index) => {
                  let imageBase64 = "";

                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="outstanding-dentist-customize" key={index}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstandingdoctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                        </div>
                        <div className="position ">
                          <p>{item.name}</p>
                          <button className="btn btn-danger px-3">
                            <a href={`${item.id}`}> Xem Chi Tiết</a>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allService: state.admin.allService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAll: () => dispatch(actions.fetchServiceAll()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ServiceOther)
);
