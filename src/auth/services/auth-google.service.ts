import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { BaseService, TokensService } from '@app/shared';

@Injectable()
export class AuthGoogleService extends BaseService {
  constructor(private readonly tokenService: TokensService) {
    super();
  }

  async callbackAction(code: string) {
    try {
      // request for get access token & token id
      const { data }: { data: GoogleAuthToken } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.configs.get('google.clientId'),
        client_secret: this.configs.get('google.secret'),
        redirect_uri: this.configs.get('google.callBackUrl'),
        grant_type: 'authorization_code',
        code,
      });

      const { access_token } = data;

      if (!access_token) {
        throw new Error('Google api token not working, access_token not detect');
      }

      // request for get user profile info
      const { data: info }: { data: GoogleAuthUserInfo } = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      // process user email for login or register action
      if (info.email) {
        let user = await this.prisma.user.findFirst({ where: { email: info.email } });

        if (!user || !user?.id) {
          this.badRequestException('Register first please!');
        }

        // finally generate jwt tokens for user
        return await this.tokenService.createNewTokens(user.id);
      }

      // if user email not detect, process has been failed
      else {
        throw new Error('Google api userinfo not working, email property not detect');
      }
    } catch (error) {
      this.catchError(error, 'AuthGoogleService');
    }
  }

  redirectUrl() {
    const clientId = this.configs.get('google.clientId');
    const callBackUrl = this.configs.get('google.callBackUrl');
    const queries = `client_id=${clientId}&redirect_uri=${callBackUrl}&response_type=code&scope=profile email`;
    return `https://accounts.google.com/o/oauth2/v2/auth?${queries}`;
  }
}
