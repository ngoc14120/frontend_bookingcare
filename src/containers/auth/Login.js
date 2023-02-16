import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import "./Login.scss";

import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      isShowPassword: false,
      isShowRegister: false,
      errMessage: "",
      genderArr: [],

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.isCreateDentistInfo !== this.props.isCreateDentistInfo) {
      this.setState({
        isShowRegister: !this.state.isShowRegister,
      });
    }
  }
  handleOnChangUserName = (e) => {
    this.setState({ userName: e.target.value });
  };
  handleOnChangPassWord = (e) => {
    this.setState({ passWord: e.target.value });
  };
  handleClickLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.userName, this.state.passWord);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({ errMessage: e.response.data.message });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      this.handleClickLogin();
    }
  };
  handleClickRegister = () => {
    this.setState({
      isShowRegister: !this.state.isShowRegister,
    });
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    this.props.userRegister({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let { email, password, firstName, lastName, address, phoneNumber, gender } =
      this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          {this.state.isShowRegister === true ? (
            <div className="login-content row">
              <div className="col-12 title-login mb-4">ĐĂNG KÝ</div>
              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                />
              </div>
              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      this.onChangeInput(e, "password");
                    }}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                    />
                  </span>
                </div>
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => {
                    this.onChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => {
                    this.onChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleEditUser();
                  }}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                >
                  ĐĂNG KÝ
                </button>
              </div>
              <div className="col-12">
                <span className="forgot-password">
                  Đã có tài khoản
                  <a href="#" onClick={() => this.handleClickRegister()}>
                    {" "}
                    Đăng Nhập
                  </a>
                </span>
              </div>
            </div>
          ) : (
            <div className="login-content row">
              <div className="col-12 title-login">ĐĂNG NHẬP</div>
              <div className="col-12 form-group login-form">
                <div className="login-input">
                  <label>UserName:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Điền email của bạn"
                    onChange={(e) => {
                      this.handleOnChangUserName(e);
                    }}
                  />
                </div>
                <div className="login-input">
                  <label>PassWord:</label>
                  <div className="custom-input-password">
                    <input
                      type={this.state.isShowPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Điền password của bạn"
                      onChange={(e) => {
                        this.handleOnChangPassWord(e);
                      }}
                    />
                    <span onClick={() => this.handleShowHidePassword()}>
                      <i
                        className={
                          this.state.isShowPassword
                            ? "fas fa-eye"
                            : "fas fa-eye-slash"
                        }
                      />
                    </span>
                  </div>
                </div>
                <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
                <div className="col-12">
                  <button
                    className="btn-login"
                    onClick={() => {
                      this.handleClickLogin();
                    }}
                    onKeyDown={(e) => this.handleKeyDown(e)}
                  >
                    ĐĂNG NHẬP
                  </button>
                </div>
                <div className="col-12">
                  <span className="forgot-password">
                    chưa có tài khoản
                    <a href="#" onClick={() => this.handleClickRegister()}>
                      {" "}
                      Đăng Ký
                    </a>
                  </span>
                </div>
                <div className="col-12 text-center mt-5">
                  <span className="text-other-login">Or Login With:</span>
                </div>
                <div className="col-12 social-login">
                  <i className="fab fa-google-plus google"></i>
                  <i className="fab fa-facebook facebook"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    genderRedux: state.admin.genders,
    isCreateDentistInfo: state.admin.isCreateDentistInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    userRegister: (data) => dispatch(actions.userRegister(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
