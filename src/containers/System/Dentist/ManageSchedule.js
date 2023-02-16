import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import "./ManageSchedule.scss";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDentist: [],
      selectedDentist: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchDentistAll();
    this.props.fetchScheduleTimeAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDentist !== this.props.allDentist) {
      let dataSelect = this.buildDataDentistSelect(this.props.allDentist);
      this.setState({
        listDentist: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataDentistSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        if (item.id === this.props.user.id && this.props.user.roleId === "R2") {
          let object = {};
          object.label = `${item.lastName} ${item.firstName}`;
          object.value = item.id;
          result.push(object);
        }
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDentist: selectedOption });
  };
  handleOnchangeDatePick = (date) => {
    this.setState({ currentDate: date[0] });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !time.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime,
      });
    }
  };
  handleSaveSchedule = () => {
    let { currentDate, selectedDentist, rangeTime } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("ngày không hợp lệ");
      return;
    }

    if (selectedDentist && _.isEmpty(selectedDentist)) {
      toast.error("nha sĩ không hợp lệ");
      return;
    }
    let formateDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);

      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDentist.value;
          object.date = formateDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("thời gian không hợp lệ");
        return;
      }
    }
    this.props.createScheduleDentist({
      arrSchedule: result,
      doctorId: selectedDentist.value,
      formateDate: formateDate,
    });
  };
  render() {
    let { rangeTime, selectedDentist } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate()));
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="m-s-title">Tạo Lịch Khám</div>
          <div className="manage-schedule-body">
            <div className="manage-schedule-dentist">
              <label>Chọn Bác Sĩ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDentist}
              />
            </div>
            <div className="manage-schedule-date">
              <label>Chọn Ngày</label>
              <DatePicker
                onChange={this.handleOnchangeDatePick}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>

            <div className="manage-schedule-hours">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn-schedule active"
                          : "btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {item.valueVi}
                    </button>
                  );
                })}
            </div>
            <button
              className="btn btn-primary px-3 my-4 float-right"
              onClick={() => this.handleSaveSchedule()}
            >
              Lưu
            </button>
            <div></div>
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
    allDentist: state.admin.allDentist,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDentistAll: () => dispatch(actions.fetchDentistAll()),
    fetchScheduleTimeAll: () => dispatch(actions.fetchScheduleTimeAll()),
    createScheduleDentist: (data) =>
      dispatch(actions.createScheduleDentist(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
