import React, { Component } from "react";
import { connect } from "react-redux";
import "./Clinic.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Clinic extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="section-clinic">
        <div className="clinic-container">
          <div className="clinic-body">
            <div className="clinic-customize">
              <div className="bg-img clinic-image"></div>
              <div className="clinic-description">
                <span className="clinic-description-header">
                  Phòng khám nha khoa Implant
                </span>
                <p className="clinic-description-title">
                  Tại Phòng Khám Đa Khoa chúng tôi cung cấp đa dạng các dịch vụ
                  nha khoa, bạn sẽ được cung cấp kế hoạch điều trị toàn diện
                  trước khi bắt đầu thực hiện bất kỳ dịch vụ nha khoa nào. .
                </p>
                <div className="clinic-description-info">
                  <p>
                    <i className="fas fa-arrow-right icon"></i> Bác sĩ nha khoa
                    được chứng nhận
                  </p>
                  <p>
                    <i className="fas fa-arrow-right icon"></i> Thiết bị công
                    nghệ mới nhất
                  </p>
                  <p>
                    <i className="fas fa-arrow-right icon"></i> Thiết bị công
                    nghệ mới nhất
                  </p>
                  <p>
                    <i className="fas fa-arrow-right icon"></i> Thiết bị công
                    nghệ mới nhất
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
