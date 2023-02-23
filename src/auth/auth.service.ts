import { Injectable } from '@nestjs/common';
import { UserAdmin } from 'src/user-admin/entities/user-admin.entity';
import { UserAdminService } from 'src/user-admin/user-admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserAdminService) {}

  async validateUser(username: string, password: string): Promise<UserAdmin> {
    const user = await this.userService.findOneByEmail(username);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      return match === true ? user : null;
    }

    return null;
  }
}
