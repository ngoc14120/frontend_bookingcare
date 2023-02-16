import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import {
  getListScheduleService,
  deleteSchedule,
} from "../../../services/userService";
// import "./ListSchedule.scss";
import _ from "lodash";

class ListSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalSenBill: false,
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataSchedule: [],
      dataModal: {},
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { currentDate } = this.state;
    let formateDate = new Date(currentDate).getTime();
    let res = await getListScheduleService({
      date: formateDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataSchedule: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePick = (date) => {
    this.setState({ currentDate: date[0] }, async () => {
      await this.getDataPatient();
    });
  };

  handleBtnConfirm = async (item) => {
    let res = await deleteSchedule(item.id);
    if (res && res.errCode === 0) {
      toast.success("Xóa thành công");
      await this.getDataPatient();
    } else {
      toast.error("Xóa thất bại");
    }
  };

  render() {
    let { dataSchedule } = this.state;

    return (
      <React.Fragment>
        <div className="manage-booking-container">
          <div className="m-s-title">Quản lý thông tin lịch khám</div>
          <div className="manage-booking-body row">
            <div className="col-4 ">
              <label>Chọn Ngày Khám</label>
              <DatePicker
                onChange={this.handleOnchangeDatePick}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>

            <div className="col-12 table-manage-booking">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Thời Gian</th>
                    <th>Hành động</th>
                  </tr>
                  {dataSchedule && dataSchedule.length > 0 ? (
                    dataSchedule.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.doctorData.lastName}{" "}
                            {item.doctorData.firstName}
                          </td>
                          <td>{item.timeTypeData.valueVi}</td>
                          <td>
                            {" "}
                            <button
                              className="btn-delete"
                              onClick={() => this.handleBtnConfirm(item)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSchedule);
