import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGenders: false,
  isCreateDentistInfo: -1,
  isCreateDentist: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  dentistNew: [],
  allDentist: [],
  detailDentist: [],
  allScheduleTime: [],
  allScheduleDate: [],
  allRequiredDentistInfo: [],
  allService: [],
  listAllService: [],
  detailService: [],
  dataVerifyBooking: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGenders = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGenders = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGenders = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_NEW_SUCCESS:
      state.dentistNew = action.dataDentist;
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_NEW_FAILED:
      state.dentistNew = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_ALL_SUCCESS:
      state.allDentist = action.dataDentistAll;
      return {
        ...state,
      };
    case actionTypes.FETCH_DENTIST_ALL_FAILED:
      state.allDentist = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DETAIL_DENTIST_INFO_SUCCESS:
      state.detailDentist = action.dataDetailDentist;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_DENTIST_INFO_FAILED:
      state.detailDentist = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_SCHEDULE_DENTIST_BY_DATE_SUCCESS:
      state.allScheduleDate = action.dataScheduleDate;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_DENTIST_BY_DATE_FAILED:
      state.allScheduleDate = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DENTIST_INFO_SUCCESS:
      state.allRequiredDentistInfo = action.allRequiredData;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DENTIST_INFO_FAILED:
      state.allRequiredDentistInfo = [];
      return {
        ...state,
      };

    case actionTypes.CREATE_DENTIST_INFO_SUCCESS:
      state.isCreateDentist = !state.isCreateDentist;
      return {
        ...state,
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      state.isCreateDentistInfo = 0;
      return {
        ...state,
      };

    case actionTypes.FETCH_SERVICE_ALL_SUCCESS:
      state.allService = action.dataService;
      return {
        ...state,
      };
    case actionTypes.FETCH_SERVICE_ALL_FAILED:
      state.allService = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_SERVICE_ALL_LIMIT_SUCCESS:
      state.listAllService = action.dataServiceLimit;
      return {
        ...state,
      };
    case actionTypes.FETCH_SERVICE_ALL_LIMIT_FAILED:
      state.listAllService = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DETAIL_SERVICE_INFO_SUCCESS:
      state.detailService = action.dataDetailService;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_SERVICE_INFO_FAILED:
      state.detailService = [];
      return {
        ...state,
      };

    case actionTypes.VERIFY_BOOKING_PATIENT_SUCCESS:
      state.dataVerifyBooking = action.data;
      return {
        ...state,
      };
    case actionTypes.VERIFY_BOOKING_PATIENT_FAILED:
      state.dataVerifyBooking = action.data;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
