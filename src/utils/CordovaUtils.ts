// Plugins

// cordova-plugin-facebook4
export interface IFacebookConnectPlugin {
  api: (
    graphPath: string,
    permissions: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  browserInit: (
    appId: number | string,
    version: string,
    successCallback: Function,
  ) => void;
  getAccessToken: (successCallback: Function, failCallback: Function) => void;
  getLoginStatus: (successCallback: Function, failCallback: Function) => void;
  logEvent: (
    eventName: string,
    params: Object,
    valueToSub: any,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  logPurchase: (
    value: any,
    currency: string,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  login: (
    permissions: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
  logout: (successCallback: Function, failCallback: Function) => void;
  showDialog: (
    options: Object,
    successCallback: Function,
    failCallback: Function,
  ) => void;
}

// heyzap-plugin-admob
export interface IHeyzapAds {
  start: (publisherId: string) => {};
  InterstitialAd: IHeyzapAd;
  VideoAd: IHeyzapAd;
  BannerAd: IHeyzapBannerAd;
  Options: (options: any) => any;
}

export interface IHeyzapAd {
  show: (...args: any[]) => Promise<any>;
  fetch: () => Promise<any>;
  addEventListener: (event: any, handler: Function) => {};
  Events: IHeyzapAdEvents;
}

export interface IHeyzapAdEvents {
  AVAILABLE: any;
  SHOW: any;
  HIDE: any;
  CLICKED: any;
  SHOW_FAILED: any;
  FETCH_FAILED: any;
  AUDIO_STARTED: any;
  AUDIO_FINISHED: any;
}

export interface IHeyzapBannerAd extends IHeyzapAd {
  show: (position: any) => Promise<any>;
  hide: () => Promise<any>;
  destroy: () => void;
  POSITION_TOP: any;
  POSITION_BOTTOM: any;
}
