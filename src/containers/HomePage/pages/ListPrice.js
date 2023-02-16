import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ListPrice.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";

import HomeHeader from "../HomeHeader";
import HomeFooter from "../HomeFooter";

class ListPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrService: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchServiceAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allService !== this.props.allService) {
      this.setState({
        arrService: this.props.allService,
      });
    }
  }

  render() {
    let { arrService } = this.state;
    console.log(arrService);
    return (
      <>
        <HomeHeader />
        <div className="list-price">
          <div>
            <img
              src="https://nhakhoaimplantdanang.com/wp-content/themes/dental/images/banner-services.jpg"
              alt=""
            />
          </div>
          <div className="price-container">
            <div className="price-header">
              <span className="title-price">BẢNG GIÁ CÁC DỊCH VỤ</span>
            </div>
            <div className="price-body row">
              <table id="TablePrice">
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>DỊCH VỤ</th>
                    <th>GIÁ TIỀN</th>
                    <th>BẢO HÀNH</th>
                  </tr>
                  {arrService &&
                    arrService.length > 0 &&
                    arrService.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.priceId}</td>
                          <td>{item.description}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allService: state.admin.allService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAll: () => dispatch(actions.fetchServiceAll()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListPrice)
);
