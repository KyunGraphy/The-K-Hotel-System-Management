export const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
export const WAREHOUSE_CAPACITY = 42;

// ----------------------------------------------------------------
export const MANAGEMENT_ITEMS = [
  {
    name: 'Home Page',
    pathName: 'home',
    url: '/',
  },
  {
    name: 'Rooms Page',
    pathName: 'room',
    url: '/admin/room',
  },
  {
    name: 'Reservation Page',
    pathName: 'reservation',
    url: '/admin/reservation',
  },
  {
    name: 'Business Page',
    pathName: 'business',
    url: '/admin/business',
  },
  {
    name: 'Staff Page',
    pathName: 'staff',
    url: '/admin/staff',
  },
  {
    name: 'Warehouse Page',
    pathName: 'warehouse',
    url: '/admin/warehouse',
  },
  {
    name: 'Procurement Page',
    pathName: 'procurement',
    url: '/admin/procurement',
  },
  {
    name: 'Finance Page',
    pathName: 'finance',
    url: '/admin/finance',
  },
  {
    name: 'Statistic Page',
    pathName: 'statistic',
    url: '/admin/statistic',
  },
]

// ----------------------------------------------------------------
export const roomsStatus = [
  {
    status: 'Available',
    bg: '#32CD32',
  },
  {
    status: 'Booked',
    bg: '#ff0000',
  },
  {
    status: 'Using',
    bg: '#FF8C00',
  },
  // {
  //   status: 'Check Out',
  //   bg: '#5d4b63',
  // },
  {
    status: 'Maintenance',
    bg: '#737373',
  },
];

// ----------------------------------------------------------------
export const roomPrice = {
  single: 30,
  double: 50,
}
