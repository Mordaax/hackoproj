import type { StaticImageData } from "next/image";
import _addictionsSvg from "../public/flags.svg";
import type { Subject } from "../utils/subjects";

const addictionsSvg = _addictionsSvg as StaticImageData;

export const Addiction = ({
  subject,
  width = 84,
}: {
  subject: Subject;
  width?: number;
}) => {
  const height = width * (19.3171 / 24);
  return (
    <svg viewBox={subject.viewBox} style={{ height, width }}>
      <image
        height={addictionsSvg.height}
        href={addictionsSvg.src}
        width={addictionsSvg.width}
      ></image>
    </svg>
  );
};
