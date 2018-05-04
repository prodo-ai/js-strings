// @flow

export const trimSplit = (char: string, str: string) =>
  str
    .split(char)
    .map(x => x.trim())
    .filter(x => x.length);
