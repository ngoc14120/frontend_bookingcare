import actionTypes from "../actions/actionTypes";

const initialState = {
  allService: [],
  listAllService: [],
  detailService: [],
};

const serviceReduce = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default serviceReduce;
