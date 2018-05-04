// @flow

import _ from "lodash";

export function multiline(strings: string[], ...expressions: string[]): string {
  const indent = _.min(
    _.flatMap(strings, (string: string, index: number): number[] => {
      const newLines = string
        .split("\n")
        .slice(1)
        .filter(line => line.length > 0);
      if (
        index === strings.length - 1 &&
        /^\s*$/.test(newLines[newLines.length - 1])
      ) {
        newLines.length = newLines.length - 1;
      }
      return newLines
        .map(line => line.match(/^ */))
        .filter(match => match != null)
        .map((match: any) => match[0].length);
    }),
  );
  const indentRegExp = indent && new RegExp(`\\n {0,${indent}}`, "g");
  const dedentedStrings = indentRegExp
    ? strings.map(string => string.replace(indentRegExp, "\n"))
    : strings;
  let string = "";
  for (let i = 0; i < strings.length; i++) {
    string += dedentedStrings[i];
    if (i < expressions.length) {
      string += expressions[i];
    }
  }
  string = string.replace(/^\n/, "");
  return string;
}
