import 'phaser';
import { isNullOrUndefined } from 'util';
import { gameConfig } from './constants/GameConfig';
import Game from './Game';
import { gameConfiguration } from './utils/Utils';

function setUpDimension(): void {
  let screenWidth: number = window.innerWidth / window.devicePixelRatio;
  let screenHeight: number = window.innerHeight / window.devicePixelRatio;
  const designMultiplier: number =
    gameConfig.canvasHeight / gameConfig.canvasWidth;
  const screenMultiplier: number = screenHeight / screenWidth;
  const difMultiplier: number = designMultiplier / screenMultiplier;
  gameConfig.canvasWidth *= difMultiplier;
  gameConfig.scaleMultiplier = Math.min(difMultiplier, 1);
}

function startGame(): void {
  new Game(gameConfiguration);
}

function loadWebFont(callback: () => any): void {
  setTimeout(() => {
    callback();
  }, 1000);
}

window.onload = () => {
  if (window.isMobile()) {
    const cordovaLoadScript = document.createElement('script');
    cordovaLoadScript.src = 'cordova.js';
    document.head.append(cordovaLoadScript);
  }
  loadWebFont(() => {
    setUpDimension();
    startGame();
  });
};

document.addEventListener('deviceready', () => {
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
