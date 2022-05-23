export type MappingFunction<U, V> = (u: U) => Maybe<V>;

type MaybeInterface<Type, U> = {
  type: Type;
  bind: <V>(fn: MappingFunction<U, V>) => Maybe<V>;
};

export type Success<U> = MaybeInterface<"SUCCESS", U> & { result: U };

export type Error<U> = MaybeInterface<"ERROR", U> & { error: string };

export type Maybe<U> = Success<U> | Error<U>;

export const success = <U>(result: U): Success<U> => ({
  type: "SUCCESS",
  result,
  bind: <V>(fn: MappingFunction<U, V>) => fn(result),
});

export const error = <U>(e: string): Error<U> => ({
  type: "ERROR",
  error: e,
  bind: <V>(_fn: MappingFunction<U, V>) => error<V>(e),
});

export const isSuccess = <U>(maybe: Maybe<U>): maybe is Success<U> => {
  return maybe.type === "SUCCESS";
};

/*
 * Testing facilities
 */

export const getResult = <U>(maybe: Maybe<U>): U => {
  return (maybe as Success<U>).result;
};

export const getError = <U>(maybe: Maybe<U>): string => {
  return (maybe as Error<U>).error;
};
