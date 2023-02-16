import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailService.scss";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";

import ServiceOther from "./ServiceOther";
class DetailService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDetailService: {},
      currentDentistId: -1,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({
      currentDentistId: id,
    });
    this.props.fetchDetailServiceInfo(id);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailService !== this.props.detailService) {
      this.setState({
        arrDetailService: this.props.detailService,
      });
    }
  }
  render() {
    let { arrDetailService } = this.state;
    let { detailDentist } = this.props;
    return (
      <div>
        <HomeHeader />
        <div className="detail-service">
          <div
            className="detail-service-img"
            style={{
              backgroundImage: `url(${
                arrDetailService && arrDetailService.image
                  ? arrDetailService.image
                  : ""
              })`,
            }}
          ></div>
          <div className="detail-service-container">
            <div className="detail-service-body">
              <div className="detail-service-name">
                {arrDetailService && arrDetailService.name ? (
                  <h2>{arrDetailService.name}</h2>
                ) : (
                  ""
                )}
              </div>
              <div className="detail-service-info">
                {arrDetailService &&
                arrDetailService.Markdown &&
                arrDetailService.Markdown.contentMarkdown ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: arrDetailService.Markdown.contentHTML,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <ServiceOther />
          </div>
        </div>

        <HomeFooter />
      </div>

      // <>
      //   {/* <HomeHeader /> */}
      //   <p>sdsdsdsdsds</p>
      // </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailService: state.service.detailService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDetailServiceInfo: (id) =>
      dispatch(actions.fetchDetailServiceInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailService);
