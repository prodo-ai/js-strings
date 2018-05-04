// @flow

export const maxWidth = (str: string) => {
  if (Array.isArray(str)) {
    return str.map(maxWidth).reduce((p, w) => Math.max(p, w), 0);
  }
  return str.split("\n").reduce((p, line) => Math.max(p, line.length), 0);
};
