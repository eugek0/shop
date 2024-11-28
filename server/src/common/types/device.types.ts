export type TGeo = Pick<IDevice, 'country' | 'city' | 'region'>;

export type TInfoByUA = Pick<IDevice, 'os' | 'app'>;

export type TUserAgent = string | null;

export type TApp = IDevice['app'];

export type TOs = IDevice['os'];

export interface IDevice {
  country: string | null;
  region: string | null;
  city: string | null;
  app: string | null;
  os: string | null;
  ip: string | null;
}
