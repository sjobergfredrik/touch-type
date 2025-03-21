export const nordicLayout = {
  main: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
    ["space bar"],
  ],
  homeRow: "asdfghjklöä",
};

export type KeyboardLayout = {
  main: string[][];
  homeRow: string;
};