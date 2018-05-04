// @flow

import {multiline} from "../src";
import test from "ava";

test("multiline removes a newline from the start", t => {
  const string = multiline`
a
b
c
`;

  t.is(string, "a\nb\nc\n");
});

test("multiline does not remove multiple newlines", t => {
  const string = multiline`


a
b
c
`;

  t.is(string, "\n\na\nb\nc\n");
});

test("multiline does not explode if a newline is missing", t => {
  const string = multiline`a
b
c`;

  t.is(string, "a\nb\nc");
});

test("mutliline does nothing to an empty string", t => {
  const string = multiline``;

  t.is(string, "");
});

test("multiline removes indentation", t => {
  const string = multiline`
    if (x > 3) {
      return x;
    }
  `;

  t.is(string, "if (x > 3) {\n  return x;\n}\n");
});

test("multiline removes indentation based on on the least amount", t => {
  const string = multiline`
      // wonky comment
    if (x > 5) {
      return x;
    }
  `;

  t.is(string, "  // wonky comment\nif (x > 5) {\n  return x;\n}\n");
});

test("multiline removes indentation when there isn't a trailing newline", t => {
  const string = multiline`
      if (x > 6) {
        return x;
      }
    }`;

  t.is(string, "  if (x > 6) {\n    return x;\n  }\n}");
});

test("multiline ignores empty lines when computing indentation", t => {
  const string = multiline`
    one

    two

    three
  `;

  t.is(string, "one\n\ntwo\n\nthree\n");
});

test("multiline performs string interpolation", t => {
  const variable = "y";
  const value = 7;
  const string = multiline`
    if (${variable} > ${value}) {
      return ${variable};
    }
  `;

  t.is(string, "if (y > 7) {\n  return y;\n}\n");
});

test("multiline will happily perform string interpolation on every line", t => {
  const string = multiline`
    ${"a"}
    ${"b"}
    ${"c"}
  `;

  t.is(string, "a\nb\nc\n");
});

test("multiline does not change the indentation of interpolated expressions", t => {
  const messages = ["One", "Two", "Three"];
  const string = multiline`
    Messages:

    ${messages.map(message => `  * ${message}`).join("\n")}
  `;

  t.is(string, "Messages:\n\n  * One\n  * Two\n  * Three\n");
});
