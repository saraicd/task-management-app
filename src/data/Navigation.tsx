import {
  Home,
  AlarmClockCheck,
  UsersRound,
  Clock8,
  LucideIcon,
} from "lucide-react";
import Welcome from "../components/layout/Welcome";
import { Tasks } from "../components/layout/Tasks";

export type LinkItem = {
  icon: LucideIcon;
  label: string;
  component: React.ReactNode;
  disabeld: boolean;
};

export const linkList: LinkItem[] = [
  { icon: Home, label: "Home", component: <Welcome />, disabeld: false },
  {
    icon: AlarmClockCheck,
    label: "Tasks",
    component: <Tasks />,
    disabeld: false,
  },
  {
    icon: UsersRound,
    label: "People",
    component: <Welcome />,
    disabeld: false,
  },
  {
    icon: Clock8,
    label: "Time tracking",
    component: <Welcome />,
    disabeld: false,
  },
];
