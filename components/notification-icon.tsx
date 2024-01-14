import { Badge } from "./ui/badge";

interface NotificationIconProps {
  icon?: JSX.Element;
  className?: string;
  count?: string;
}

const NotificationIcon = ({
  icon,
  className,
  count,
}: NotificationIconProps) => {
  return (
<Badge className={className}>
  {icon}
<span className="absolute -top-2 -right-2 rounded-full bg-teal-400 p-1 px-2 text-white">{count}</span>
</Badge>
  );
}
export default NotificationIcon;