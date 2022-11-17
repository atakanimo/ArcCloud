import GS1AppIdenList from './GS1AppIdenList';
import GLN from './GLN';
import Company from './Company';
import SNClient from './SNClient';
import TLCarrier from './TLCarrier';
import TLCountryCode from './TLCountryCode';
import ShipmentOrder from './ShipmentOrder';
import MahSaler from './MahSaler';
import TraceTag from './TraceTag';

export const pages = [
  {
    id: 'panel1',
    title: 'GS1AppIdenList',
    details: GS1AppIdenList,
  },
  {
    id: 'panel2',
    title: 'GLN',
    details: GLN,
  },
  {
    id: 'panel3',
    title: 'COMPANY',
    details: Company,
  },
  {
    id: 'panel4',
    title: 'CRYPTOCLIENT',
    details: GLN,
  },
  {
    id: 'panel5',
    title: 'MAH-SALER',
    details: MahSaler,
  },
  {
    id: 'panel6',
    title: 'MD-CHANGE-STATE',
    details: GLN,
  },
  {
    id: 'panel7',
    title: 'ME',
    details: GLN,
  },
  {
    id: 'panel8',
    title: 'MEEEEE',
    details: GLN,
  },
  {
    id: 'panel9',
    title: 'SHIPMENT-ORDER',
    details: ShipmentOrder,
  },
  {
    id: 'panel10',
    title: 'SiteLocationMD',
    details: GLN,
  },
  {
    id: 'panel11',
    title: 'SiteLocationPO',
    details: GLN,
  },
  {
    id: 'panel12',
    title: 'SNCLIENT',
    details: SNClient,
  },
  {
    id: 'panel13',
    title: 'TL-CARRIER',
    details: TLCarrier,
  },
  {
    id: 'panel14',
    title: 'TL-COUNTRY',
    details: GLN,
  },
  {
    id: 'panel15',
    title: 'TL-COUNTRYCODE',
    details: TLCountryCode,
  },
  {
    id: 'panel16',
    title: 'TL-COUNTRYCODECODE',
    details: GLN,
  },
  {
    id: 'panel17',
    title: 'TRACE-TAG',
    details: TraceTag,
  },
];

export default pages;
