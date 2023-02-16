export const adminMenu = [
  {
    //quan ly ng dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "Quản Lý Người Dùng",
        link: "/system/user-redux",
      },
      {
        name: "Quản Lý Nha Sĩ",
        link: "/system/manage-doctor",
      },
      {
        name: "Quản lý lịch khám",
        link: "/dentist/manage-schedule",
      },
    ],
  },
  {
    //quan ly ng dung
    name: "menu.admin.clinic",
    link: "/dentist/manage-schedule",
  },
  {
    //quan ly ng dung
    name: "menu.admin.specialty",
    menus: [
      {
        name: "ffffffff",
        // link: "/dentist/manage-schedule",
      },
    ],
  },
  {
    //quan ly ng dung
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const dentistMenu = [
  {
    //quan ly ng dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "Quản lý lịch khám",
        link: "/dentist/manage-schedule",
      },
    ],
  },
];
