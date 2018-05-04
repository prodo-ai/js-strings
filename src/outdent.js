// @flow

import _ from "lodash";

const longEmptyString = _.repeat(" ", 512);

export const outdent = (spaces: number, str: string) =>
  longEmptyString.slice(0, spaces || 0) + str;
