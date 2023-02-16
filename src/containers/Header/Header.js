import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, dentistMenu } from "./menuApp";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { withRouter } from "react-router";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDentistLogin: false,
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.DENTIST) {
        this.setState({
          isDentistLogin: true,
        });
        if (this.props.history) {
          this.props.history.push("/dentist/manage-schedule");
        }
      }
      if (role === USER_ROLE.ADMIN) {
        if (this.props.history) {
          this.props.history.push("/system/user-redux");
        }
      }
    }
  }

  render() {
    console.log(this.state.isAdminLogin);
    const { processLogout, language, userInfo } = this.props;
    let { isDentistLogin } = this.state;
    let imageBase64 = "";

    if (userInfo.image) {
      imageBase64 = Buffer.from(userInfo.image, "base64").toString("binary");
    }

    return (
      <div className="header-container">
        <div className="sidebar">
          <div className="logo-details">
            <i className="bx bxl-c-plus-plus"></i>
            <span className="logo_name">ADMIN</span>
          </div>
          {isDentistLogin === true ? (
            <ul className="nav-links">
              <li>
                <NavLink to="/dentist/manage-schedule">
                  <i className="far fa-calendar-alt"></i>
                  {/* <i className="bx bx-box"></i> */}
                  <span className="links_name">Quản lý lịch khám</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dentist/manage-patient-booking">
                  <i className="far fa-calendar-alt"></i>
                  {/* <i className="bx bx-box"></i> */}
                  <span className="links_name">Quản lý lịch hẹn</span>
                </NavLink>
              </li>
              <li className="log_out" onClick={processLogout}>
                <a href="#">
                  <i className="bx bx-log-out"></i>
                  <span className="links_name">Log out</span>
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav-links">
              <li>
                <NavLink to="/system/user-redux">
                  <i className="bx bx-user"></i>
                  <span className="links_name">Quản Lý Người Dùng </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/manage-list-schedule">
                  <i className="far fa-calendar-alt"></i>
                  {/* <i className="bx bx-box"></i> */}
                  <span className="links_name">Quản lý lịch khám</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/manage-doctor">
                  <i className="fas fa-id-card"></i>
                  <span className="links_name">Chi Tiết Nha Sĩ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/manage-service">
                  <i className="bx bx-list-ul"></i>
                  <span className="links_name">Quản lý Dịch Vụ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/system/manage-service-info">
                  <i className="bx bx-book-alt"></i>
                  <span className="links_name">Chi Tiết Dịch Vụ</span>
                </NavLink>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-message"></i>
                  <span className="links_name">Tin Nhắn</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-heart"></i>
                  <span className="links_name">Yêu Thích</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-cog"></i>
                  <span className="links_name">Setting</span>
                </a>
              </li>
              <li className="log_out" onClick={processLogout}>
                <a href="#">
                  <i className="bx bx-log-out"></i>
                  <span className="links_name">Log out</span>
                </a>
              </li>
            </ul>
          )}
        </div>
        <section className="home-section">
          <nav>
            <div className="sidebar-button">
              <i className="bx bx-menu sidebarBtn"></i>
              <span className="dashboard">Dashboard</span>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <i className="bx bx-search"></i>
            </div>
            <div className="profile-details">
              <img src={imageBase64} alt="" />
              <span className="admin_name">
                {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
              </span>
              <i className="bx bx-chevron-down"></i>
            </div>
          </nav>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
