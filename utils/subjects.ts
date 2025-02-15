export type Subject = (typeof subjects)[number];

const subjects = [
  {
    name: "Smoking",
    viewBox: "0 2178 82 66",
  },
  {
    name: "Drinking",
    viewBox: "0 1914 82 66",
  },
  {
    name: "Screen Time",
    viewBox: "0 1848 82 66",
  },
] as const;

export default subjects;
