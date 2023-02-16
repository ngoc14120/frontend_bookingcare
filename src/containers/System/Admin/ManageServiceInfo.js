import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageServiceInfo.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION } from "../../../utils/constant";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {}

class ManageServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
      listDentist: [],
      action: "",
    };
  }

  componentDidMount() {
    this.props.fetchServiceAll();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allService !== this.props.allService) {
      let dataSelect = this.buildDataDentistSelect(this.props.allService);
      this.setState({
        listDentist: dataSelect,
      });
    }
    if (prevProps.isCreateDentistInfo !== this.props.isCreateDentistInfo) {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        selectedOption: "",
      });
    }
  }
  buildDataDentistSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    await this.props.fetchDetailServiceInfo(selectedOption.value);
    let { detailService } = this.props;
    if (detailService && detailService.Markdown) {
      let markdown = detailService.Markdown;
      this.setState({
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        action: CRUD_ACTION.EDIT,
      });
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        action: CRUD_ACTION.CREATE,
      });
    }
  };
  handleOnchangeText = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleSaveDoctorInfo = () => {
    this.props.createServiceInfo({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      serviceId: this.state.selectedOption.value,
      action: this.state.action,
    });
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedOption: "",
      action: CRUD_ACTION.CREATE,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">Thêm Chi Tiết Dịch Vụ</div>
          <div className="doctor-info">
            <div className="content-left form-group">
              <label>Chọn Dịch Vụ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDentist}
                placeholder={"Chọn dịch vụ"}
              />
            </div>
            <div className="content-right">
              <label>Mô Tả Dịch Vụ</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(e) => this.handleOnchangeText(e)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <label>Bài Viết Dịch Vụ</label>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              this.state.action === CRUD_ACTION.EDIT
                ? "btn btn-warning px-3 m-4 float-right"
                : "btn btn-primary px-3 m-4 float-right"
            }
            onClick={() => this.handleSaveDoctorInfo()}
          >
            {this.state.action === CRUD_ACTION.EDIT ? (
              <span>CẬP NHẬT THÔNG TIN</span>
            ) : (
              <span>LƯU THÔNG TIN</span>
            )}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allService: state.service.allService,
    detailService: state.service.detailService,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailServiceInfo: (id) =>
      dispatch(actions.fetchDetailServiceInfo(id)),
    createServiceInfo: (data) => dispatch(actions.createServiceInfo(data)),
    fetchServiceAll: () => dispatch(actions.fetchServiceAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageServiceInfo);
