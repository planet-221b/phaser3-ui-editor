import { FACEBOOK_APP_ID } from '../../constants/Constants';

export default class FbSdkWrapper {
  public static async init(): Promise<void> {
    return new Promise<void>(
      (
        resolve: (value?: void | PromiseLike<void>) => void,
        reject: (reason: any) => void,
      ) => {
        window.FB.init(
          {
            appId: `${FACEBOOK_APP_ID}`,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.3',
            status: true,
          },
          resolve,
          reject,
        );
      },
    );
  }
  public static async login(): Promise<void> {
    return new Promise<void>(
      (
        resolve: (value?: void | PromiseLike<void>) => void,
        reject: (reason: any) => void,
      ) => {
        window.FB.login(resolve, reject);
      },
    );
  }

  public static getLoginStatus(): Promise<IFacebookLoginData> {
    return new Promise<IFacebookLoginData>(
      (
        resolve: (
          value?: IFacebookLoginData | PromiseLike<IFacebookLoginData>,
        ) => void,
        reject: (reason: any) => void,
      ) => {
        window.FB.getLoginStatus(resolve, reject);
      },
    );
  }

  public static async getPlayerData(): Promise<IFacebookLoginPlayerData> {
    return new Promise(
      (
        resolve: (
          value?:
            | IFacebookLoginPlayerData
            | PromiseLike<IFacebookLoginPlayerData>,
        ) => void,
        reject: (reason: any) => void,
      ) => {
        window.FB.api(
          `/me`,
          'GET',
          { fields: ['name,picture'] },
          reject,
          resolve,
        );
      },
    );
  }
}

export interface IFacebookLoginData {
  authResponse: IFacebookLoginAuthResponse;
  status: FacebooLoginStatus;
}

export interface IFacebookLoginAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

export enum FacebooLoginStatus {
  CONNECTED = 'connected',
  NOT_AUTORIZED = 'not_authorized',
  UNKNOWN = 'unknown ',
}

export interface IFacebookLoginPermissions {
  scope: string;
}

export enum FacebookLoginPremssion {
  PUBLIC_PROFILE = 'public_profile',
  EMAIL = 'email',
}

export interface IFacebookLoginPlayerData {
  name: string;
  id: string;
  picture: any;
}
