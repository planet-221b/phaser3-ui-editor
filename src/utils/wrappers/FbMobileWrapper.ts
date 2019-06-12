import { FACEBOOK_APP_ID } from '../../constants/Constants';
import { IFacebookLoginData, IFacebookLoginPlayerData } from './FbSdkWrapper';

export default class FbMobileWrapper {
  public static async init(): Promise<void> {
    return new Promise<void>(
      (resolve: (value?: void | PromiseLike<void>) => void) => {
        window.facebookConnectPlugin.browserInit(
          `${FACEBOOK_APP_ID}`,
          'v3.3',
          resolve,
        );
      },
    );
  }

  public static async getLoginStatus(): Promise<IFacebookLoginData> {
    return new Promise<IFacebookLoginData>(
      (
        resolve: (
          value?: IFacebookLoginData | PromiseLike<IFacebookLoginData>,
        ) => void,
        reject: (reason: any) => void,
      ) => {
        window.facebookConnectPlugin.getLoginStatus(resolve, reject);
      },
    );
  }

  public static async showDialog(): Promise<void> {
    return new Promise<void>(
      (
        resolve: (value?: void | PromiseLike<void>) => void,
        reject: (reason: any) => any,
      ) => {
        window.facebookConnectPlugin.showDialog({}, resolve, reject);
      },
    );
  }
  public static async getAccessToken(): Promise<string> {
    return new Promise<string>(
      (
        resolve: (value?: string | PromiseLike<string>) => void,
        reject: (reason: any) => any,
      ) => {
        window.facebookConnectPlugin.getAccessToken(resolve, reject);
      },
    );
  }
  public static async login(permissions?: Object): Promise<string> {
    return new Promise<string>(
      (
        resolve: (value?: string | PromiseLike<string>) => void,
        reject: (reason: any) => any,
      ) => {
        window.facebookConnectPlugin.login(permissions, resolve, reject);
      },
    );
  }
  public static async logout(): Promise<string> {
    return new Promise<string>(
      (
        resolve: (value?: string | PromiseLike<string>) => void,
        reject: (reason: any) => any,
      ) => {
        window.facebookConnectPlugin.logout(resolve, reject);
      },
    );
  }

  public static async callAPI(
    graphPath: string,
    permissions?: Object,
  ): Promise<string> {
    return new Promise<string>(
      (
        resolve: (value?: string | PromiseLike<string>) => void,
        reject: (reason: any) => any,
      ) => {
        window.facebookConnectPlugin.api(
          graphPath,
          permissions,
          resolve,
          reject,
        );
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
        window.facebookConnectPlugin.api(`/me`, [], resolve, reject);
      },
    );
  }

  public static async getPlayerPhoto(): Promise<IFacebookLoginPlayerData> {
    return new Promise(
      (
        resolve: (
          value?:
            | IFacebookLoginPlayerData
            | PromiseLike<IFacebookLoginPlayerData>,
        ) => void,
        reject: (reason: any) => void,
      ) => {
        window.facebookConnectPlugin.api(
          `/me?fields=picture.type(normal)`,
          [],
          resolve,
          reject,
        );
      },
    );
  }
}
