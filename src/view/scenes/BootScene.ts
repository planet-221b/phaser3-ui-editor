import { Images } from '../../assets';
import Game from '../../Game';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import { loadImages } from '../utils/assetLoader';
import BaseScene from './BaseScene';

export default class BootScene extends BaseScene {
  public static NAME: string = 'BootScene';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${
    BootScene.NAME
  }LoadCompleteNotification`;
  public static LOAD_COMPLETE_EVENT: string = `${BootScene.NAME}loadComplete`;

  public game: Game;
  constructor() {
    super(BootScene.NAME);
  }
  public preload(): void {
    loadImages(this, Images);
  }

  public create(): void {
    this.i18n.initialize(
      {
        fallbackLng: PlayerVOProxy.defaultLanguage,
        loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
        debug: false,
      },
      () => {
        this.events.emit(BootScene.LOAD_COMPLETE_EVENT);
      },
    );
  }
}
