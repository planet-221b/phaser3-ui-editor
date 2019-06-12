import { Proxy } from '@candywings/pure-mvc';
import {
  authenticate,
  initializeFirebaseApp,
} from '../view/utils/firebaseUtils';
import UserVO from './vo/user/UserVO';

export default class UserVOProxy extends Proxy<UserVO> {
  public static NAME: string = 'UserVOProxy';
  public static APP_INITIALIZE_SUCCESS_NOTIFICATION: string = `${
    UserVOProxy.NAME
  }AppInitializeSuccessNotification`;
  public static INITIALIZE_SUCCESS_NOTIFICATION: string = `${
    UserVOProxy.NAME
  }InitializeSuccessNotification`;

  constructor() {
    super(UserVOProxy.NAME, new UserVO());
  }

  public onRegister(): void {
    super.onRegister();
    this.init();
  }

  public async authenticate(email: string, password: string): Promise<void> {
    authenticate(email, password);
  }

  private init(): void {
    initializeFirebaseApp();
    this.sendNotification(UserVOProxy.APP_INITIALIZE_SUCCESS_NOTIFICATION);
  }
}
