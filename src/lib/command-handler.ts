import { CommandContext } from "./command-context";

export interface CommandHandler {
    handle(context: CommandContext) : Promise<void>;
    get aliases() : string[];
    get name(): string;
}