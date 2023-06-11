import { InputType, Field } from "@nestjs/graphql";
import { CreateResourceInput } from "./create-resource-input";

@InputType()
export class UpdateResourceInput extends CreateResourceInput {
}