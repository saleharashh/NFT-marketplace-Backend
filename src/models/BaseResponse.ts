export class BaseResponse<T = any> {
  isSuccess?: boolean;
  message?: string;
  data?: T;
  errorCode?: string;

  constructor(partial?: Partial<BaseResponse<T>>) {
    Object.assign(this, partial);
  }
  static ok<T>(data: T, message = 'Success'): BaseResponse<T> {
    return new BaseResponse<T>({ isSuccess: true, data, message });
  }

  static fail(message = 'Success', errorCode?: string): BaseResponse<null> {
    return new BaseResponse<null>({ isSuccess: true, message, errorCode });
  }
}
