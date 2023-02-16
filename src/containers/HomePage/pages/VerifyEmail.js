import React, { Component } from "react";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../HomeHeader";
import * as actions from "../../../store/actions";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      this.props.verifyBookingPatient({ token: token, doctorId: doctorId });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.verifyBooking !== this.props.verifyBooking) {
      if (this.props.verifyBooking === 0) {
        this.setState({
          statusVerify: true,
          errCode: this.props.verifyBooking,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: this.props.verifyBooking ? this.props.verifyBooking : -1,
        });
      }
    }
  }
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="info-booking">Xác nhận lịch hẹn thành công</div>
              ) : (
                <div className="info-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { verifyBooking: state.admin.dataVerifyBooking };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyBookingPatient: (data) =>
      dispatch(actions.verifyBookingPatient(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
