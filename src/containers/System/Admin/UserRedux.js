import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";

import * as actions from "../../../store/actions";

import AddUserModal from "./modal/AddUserModal";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBooking: false,

      action: "",
    };
  }

  async componentDidMount() {}
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
      <div className="user-redux-container">
        <div className="title">Danh Sách Người Dùng</div>
        <div className="user-redux-body">
          <div className="btn-add-user py-3 ">
            <button
              className="btn btn-danger float-right px-3"
              onClick={this.handleClickAddUser}
            >
              <i className="fas fa-plus "></i>
              Thêm người dùng
            </button>
          </div>
          <div className="row">
            <div className="col-12 mb-5">
              <TableManageUser />
            </div>
          </div>
        </div>

        {this.state.isOpenModalBooking && (
          <AddUserModal
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
