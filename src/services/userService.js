import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const handleUserRegister = (data) => {
  return axios.post("/api/register", data);
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
const editUserService = (userId) => {
  return axios.put("/api/edit-user", userId);
};
const getAllCodeService = (inputtype) => {
  return axios.get(`/api/allcode?type=${inputtype}`);
};

const getDentistNewService = (limit) => {
  return axios.get(`/api/get-dentist-new?limit=${limit}`);
};
const getDentistAllService = () => {
  return axios.get(`/api/get-dentist-all`);
};
const createDentistInfoService = (data) => {
  return axios.post("/api/create-dentist-info", data);
};

const getDetailDentistInfoService = (id) => {
  return axios.get(`/api/get-detail-dentist-by-id?id=${id}`);
};

const createScheduleDentistService = (data) => {
  return axios.post("/api/create-schedule-dentist", data);
};

const getScheduleDentistByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-dentist-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDentistByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-info-dentist-by-id?doctorId=${doctorId}`);
};

//dichj vuj
const createServiceNewService = (data) => {
  return axios.post("/api/create-new-service", data);
};
const createServiceInfoService = (data) => {
  return axios.post("/api/create-service-info", data);
};
const getServiceAllService = () => {
  return axios.get("/api/get-service-all");
};
const getServiceAllLimitService = (limit) => {
  return axios.get(`/api/get-service-all-limit?limit=${limit}`);
};
const getDetailServiceInfoService = (id) => {
  return axios.get(`/api/get-detail-service-by-id?id=${id}`);
};
const deleteService = (userId) => {
  return axios.delete("/api/delete-service", { data: { id: userId } });
};

//booking
const bookingPatientService = (data) => {
  return axios.post("/api/patient-booking", data);
};
const verifyBookingPatientService = (data) => {
  return axios.post("/api/verify-patient-booking", data);
};
const getListPatientForDentistService = (data) => {
  return axios.get(`/api/get-list-patient-for-dentist?date=${data.date}`);
};

const getListScheduleService = (data) => {
  return axios.get(
    `/api/get-list-schedule?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const senBillService = (data) => {
  return axios.post("/api/send-bill", data);
};

const deleteSchedule = (userId) => {
  return axios.delete("/api/delete-schedule", { data: { id: userId } });
};
export {
  deleteSchedule,
  getListScheduleService,
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDentistNewService,
  getDentistAllService,
  createDentistInfoService,
  getDetailDentistInfoService,
  createScheduleDentistService,
  getScheduleDentistByDateService,
  getExtraInfoDentistByIdService,
  createServiceNewService,
  getServiceAllService,
  getServiceAllLimitService,
  deleteService,
  createServiceInfoService,
  getDetailServiceInfoService,
  handleUserRegister,
  bookingPatientService,
  verifyBookingPatientService,
  getListPatientForDentistService,
  senBillService,
};
