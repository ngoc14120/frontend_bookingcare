import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import * as actions from "../../../store/actions";
// import "./SendBillModal.scss";
import _ from "lodash";

class SendBillModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgBase64: "",
      email: "",
    };
  }
  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  onChangeInput = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleEditUser = () => {
    this.props.closeSendBillModal();
  };
  handleSendBill = () => {
    this.props.sendBill(this.state);
  };
  render() {
    let { isOpenModal, closeSendBillModal, dataModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="md"
        centered
      >
        <div className="booking-modal-center ">
          <div className="booking-modal-header">
            <span className="left">GỬI HÓA ĐƠN</span>
            <span className="right" onClick={closeSendBillModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body m-4 pr-5 pl-5">
            <div className="row center">
              <div className="col-12 mb-2 mt-2">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => {
                    this.onChangeInput(e);
                  }}
                />
              </div>
              <div className="col-12 mb-2 mt-2">
                <label>Hóa Đơn</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(e) => this.handleOnChangeImage(e)}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn btn-primary px-3 mx-3"
              onClick={() => this.handleSendBill()}
            >
              Gửi
            </button>
            <button
              className="btn btn-danger px-3"
              onClick={closeSendBillModal}
            >
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendBillModal);
