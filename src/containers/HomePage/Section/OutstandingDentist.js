import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDentist.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class OutstandingDentist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDentists: [],
    };
  }
  componentDidMount() {
    this.props.loadDentistNew();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dentistNewRedux !== this.props.dentistNewRedux) {
      this.setState({
        arrDentists: this.props.dentistNewRedux,
      });
    }
  }
  handleClickDetailDentist = (dentist) => {
    if (this.props.history)
      this.props.history.push(`detail-dentist/${dentist.id}`);
  };
  render() {
    let dentists = this.state.arrDentists;
    console.log(dentists);
    return (
      <div className="section-outstanding-dentist">
        <div className="outstanding-dentist-container">
          <div className="outstanding-dentist-header">
            <div className="title-outstanding-dentist">
              <span className="title-header">Nha sĩ có trình độ cao</span>
              <p className="title-info">
                Chúng tôi đã xây dựng nha khoa của mình dựa trên những trụ cột
                vững chắc của 22 bác sĩ phẫu thuật MDS. Đội ngũ của chúng tôi có
                các chuyên gia dày dặn kinh nghiệm trong nhiều năm.
              </p>
            </div>
          </div>
          <div className="outstanding-dentist-body">
            <Slider {...this.props.settings}>
              {dentists &&
                dentists.length > 0 &&
                dentists.map((item, index) => {
                  let imageBase64 = "";
                  let name =
                    item.positionData.valueVi +
                    " " +
                    item.lastName +
                    " " +
                    item.firstName;
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="outstanding-dentist-customize"
                      key={index}
                      onClick={() => this.handleClickDetailDentist(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstandingdoctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>{name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    dentistNewRedux: state.admin.dentistNew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDentistNew: () => dispatch(actions.fetchDentistNew()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDentist)
);
