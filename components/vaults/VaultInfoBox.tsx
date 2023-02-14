import VaultInfoTitle from './VaultInfoTitle';
import styles from './VaultInfoBox.module.scss';

interface VaultInfoParams {
  title: string;
  info: string;
  subtitle: string;
  moreInfo: string;
}

const VaultInfo: React.FC<VaultInfoParams> = ({
  title,
  info,
  subtitle,
  moreInfo,
}) => {
  return <>
    <VaultInfoTitle title={title} />
  </>;
};

export default VaultInfo;
