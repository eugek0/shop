import * as parser from 'ua-parser-js';
import * as iso31662 from 'iso-3166-2';
import * as geoip from 'geoip-lite';

import { TApp, TGeo, TInfoByUA, TOs, TUserAgent } from '@common/types';

export const getGeoByIp = (ip: string | null): TGeo => {
  const geo = geoip.lookup(ip);
  const country = getCountryByCode(geo?.country);
  const region = getRegionByCodes(geo?.country, geo?.region);
  const city = geo?.city || null;

  return {
    country,
    region,
    city,
  };
};

export const getCountryByCode = (country?: string): string | null => {
  try {
    return new Intl.DisplayNames('en', { type: 'region' }).of(country);
  } catch {
    return null;
  }
};

export const getRegionByCodes = (
  countryCode?: string,
  regionCode?: string,
): string | null => {
  try {
    const candidate = iso31662.subdivision(`${countryCode}-${regionCode}`);

    return candidate?.name || null;
  } catch {
    return null;
  }
};

export const getInfoByUA = (userAgent: TUserAgent): TInfoByUA => {
  const app = getAppByUA(userAgent);
  const os = getOsByUa(userAgent);

  return {
    app,
    os,
  };
};

export const getAppByUA = (userAgent: TUserAgent): TApp => {
  const { browser } = parser(userAgent) || {};
  const { name, major } = browser || {};

  return name && major ? `${name} ${major}` : null;
};

export const getOsByUa = (userAgent: TUserAgent): TOs => {
  const { os } = parser(userAgent) || {};
  const { name, version } = os || {};

  return name && version ? `${name} ${version}` : null;
};

export const getUAByHeaders = (headers): TUserAgent => {
  return headers['user-agent'] || null;
};

const ucFirstLetter = (str: string): string => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export const isMobileAppRequest = (headers): boolean =>
  headers['request-for-mobile'] === 'true';

export const getDeviceInfoMobileApp = (headers) => {
  const osName = headers['mobile-os'] || null;
  const version = headers['mobile-os-version'] || null;
  const os = osName && version ? `${ucFirstLetter(osName)} ${version}` : null;
  const app = headers['mobile-app'] || null;

  return {
    app,
    os,
  };
};

export const getDeviceInfoByHeaders = (headers): TInfoByUA => {
  const isMobile = isMobileAppRequest(headers);

  if (isMobile) return getDeviceInfoMobileApp(headers);

  const userAgent = getUAByHeaders(headers);

  return getInfoByUA(userAgent);
};
