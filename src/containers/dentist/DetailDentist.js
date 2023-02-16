import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDentist.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import DentistSchedule from "./DentistSchedule";
class DetailDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDetailDentist: {},
      currentDentistId: -1,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({
      currentDentistId: id,
    });
    this.props.fetchDetailDentistInfo(id);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDentist !== this.props.detailDentist) {
      this.setState({
        arrDetailDentist: this.props.detailDentist,
      });
    }
  }
  render() {
    let { arrDetailDentist } = this.state;
    let { detailDentist } = this.props;
    let position = "";
    if (arrDetailDentist && arrDetailDentist.positionData) {
      position = detailDentist.positionData.valueVi;
    }
    return (
      <div>
        <HomeHeader />
        <div className="detail-dentist">
          <div className="detail-dentist-container">
            <div className="detail-dentist-body">
              <div className="detail-dentist-left">
                <div className="outstanding-dentist-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div
                        className="bg-img"
                        style={{
                          backgroundImage: `url(${
                            arrDetailDentist && arrDetailDentist.image
                              ? arrDetailDentist.image
                              : ""
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="customize-content">
                    <div className="dentist-name">
                      {position +
                        ": " +
                        arrDetailDentist.lastName +
                        " " +
                        arrDetailDentist.firstName}
                    </div>
                    <div className="dentist-schedule">
                      <DentistSchedule
                        doctorIdFromParent={this.state.currentDentistId}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-dentist-right">
                <div className="detail-dentist-info">
                  {arrDetailDentist &&
                  arrDetailDentist.Markdown &&
                  arrDetailDentist.Markdown.contentMarkdown ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: arrDetailDentist.Markdown.contentHTML,
                      }}
                    ></div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeFooter />
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
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDentist);
