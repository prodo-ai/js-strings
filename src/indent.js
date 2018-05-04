// @flow

export const indent = (str: string) =>
  str
    .split("\n")
    .map(x => "  " + x)
    .join("\n");
