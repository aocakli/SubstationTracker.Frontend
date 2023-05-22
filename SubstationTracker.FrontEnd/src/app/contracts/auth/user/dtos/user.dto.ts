import { RoleDto } from "./role.dto";
import { UserBaseDto } from "./user.base.dto";

export class UserDto extends UserBaseDto {
	role: RoleDto = new RoleDto();
}