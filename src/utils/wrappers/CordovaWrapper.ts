//Cordova
import { isNullOrUndefined } from 'util';
import Game from '../../Game';
import GameFacade from '../../GameFacade';

export function initCordova(): void {
  if (window.isMobile()) {
    const cordovaLoadScript = document.createElement('script');
    cordovaLoadScript.src = 'cordova.js';
    document.head.append(cordovaLoadScript);
  } else {
    const fbSdkScript = document.createElement('script');
    fbSdkScript.src = 'https://connect.facebook.net/es_LA/sdk.js';
    document.head.append(fbSdkScript);
  }
  initAndroidFullScreen();
}

export function initAndroidFullScreen(): void {
  document.addEventListener('deviceready', () => {
    GameFacade.CordovaReady(Game.NAME);
    if (window.cordova) {
      if (window.cordova.platformId === 'android') {
        if (!isNullOrUndefined(window.AndroidFullScreen)) {
          AndroidFullScreen.isSupported(
            () => {
              AndroidFullScreen.immersiveMode();
            },
            (error: any) => {
              console.error(error);
            },
          );
        }
      }
      document.addEventListener(
        'backbutton',
        () => {
          // back button action
        },
        false,
      );
    }
  });
}
