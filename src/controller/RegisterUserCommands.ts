import { SimpleCommand, SyncMacroCommand } from '@candywings/pure-mvc';

export default class RegisterUserCommands extends SyncMacroCommand<
  SimpleCommand
> {
  public execute(): void {}
}
