import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import "./BookingModal.scss";
import ProfileDentist from "../ProfileDentist";
import _ from "lodash";
import * as actions from "../../../store/actions";
import "./BookingModal.scss";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      genderArr: [],

      fullName: "",
      email: "",
      gender: "",
      address: "",
      phoneNumber: "",
      doctorId: "",
      timeType: "",
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
    if (this.props.dataTime !== prevProps.dataTime) {
      let doctorId =
        this.props.dataTime && !_.isEmpty(this.props.dataTime)
          ? this.props.dataTime.doctorId
          : "";
      let timeType = this.props.dataTime.timeType;
      this.setState({
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  buildTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
      return `${dataTime.timeTypeData.valueVi} - ${date}`;
    }
    return "";
  };
  buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      return name;
    }
    return "";
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["email", "fullName", "phoneNumber", "address"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleBookingpatient = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    this.props.bookingPatient({
      email: this.state.email,
      fullName: this.state.fullName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      timeString: timeString,
      doctorName: doctorName,
      date: this.props.dataTime.date,
    });

    this.setState({
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
    });

    this.props.closeBookingModal();
  };
  render() {
    console.log(this.state);
    let { isOpenModal, closeBookingModal, dataTime, language } = this.props;
    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    let genders = this.state.genderArr;

    let { email, fullName, address, phoneNumber, gender } = this.state;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"modals-user-container"}
        size="sz"
        centered
        z-index="999"
      >
        <div className="booking-modal-center ">
          <div className="booking-modal-header">
            <span className="left">ĐẶT LỊCH HẸN</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <ProfileDentist doctorId={doctorId} dataTime={dataTime} />
          <div className="booking-modal-body m-4 pr-5 pl-5">
            <div className="row center">
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
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => {
                    this.onChangeInput(e, "fullName");
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
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn btn-primary px-3 mx-3"
              onClick={() => this.handleBookingpatient()}
            >
              Đặt lịch{" "}
            </button>
            <button className="btn btn-danger px-3" onClick={closeBookingModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genderRedux: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    bookingPatient: (data) => dispatch(actions.bookingPatient(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
