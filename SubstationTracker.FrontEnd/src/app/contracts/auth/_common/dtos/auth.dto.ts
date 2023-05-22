import { UserDto } from "../../user/dtos/user.dto";
import { AccessTokenDto } from "./access-token.dto";
import { RefreshTokenDto } from "./refresh-token.dto";

export class AuthDto extends UserDto {
	accessToken: AccessTokenDto = new AccessTokenDto();
	refreshToken: RefreshTokenDto = new RefreshTokenDto();
}