import pipe from "lodash/fp/pipe";
import map from "lodash/fp/map";
import fromPairs from "lodash/fp/fromPairs";


const NUMERALS = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
};


const ALPHA = pipe(
    map(c => [c, `regional_indicator_${c}`]),
    fromPairs,
)("abcdefghijklmnopqrstuvwxyz");


const REPLACEMENT = {
    ...NUMERALS,
    ...ALPHA,
    "!": "exclamation",
    "?": "question",
};


export default function emojify(text) {
    return text
        .toLocaleLowerCase()
        .split("")
        .map(c => c in REPLACEMENT ? ` :${REPLACEMENT[c]}: ` : c)
        .join("")
        .replace(/(\s){2}/g, "$1")
        .trim();
};