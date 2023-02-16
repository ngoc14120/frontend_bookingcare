import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION } from "../../../utils/constant";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {}

class ManageDoctor extends Component {
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
    this.props.fetchDentistAll();
    this.props.fetchRequiredDentistInfoStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDentist !== this.props.allDentist) {
      let dataSelect = this.buildDataDentistSelect(this.props.allDentist);
      this.setState({
        listDentist: dataSelect,
      });
    }

    if (prevProps.isCreateDentist !== this.props.isCreateDentist) {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        isCreateDentist: -1,
      });
    }
  }
  buildDataDentistSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = `${item.lastName} ${item.firstName}`;

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
    await this.props.fetchDetailDentistInfo(selectedOption.value);
    let { detailDentist } = this.props;
    if (detailDentist && detailDentist.Markdown) {
      let markdown = detailDentist.Markdown;
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
  handleOnchangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveDoctorInfo = () => {
    this.props.createDentistInfo({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: this.state.action,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">TẠO THÔNG TIN NHA SĨ</div>
          <div className="doctor-info">
            <div className="content-left form-group">
              <label>Chọn nha sĩ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDentist}
                placeholder={"chọn nha sĩ"}
              />
            </div>
            <div className="content-right">
              <label>Mô tả</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(e) => this.handleOnchangeText(e, "description")}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <label>Bài viết</label>
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
                ? "btn btn-warning px-3 float-right mr-4"
                : "btn btn-primary px-3 float-right mr-4"
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
    isCreateDentist: state.admin.isCreateDentist,
    detailDentist: state.admin.detailDentist,
    allDentist: state.admin.allDentist,
    allRequiredDentistInfo: state.admin.allRequiredDentistInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailDentistInfo: (id) =>
      dispatch(actions.fetchDetailDentistInfo(id)),
    fetchDentistAll: () => dispatch(actions.fetchDentistAll()),
    createDentistInfo: (data) => dispatch(actions.createDentistInfo(data)),
    fetchRequiredDentistInfoStart: () =>
      dispatch(actions.fetchRequiredDentistInfoStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
