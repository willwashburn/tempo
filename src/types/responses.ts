export interface TempoBaseResponse {
  wasSuccessful: boolean;
}

export interface TempoSuccessResponse<S> extends TempoBaseResponse {
  wasSuccessful: true;
  body: S;
}

export interface TempoFailedResponse<F> extends TempoBaseResponse {
  wasSuccessful: false;
  body: F;
}

export type TempoResponse<S, F> = TempoSuccessResponse<S> | TempoFailedResponse<F>;
