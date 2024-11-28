const { HASH_SALT_ROUNDS } = process.env;

import * as bcrypt from 'bcrypt';

/**
 * Класс для хеширования данных
 *
 * Методы:
 *  - Метод ассинхронной сверки хешированного и не хешированного значения на идентичность.
 *  - Метод ассинхронного хеширования.
 *  - Метод синхронного хеширования.
 */

export abstract class Hasher {
  public static async hash(password: string) {
    return bcrypt.hash(password, +HASH_SALT_ROUNDS);
  }

  public static hashSync(password) {
    return bcrypt.hashSync(password, +HASH_SALT_ROUNDS);
  }

  public static async comparer(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
