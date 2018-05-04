// @flow

export const smartTrim = (str: string) => {
  // remove trailing spaces in each line
  // remove first empty lines
  // remove last empty lines
  // remove indent if all non-empty lines are indented
  let lines = str.split("\n").map(x => x.trimRight());
  let firstNonEmpty = 0;
  while (lines[firstNonEmpty] === "") {
    firstNonEmpty++;
  }
  let lastNonEmpty = lines.length - 1;
  while (lines[lastNonEmpty] === "") {
    lastNonEmpty--;
  }
  lines = lines.slice(firstNonEmpty, lastNonEmpty + 1);
  if (!lines.length) {
    return "";
  }
  let minIndent = lines
    .filter(x => x.trim().length)
    .map(x => /^ */.exec(x)[0].length)
    .reduce((p, i) => Math.min(p, i), Infinity);
  return lines.map(x => x.slice(minIndent)).join("\n");
};
