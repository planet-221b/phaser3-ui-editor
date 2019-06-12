import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import GameVOProxy from '../model/GameVOProxy';
import PlayerVOProxy from '../model/PlayerVOProxy';
import RegisterAdsCommands from './RegisterAdsCommands';
import RegisterGameCommands from './RegisterGameCommands';
import RegisterPlayerCommands from './RegisterPlayerCommands';

const forceData: IUserData = {
  id: -1,
  name: 'noName',
};

export default class StartupCommand extends AsyncMacroCommand<SimpleCommand> {
  public async execute(notificationName: string): Promise<void> {
    this.startProxyInitialization(forceData);
    super.execute(notificationName);
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterGameCommands);
    this.addSubCommand(RegisterPlayerCommands);
    this.addSubCommand(RegisterAdsCommands);
  }

  private startProxyInitialization(data: IUserData): void {
    this.facade.registerProxy(new PlayerVOProxy(data.name, data.id));
    this.facade.registerProxy(new GameVOProxy());
  }
}

interface IUserData {
  id: number;
  name: string;
}
