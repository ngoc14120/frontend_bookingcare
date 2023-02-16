import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { getListPatientForDentistService } from "../../../services/userService";
import "./ManageBooking.scss";
import _ from "lodash";
import { senBillService } from "../../../services/userService";
import LoadingOverlay from "react-loading-overlay";
import SendBillModal from "./SendBillModal";

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalSenBill: false,
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      dataModal: {},
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formateDate = new Date(currentDate).getTime();
    let res = await getListPatientForDentistService({
      date: formateDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePick = (date) => {
    this.setState({ currentDate: date[0] }, async () => {
      await this.getDataPatient();
    });
  };
  closeSendBillModal = () => {
    this.setState({
      isOpenModalSenBill: false,
      dataModal: {},
    });
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
      date: item.date,
    };
    this.setState({
      isOpenModalSenBill: true,
      dataModal: data,
    });
  };

  sendBill = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await senBillService({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      date: dataModal.date,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("send bill thành công");
      this.closeSendBillModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("send bill thất bại");
      this.closeSendBillModal();
    }
  };

  render() {
    let { dataPatient, isOpenModalSenBill, dataModal } = this.state;
    return (
      <React.Fragment>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="loading...."
        >
          <div className="manage-booking-container">
            <div className="m-s-title">Quản lý thông tin khách hàng</div>
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
                      <th>Email</th>
                      <th>Thời Gian</th>
                      <th>Giới Tính</th>
                      <th>Số điện thoại</th>
                      <th>địa chỉ</th>
                      <th>Hành động</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.email}</td>
                            <td>{item.timeTypeDataBooking.valueVi}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>{item.patientData.phoneNumber}</td>
                            <td>{item.patientData.address}</td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-warning px-3"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác Nhận
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
          <SendBillModal
            isOpenModal={this.state.isOpenModalSenBill}
            dataModal={this.state.dataModal}
            closeSendBillModal={this.closeSendBillModal}
            sendBill={this.sendBill}
          />
        </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
