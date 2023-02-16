import actionTypes from "./actionTypes";
import {
  createServiceNewService,
  getServiceAllService,
  getServiceAllLimitService,
  deleteService,
  createServiceInfoService,
  getDetailServiceInfoService,
} from "../../services/userService";
import { toast } from "react-toastify";

//dichj vuj
export const createServiceNew = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createServiceNewService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo dịch vụ thành công");
        dispatch({
          type: actionTypes.CREATE_SERVICE_NEW_SUCCESS,
        });
        dispatch(fetchServiceAll());
      } else {
        toast.error("Tạo dịch vụ thất bại");
        dispatch({
          type: actionTypes.CREATE_SERVICE_NEW_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.CREATE_SERVICE_NEW_FAILED,
      });
    }
  };
};
export const fetchServiceAll = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getServiceAllService();

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SERVICE_ALL_SUCCESS,
          dataService: res.data.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SERVICE_ALL_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_SERVICE_ALL_FAILED,
      });
    }
  };
};

export const fetchServiceAllLimit = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getServiceAllLimitService(9);

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SERVICE_ALL_LIMIT_SUCCESS,
          dataServiceLimit: res.data.reverse(),
        });
      } else {
        toast.error("Lấy tất cả người dùng thất bại");
        dispatch({
          type: actionTypes.FETCH_SERVICE_ALL_LIMIT_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_SERVICE_ALL_LIMIT_FAILED,
      });
    }
  };
};
export const deleteServiceId = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteService(userId);
      if (res && res.errCode === 0) {
        toast.success("Xóa dịch vụ thành công");
        dispatch({
          type: actionTypes.DELETE_SERVICE_SUCCESS,
        });
        dispatch(fetchServiceAll());
      } else {
        toast.error("Xóa dịch vụ thất bại");
        dispatch({
          type: actionTypes.DELETE_SERVICE_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.DELETE_SERVICE_FAILED,
      });
    }
  };
};
export const createServiceInfo = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createServiceInfoService(data);
      if (res && res.errCode === 0) {
        toast.success("Tạo thông tin dịch vụ thành công");
        dispatch({
          type: actionTypes.CREATE_SERVICE_INFO_SUCCESS,
        });
      } else {
        toast.error("Tạo thông tin dịch vụ thất bại");
        dispatch({
          type: actionTypes.CREATE_SERVICE_INFO_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.CREATE_SERVICE_INFO_FAILED,
      });
    }
  };
};
export const fetchDetailServiceInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailServiceInfoService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_SERVICE_INFO_SUCCESS,
          dataDetailService: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_SERVICE_INFO_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_DETAIL_SERVICE_INFO_FAILED,
      });
    }
  };
};
