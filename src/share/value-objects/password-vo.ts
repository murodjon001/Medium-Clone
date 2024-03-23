import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  static async create(password: string): Promise<Password> {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return new Password(hash);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  async compare(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.hash);
  }
  getHash(): string {
    return this.hash;
  }
}
