// @flow

import {trimSplit} from "../src";
import test from "ava";

test("trimSplit example 1", t => {
  const input = `
        asdasdasd
    adsfdaf adsf asdf

    adsf

  `;
  const output = trimSplit("\n", input);
  const expected = ["asdasdasd", "adsfdaf adsf asdf", "adsf"];
  t.deepEqual(output, expected);
});

test("trimSplit example 2", t => {
  const input = " asdsad as  faf 22 ";
  const output = trimSplit(" ", input);
  const expected = ["asdsad", "as", "faf", "22"];
  t.deepEqual(output, expected);
});
