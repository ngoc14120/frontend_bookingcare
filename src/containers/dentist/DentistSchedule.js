import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DentistSchedule.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import moment from "moment";
import localization from "moment/locale/vi";
import BookingModal from "./modal/BookingModal";

class DentistSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  componentDidMount() {
    // let { language } = this.props;
    let allDays = this.getArrDays();
    this.setState({
      allDays: allDays,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
      let allDays = this.getArrDays();
      this.props.fetchScheduleDentistByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: this.props.allScheduleDate
          ? this.props.allScheduleDate
          : [],
      });
    }
    if (prevProps.allScheduleDate !== this.props.allScheduleDate) {
      this.setState({
        allAvailableTime: this.props.allScheduleDate,
      });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = () => {
    let allDays = [];
    for (let i = 1; i < 7; i++) {
      let object = {};

      let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.label = this.capitalizeFirstLetter(labelVi);

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  handleOnChangeSelect = (e) => {
    let { doctorIdFromParent } = this.props;
    if (doctorIdFromParent && doctorIdFromParent !== -1) {
      let doctorId = doctorIdFromParent;
      let date = e.target.value;
      this.props.fetchScheduleDentistByDate(doctorId, date);
    }
  };
  handleClickBookingScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvailableTime,
      dataScheduleTimeModal,
      isOpenModalBooking,
    } = this.state;
    return (
      <div className="dentist-schedule">
        <select
          className="dentist-schedule-selection"
          onChange={(e) => this.handleOnChangeSelect(e)}
        >
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <div className="schedule-section">
          <div className="schedule-title">
            <i className="fas fa-calendar-alt"></i> LỊCH KHÁM
          </div>
          {allAvailableTime && allAvailableTime.length > 0 ? (
            allAvailableTime.map((item, index) => {
              return (
                <button
                  className="btn-dentist-schedule"
                  key={index}
                  onClick={() => {
                    this.handleClickBookingScheduleTime(item);
                  }}
                >
                  {item.timeTypeData.valueVi}
                </button>
              );
            })
          ) : (
            <div className="schedule-citation">Hôm nay chưa có lịch khám</div>
          )}
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allScheduleDate: state.admin.allScheduleDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchScheduleDentistByDate: (doctorId, date) =>
      dispatch(actions.fetchScheduleDentistByDate(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DentistSchedule);
