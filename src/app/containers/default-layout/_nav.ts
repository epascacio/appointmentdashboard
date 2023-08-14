import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'CMS'
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Businesses',
    url: '/businesses',
    iconComponent: { name: 'cil-building' }
  },
  {
    name: 'Services',
    url: '/services',
    iconComponent: { name: 'cil-applications' }
  },
  {
    name: 'Appointments',
    url: '/appointments',
    iconComponent: { name: 'cil-calendar-check' }
  },
];
