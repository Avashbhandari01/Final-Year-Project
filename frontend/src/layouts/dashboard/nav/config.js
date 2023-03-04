import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArticleIcon from '@mui/icons-material/Article';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <AccountBoxIcon />,
  },
  {
    title: 'attendance',
    path: '/dashboard/attendance',
    icon: <SummarizeIcon />,
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: <ChatIcon />,
  },
  {
    title: 'calendar',
    path: '/dashboard/calendar',
    icon: <CalendarMonthIcon />,
  },
  {
    title: 'routine',
    path: '/dashboard/routine',
    icon: <ListAltIcon />,
  },
  {
    title: 'notification',
    path: '/dashboard/notification',
    icon: <NotificationsIcon />,
  },
  {
    title: 'assignments',
    path: '/dashboard/assignments',
    icon: <AssignmentIcon />,
  },
  {
    title: 'fee details',
    path: '/dashboard/feedetails',
    icon: <ArticleIcon />,
  },
  {
    title: 'feedback',
    path: '/dashboard/feedback',
    icon: <FeedbackIcon />,
  },
];

export default navConfig;
