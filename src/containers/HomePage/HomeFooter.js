import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import "./HomeFooter.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeFooter.scss";

class HomeFooter extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-group home-footer">
          <div className="section-container">
            <div className="footer-top">
              <div className="footer-top-content">
                <div className="footer-header">LIÊN HỆ</div>
                <div className="footer-title">
                  <div className="title-group">
                    <span className="title-group-item">Cơ sở 1: </span>
                    411 Nguyễn Kiệm, Phường 9, Quận Phú Nhuận, TP.HCM
                    <br />
                    <span className="title-group-item">Cơ sở 2: </span>
                    614 Lê Hồng Phong, Phường 10, Quận 10, TP.HCM
                    <br />
                    <span>
                      <b>Tư Vấn: </b>
                      <a href="tel:+84332068173">0332068173</a>
                      <br />
                      <b>Điện thoai: </b>
                      <a href="tel:+84332068173">0332068173</a>
                      <br />
                      <b>Email: </b>
                      tienngoc200050@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div className="footer-top-content">
                <div className="footer-header">THỜI GIAN LÀM VIỆC</div>
                <div className="footer-title">
                  <div className="title-group">
                    <span className="title-group-item">- Thứ 2-7: </span>
                    8h00 - 20h00
                    <br />
                    <span className="title-group-item">- Chủ Nhật: </span>
                    8h00 - 16h00
                    <br />
                    <div className="working-time-img">
                      <img
                        src="https://nhakhoadongnam.com/wp-content/uploads/2016/10/thoi-gian-lam-viec-nha-khoa-dong-nam-247x211.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-top-content">
                <div className="footer-header">KẾT NỐI VỚI CHÚNG TÔI</div>
                <div className="connection-img">
                  <a href="#">
                    <img
                      src="https://nhakhoadongnam.com/wp-content/uploads/2018/08/logo-icon_facebook-1.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://nhakhoadongnam.com/wp-content/uploads/2018/08/logo-icon-youtube-1.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://nhakhoadongnam.com/wp-content/uploads/2020/07/logo-zalo.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://nhakhoadongnam.com/wp-content/uploads/2020/07/logo-intergram.png"
                      alt=""
                    />
                  </a>
                </div>
                <div className="footer-header">CHÍNH SÁCH HỖ TRỢ</div>
                <div className="footer-title">
                  <div className="title-group">
                    <span className="supporting-policies">
                      ✤ Chính sách bảo mật thông tin khách hàng
                    </span>
                    <br />
                    <span className="supporting-policies">
                      ✤ Chính sách bảo hành các dịch vụ
                    </span>
                    <br />
                    <span className="supporting-policies">
                      ✤ Giấy phép hoạt động
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>
            &copy; 2022 BookingDentistry - Địa chỉ: Thôn phú cường 1, Xã Quế Mỹ,
            Huyện Quế sơn, Tỉnh Quảng Nam - Điện thoại: (.84)332.068.173
          </p>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
