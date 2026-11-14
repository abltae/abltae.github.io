// A tiny hand-drawn pixel Snorlax that rolls back and forth along the top of the
// Spotify card (see .snorlax-* in globals.css). Each character is one pixel.
const SPRITE = [
  "...O........O...",
  "..OBO......OBO..",
  "..OBBOOOOOOBBO..",
  ".OBBBBBBBBBBBBO.",
  ".OBBCCCCCCCCBBO.",
  "OBBCEECCCCEECBBO",
  "OBBCCCCOOCCCCBBO",
  "OBBBCCCCCCCCBBBO",
  "OBBBBBBBBBBBBBBO",
  "OBBBCCCCCCCCBBBO",
  "OBBCCCCCCCCCCBBO",
  "OBBCCCCCCCCCCBBO",
  ".OBBCCCCCCCCBBO.",
  "..OBBCCCCCCBBO..",
  "..OCCOOOOOOCCO..",
  "...OO......OO...",
];

const COLORS: Record<string, string> = {
  O: "#16292f", // outline, eyes, mouth
  E: "#16292f",
  B: "#3d7280", // body
  C: "#efe3c8", // face and belly
};

const SIZE = SPRITE.length;

export function Snorlax() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full mb-1">
      <div className="snorlax-mover">
        <svg
          className="snorlax-sprite block"
          width={24}
          height={24}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          shapeRendering="crispEdges"
        >
          {SPRITE.flatMap((row, y) =>
            [...row].map((cell, x) =>
              COLORS[cell] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS[cell]} /> : null,
            ),
          )}
        </svg>
      </div>
    </div>
  );
}
