import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageService.scss";
import * as actions from "../../../store/actions";
import ServiceModal from "./modal/ServiceModal";

class TableManageService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalBooking: false,
      arrService: [],
      editServiceModal: {},
    };
  }

  componentDidMount() {
    this.props.fetchServiceAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allService !== this.props.allService) {
      this.setState({
        arrService: this.props.allService,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteServiceId(user.id);
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  handleClickEditModal = (service) => {
    this.setState({
      isOpenModalBooking: true,
      editServiceModal: service,
    });
  };
  render() {
    let arrService = this.state.arrService;
    return (
      <>
        <table id="TableManageService">
          <tbody>
            <tr>
              <th>Dịch Vụ</th>
              <th>Giá Tiền</th>
              <th>Thông Tin</th>
              <th>Ảnh</th>
              <th>Action</th>
            </tr>
            {arrService &&
              arrService.length > 0 &&
              arrService.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, "base64").toString(
                    "binary"
                  );
                }

                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.priceId}</td>
                    <td>{item.description}</td>
                    <td>
                      <div
                        className="bg-img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleClickEditModal(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {this.state.isOpenModalBooking && (
          <ServiceModal
            isOpenModal={this.state.isOpenModalBooking}
            closeBookingModal={this.closeBookingModal}
            editServiceModal={this.state.editServiceModal}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allService: state.service.allService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServiceAll: () => dispatch(actions.fetchServiceAll()),
    deleteServiceId: (id) => dispatch(actions.deleteServiceId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageService);
