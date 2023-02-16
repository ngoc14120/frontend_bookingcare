import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../../utils";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";

import * as actions from "../../../../store/actions";
import "./AddUserModal.scss";
import _ from "lodash";

class ServiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImgURL: "",

      id: "",
      name: "",
      priceId: "",
      description: "",
      avatar: "",
      action: "",
    };
  }
  componentDidMount() {
    let service = this.props.editServiceModal;
    if (service && !_.isEmpty(service)) {
      let imageBase64 = "";
      if (service.image) {
        imageBase64 = Buffer.from(service.image, "base64").toString("binary");
      }
      this.setState({
        id: service.id,
        name: service.name,
        priceId: service.priceId,
        description: service.description,

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

  componentDidUpdate(prevProps, prevState, snapshot) {}

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
    let arrCheck = ["name", "priceId", "description"];
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
      this.props.createServiceNew({
        id: this.state.id,
        name: this.state.name,
        priceId: this.state.priceId,
        description: this.state.description,
        avatar: this.state.avatar,
        action: this.state.action,
      });
    } else {
      this.props.createServiceNew({
        id: this.state.id,
        name: this.state.name,
        priceId: this.state.priceId,
        description: this.state.description,
        avatar: this.state.avatar,
        action: this.state.action,
      });
    }

    this.props.closeBookingModal();
  };
  handleChangeSelectDentistInfo = async (selectedOption, name) => {
    let starName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[starName] = selectedOption;
    this.setState({ ...stateCopy });
  };

  render() {
    let { isOpenModal, closeBookingModal } = this.props;
    let { name, description, priceId } = this.state;
    console.log(this.state.action);

    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-center ">
          <div className="booking-modal-header">
            <span className="left">THÊM DỊCH VỤ</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body m-4 pr-5 pl-5">
            <div className="row center">
              <div className="col-6 mb-2 mt-2">
                <label>Tên Dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    this.onChangeInput(e, "name");
                  }}
                />
              </div>
              <div className="col-6 mb-2 mt-2">
                <label>Chọn Giá</label>
                <input
                  type="text"
                  className="form-control"
                  value={priceId}
                  onChange={(e) => {
                    this.onChangeInput(e, "priceId");
                  }}
                />
              </div>
              <div className="col-12 mb-2 mt-2">
                <label>Thông Tin</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => {
                    this.onChangeInput(e, "description");
                  }}
                />
              </div>
              <div className="col-5 mb-2 mt-2">
                <label>Ảnh minh họa</label>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createServiceNew: (data) => dispatch(actions.createServiceNew(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceModal);
