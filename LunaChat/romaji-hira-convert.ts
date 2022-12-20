import romaji_hira from "./romaji-hira-table";

export default (input: string) => {
  let result = "";
  let state: any = romaji_hira;
  let pending = "";
  let dual = false;
  let offset = 0;
  const size = input.length;
  while (offset < size) {
    const char = input[offset];
    if (char in state) {
      const value = state[char];
      if (typeof value === "string") {
        if (dual) {
          result += "っ";
          dual = false;
        }
        result += value;
        pending = "";
        state = romaji_hira;
      } else {
        state = value;
        pending = char;
      }
      offset += 1;
      continue;
    }
    if (dual) {
      result += pending + pending;
      pending = "";
      state = romaji_hira;
      dual = false;
      continue;
    }
    switch (pending) {
      case char:
        dual = true;
        state = romaji_hira;
        continue;
      case "n":
        result += "ん";
        pending = "";
        state = romaji_hira;
        continue;
      case "":
        result += char;
        offset += 1;
        continue;
    }
    result += pending;
    pending = "";
    state = romaji_hira;
    continue;
  }
  if (dual) {
    pending += pending;
  }
  return result + pending;
};
