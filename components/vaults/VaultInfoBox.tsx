import VaultInfoTitle from './VaultInfoTitle';

export default function VaultInfoBox({
  title,
  info,
  value,
  moreInfo
} : {
  title: string;
  info: string;
  value: number;
  moreInfo?: string;
}) {
  return <div className="min-h-[88px]">
    <VaultInfoTitle title={title} info={info} />
    <div className="font-bold text-3xl my-1">{value}</div>
    {moreInfo && <div className="text-xs text-primary">{moreInfo}</div>}
  </div>;
}
