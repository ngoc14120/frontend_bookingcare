import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import "./ManageService.scss";
import TableManageService from "./TableManageService";
import * as actions from "../../../store/actions";

import ServiceModal from "./modal/ServiceModal";

class ManageService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBooking: false,
      action: "",
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  handleClickAddUser = () => {
    this.setState({
      isOpenModalBooking: true,
      action: CRUD_ACTION.CREATE,
    });
  };
  render() {
    return (
      <div className="manage-service-container">
        <div className="title">Danh Sách Dịch Vụ</div>
        <div className="user-redux-body">
          <div className="btn-add-user py-3 ">
            <button
              className="btn btn-danger float-right px-3"
              onClick={this.handleClickAddUser}
            >
              <i className="fas fa-plus "></i>
              Thêm Dịch Vụ
            </button>
          </div>
          <div className="row">
            <div className="col-12 mb-5">
              <TableManageService />
            </div>
          </div>
        </div>

        {this.state.isOpenModalBooking && (
          <ServiceModal
            isOpenModal={this.state.isOpenModalBooking}
            closeBookingModal={this.closeBookingModal}
            action={this.state.action}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageService);
