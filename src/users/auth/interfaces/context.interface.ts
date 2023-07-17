import { ExecutionContext } from "@nestjs/common";
import { ICurrentUser } from "./current-user.interface";

export interface IContext extends ExecutionContext {
    user: ICurrentUser
}
