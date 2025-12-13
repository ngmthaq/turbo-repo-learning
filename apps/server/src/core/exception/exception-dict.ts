// eslint-disable-next-line @typescript-eslint/no-explicit-any
function standardizeRule(rule: string, params?: Record<string, any>) {
  if (!params) return JSON.stringify({ rule });
  return JSON.stringify({ rule, params });
}

export class ExceptionDict {
  public static isString() {
    return standardizeRule('isString');
  }

  public static isNotEmpty() {
    return standardizeRule('isNotEmpty');
  }

  public static isEmail() {
    return standardizeRule('isEmail');
  }

  public static minLength(minLength: number) {
    return standardizeRule('minLength', { minLength });
  }
}
