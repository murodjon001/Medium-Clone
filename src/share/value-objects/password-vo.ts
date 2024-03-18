import * as bcrypt from 'bcryptjs';

export class Password {
  private readonly hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  static async create(password: string): Promise<Password> {
    this.validate(password);
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return new Password(hash);
  }

  private static validate(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
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
