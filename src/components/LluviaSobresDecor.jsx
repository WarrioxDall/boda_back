import { lluviaSobresIcon } from '../config/invitationIcons';

export default function LluviaSobresDecor() {
  const { type, value, className } = lluviaSobresIcon;

  if (type === 'emoji') {
    return <span className={className} aria-hidden="true">{value}</span>;
  }

  if (type === 'image') {
    return <img src={value} alt="" className={className} aria-hidden="true" />;
  }

  const Icon = value;
  return <Icon className={className} />;
}
