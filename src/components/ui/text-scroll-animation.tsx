import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollCharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  progress: MotionValue<number>;
  start: number;
  settle: number;
};

export function ScrollCharacter({
  char,
  index,
  centerIndex,
  progress,
  start,
  settle,
}: ScrollCharacterProps) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(progress, [start, settle], [distanceFromCenter * 34, 0]);

  const y = useTransform(progress, [start, settle], [Math.abs(distanceFromCenter) * 4, 0]);

  const rotateX = useTransform(progress, [start, settle], [distanceFromCenter * 7, 0]);

  const opacity = useTransform(progress, [start, start + 0.035, settle], [0, 0.5, 1]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        x,
        y,
        rotateX,
        opacity,
        transformOrigin: "50% 70%",
      }}
      className={cn("inline-block will-change-transform", isSpace && "w-[0.28em]")}
    >
      {isSpace ? "\u00A0" : char}
    </motion.span>
  );
}

type ScrollTextLineProps = {
  text: string;
  progress: MotionValue<number>;
  start: number;
  settle: number;
  className?: string;
};

export function ScrollTextLine({ text, progress, start, settle, className }: ScrollTextLineProps) {
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <span
      aria-label={text}
      className={cn("block", className)}
      style={{
        perspective: "800px",
      }}
    >
      {characters.map((char, index) => (
        <ScrollCharacter
          key={`${char}-${index}`}
          char={char}
          index={index}
          centerIndex={centerIndex}
          progress={progress}
          start={start}
          settle={settle}
        />
      ))}
    </span>
  );
}
