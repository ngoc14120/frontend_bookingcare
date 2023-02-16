import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../../utils";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import * as actions from "../../../../store/actions";
import "./AddUserModal.scss";
import _ from "lodash";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",

      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
      positionId: "",
      avatar: "",
      action: "",
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    let user = this.props.editUserModal;
    if (user && !_.isEmpty(user)) {
      let imageBase64 = "";
      if (user.image) {
        imageBase64 = Buffer.from(user.image, "base64").toString("binary");
      }
      this.setState({
        id: user.id,
        email: user.email,
        password: "ssssss",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
        positionId: user.positionId,
        previewImgURL: imageBase64,
        action: CRUD_ACTION.EDIT,
      });
    }
    let action = this.props.action;
    if (action && !_.isEmpty(action)) {
      this.setState({
        action: action,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
  }
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
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
    let { action } = this.state;
    if (action === CRUD_ACTION.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    } else {
      this.props.editUser({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    }

    this.props.closeBookingModal();
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let { isOpenModal, closeBookingModal, language, editUserModal } =
      this.props;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      roleId,
      positionId,
    } = this.state;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="lg"
        centered
        z-index="999"
      >
        <div className="booking-modal-center ">
          <div className="booking-modal-header">
            <span className="left">THÊM NGƯỜI DÙNG</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body m-4 pr-5 pl-5">
            <div className="row center">
              <div className="col-6 mb-2 mt-2">
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
                  disabled={this.state.action === CRUD_ACTION.EDIT}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                  disabled={this.state.action === CRUD_ACTION.EDIT}
                />
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
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
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

              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  value={positionId}
                  onChange={(e) => {
                    this.onChangeInput(e, "positionId");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  value={roleId}
                  onChange={(e) => {
                    this.onChangeInput(e, "roleId");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-5 mb-2 mt-2">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-image-container">
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(e) => this.handleOnChangeImage(e)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    Tải ảnh <i className="fa fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className={
                this.state.action === CRUD_ACTION.CREATE
                  ? "btn btn-primary px-3 mx-3"
                  : "btn btn-warning px-3 mx-3"
              }
              onClick={() => this.handleEditUser()}
            >
              {this.state.action === CRUD_ACTION.CREATE
                ? "Thêm Mới"
                : "Cập Nhật"}
            </button>
            <button className="btn btn-danger px-3" onClick={closeBookingModal}>
              Hủy
            </button>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            className={"lightbox-modal"}
            style={{ zIndex: 1000 }}
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
