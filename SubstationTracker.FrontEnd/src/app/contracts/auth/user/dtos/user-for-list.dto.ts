import { UserRoleEnum } from "@contracts/_common/enums/user-role.enum";
import { UserBaseDto } from "./user.base.dto";

export class UserForListDto extends UserBaseDto {
	role: UserRoleEnum = UserRoleEnum.Unknown;
}