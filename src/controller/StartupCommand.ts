import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import UserVOProxy from '../model/UserVOProxy';
import RegisterUserCommands from './RegisterUserCommands';

export default class StartupCommand extends AsyncMacroCommand<SimpleCommand> {
  public async execute(notificationName: string): Promise<void> {
    this.startProxyInitialization();
    super.execute(notificationName);
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterUserCommands);
  }

  private startProxyInitialization(): void {
    this.facade.registerProxy(new UserVOProxy());
  }
}
