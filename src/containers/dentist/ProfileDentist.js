import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./ProfileDentist.scss";
import _ from "lodash";
import moment from "moment";

class ProfileDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  componentDidMount() {
    if (this.props.doctorId) {
      this.props.fetchDetailDentistInfo(this.props.doctorId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailDentist !== prevProps.detailDentist) {
      this.setState({
        dataProfile: this.props.detailDentist,
      });
    }
  }
  renderTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
      return (
        <>
          <div>
            {dataTime.timeTypeData.valueVi} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };
  render() {
    let { dataProfile } = this.state;
    let { dataTime } = this.props;
    let name = "";
    if (dataProfile && dataProfile.positionData) {
      name = `${dataProfile.positionData.valueVi}: ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <div className="profile-dentist-container">
        <div className="intro-dentist">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{name}</div>
            <div className="down">{this.renderTimeBooking(dataTime)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailDentist: state.admin.detailDentist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDentist);
