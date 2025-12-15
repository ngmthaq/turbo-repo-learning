import * as bcrypt from 'bcrypt';

export async function hash(string: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(string, saltRounds);
}

export async function isMatch(
  string: string,
  hashedString: string,
): Promise<boolean> {
  return bcrypt.compare(string, hashedString);
}
