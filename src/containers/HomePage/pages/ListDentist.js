import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ListDentist.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";

import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";

class ListDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrService: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchDentistNew();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dentistNew !== this.props.dentistNew) {
      this.setState({
        arrService: this.props.dentistNew,
      });
    }
  }
  handleClickDetailDentist = (dentist) => {
    if (this.props.history)
      this.props.history.push(`detail-dentist/${dentist.id}`);
  };
  render() {
    let { arrService } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="list-dentist">
          <div>
            <img
              src="https://nhakhoaimplantdanang.com/wp-content/themes/dental/images/bg-about.jpg"
              alt=""
            />
          </div>
          <div className="dentist-container">
            <div className="dentist-header">
              <span className="title-dentist">ĐỘI NGŨ NHA SĨ</span>
            </div>
            <div className="dentist-body row">
              {arrService &&
                arrService.length > 0 &&
                arrService.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let name =
                    item.positionData.valueVi +
                    " " +
                    item.lastName +
                    " " +
                    item.firstName;
                  return (
                    <div className="dentist-customize col-4 p-1" key={index}>
                      <div className="outer-bg">
                        <div
                          className="bg-img dentist-image"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        ></div>
                        <h3>{name}</h3>
                        <p>SĐT: {item.phoneNumber}</p>
                        <button
                          className="btn btn-danger px-3"
                          onClick={() => this.handleClickDetailDentist(item)}
                        >
                          Xem Chi Tiết Và Đặt Lịch Hẹn
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    dentistNew: state.admin.dentistNew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDentistNew: () => dispatch(actions.fetchDentistNew()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDentist)
);
