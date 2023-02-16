import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  render() {
    return (
      <div className="section-group section-about">
        <div className="section-container">
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/CUF8SSt9uGc"
                title="Nha khoa Implant - Nha khoa tiêu chuẩn Quốc tế đầu tiên tại Đà Nẵng"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <span className="about-description-header">
                Lý do nào để đến Phòng khám của chúng tôi
              </span>
              <p className="about-description-title">
                Nha khoa được thành lập vào năm 2005 bởi Richard Seth với tầm
                nhìn phát triển cơ sở hạ tầng chăm sóc sức khỏe chất lượng cao
                và giá cả phải chăng Chicago.
              </p>
              <div className="about-description-info">
                <p>
                  Chúng tôi là một chuỗi phòng khám nha khoa với sự điều trị
                  chuyên sâu của các bác sĩ giàu kinh nghiệm. Chúng tôi cung cấp
                  toàn bộ các phương pháp điều trị và quy trình nha khoa với mức
                  giá minh bạch và được niêm yết theo tiêu chuẩn cho tất cả bệnh
                  nhân. Chúng tôi cung cấp toàn bộ các phương pháp điều trị và
                  quy trình nha khoa với mức giá minh bạch và được niêm yết theo
                  tiêu chuẩn cho tất cả bệnh nhân.
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
