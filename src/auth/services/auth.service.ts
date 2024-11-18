import { Injectable } from '@nestjs/common';
import { LoginDto, RefreshDto, ChangePasswordDto, UpdateInfoDto, RegisterDto } from '../auth.dto';
import {
  BaseService,
  isValidEmail,
  stringToHash,
  TokensService,
  UserKindEnum,
  UserStatusEnum,
} from '@app/shared';

@Injectable()
export class AuthService extends BaseService {
  constructor(private readonly tokenService: TokensService) {
    super();
  }

  async login(dto: LoginDto) {
    const user = await this.findUserByEmailAndPassword(dto.email_or_mobile, dto.password);
    return await this.tokenService.createNewTokens(user.id);
  }

  async register(dto: RegisterDto) {
    await this.validateNewEmailAndMobile({ mobile: dto.mobile, email: dto.email });

    try {
      const user = await this.prisma.$transaction(async (tx) => {
        const txUser = await tx.user.create({
          data: {
            mobile: dto.mobile,
            email: dto.email,
            national_code: null,
            fullname: dto.fullname,
            password: stringToHash(dto.password),
            kind: UserKindEnum.Athlete,
            status: UserStatusEnum.Active,
            verify_email: false,
          },
        });

        await tx.profile.create({
          data: {
            user_id: txUser.id,
            avatar_url: null,
            gender: dto.gender,
            blood_type: null,
            marital_status: null,
            job: null,
            education: null,
            address: null,
            weight: dto.weight,
            height: dto.height,
            birth_day: dto.birth_day,
          },
        });

        return txUser;
      });

      return await this.tokenService.createNewTokens(user.id);
    } catch (error) {
      this.catchError(error, 'AuthService');
    }
  }

  async logout(token: string) {
    await this.tokenService.revokeToken(token);
  }

  async changePassword(clientId: string, dto: ChangePasswordDto) {
    let whereCondition = { id: clientId };

    if (dto.current_password) {
      whereCondition['password'] = stringToHash(dto.current_password);
    }

    const client = await this.prisma.user.findFirst({
      where: whereCondition,
    });

    if (!client) {
      if (dto.current_password) {
        this.unprocessableEntityException(['current_password']);
      } else {
        this.notFoundException('User not found');
      }
    }

    try {
      await this.prisma.user.update({
        where: { id: clientId },
        data: { password: stringToHash(dto.new_password) },
      });
    } catch (error) {
      this.catchError(error, 'AuthService');
    }
  }

  async refreshToken(dto: RefreshDto) {
    const user = await this.tokenService.fetchUserByAccessTokenAndRefreshToken(
      dto.access_token,
      dto.refresh_token,
    );

    if (!user) {
      this.badRequestException();
    }

    return await this.tokenService.createNewTokens(user.id);
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    try {
      await this.prisma.profile.update({
        where: { user_id: userId },
        data: { avatar_url: avatarUrl },
      });
    } catch (error) {
      this.catchError(error, 'AuthService');
    }
  }

  async updateUserInfo(dto: UpdateInfoDto, user: IUser) {
    if (dto.email && dto.email !== user.email) {
      await this.validateNewEmailAndMobile({ email: dto.email });
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: {
            email: dto.email,
            national_code: dto.national_code,
            fullname: dto.fullname,
          },
        });

        await tx.profile.update({
          where: { user_id: user.id },
          data: {
            gender: dto.gender,
            weight: dto.weight,
            height: dto.height,
            blood_type: dto.blood_type,
            marital_status: dto.marital_status,
            job: dto.job,
            education: dto.education,
            address: dto.address,
            birth_day: dto.birth_day,
          },
        });
      });
    } catch (error) {
      this.catchError(error, 'AuthService');
    }
  }

  async findUserByEmailAndPassword(emailOrMobile: string, password: string): Promise<IUser> {
    const hashedPassword = stringToHash(password);

    let where: any = {
      mobile: emailOrMobile,
      password: hashedPassword,
    };

    if (isValidEmail(emailOrMobile)) {
      where = {
        email: emailOrMobile,
        password: hashedPassword,
      };
    }

    const user = await this.prisma.user.findFirst({ where });

    if (!user) {
      this.badRequestException('Please register first');
    }

    if (user.status !== UserStatusEnum.Active) {
      this.limitedUnAuthorizedException();
    }

    return user;
  }

  async validateNewEmailAndMobile({ email, mobile }: { email?: string; mobile?: string }) {
    let user: IUser;

    if (email) {
      user = await this.prisma.user.findFirst({ where: { email } });

      if (user && user.id) {
        this.unprocessableEntityException(['email'], 'Email already exists in the system');
      }
    }

    if (mobile) {
      user = await this.prisma.user.findFirst({ where: { mobile } });

      if (user && user.id) {
        this.unprocessableEntityException(['mobile'], 'Mobile number already exists in the system');
      }
    }
  }
}
