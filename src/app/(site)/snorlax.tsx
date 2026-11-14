// A tiny hand-drawn pixel Snorlax, asleep on its back, that rolls back and forth
// along the top of the Spotify card (see .snorlax-* in globals.css). Each
// character is one pixel; "." is transparent.
const SPRITE = [
  "...............O....",
  "..............OTO.O.",
  "............OOOTTOTO",
  "...........OCCCOTTTO",
  "..........OCOOCCOTTO",
  "..OO.....OCCCCOOCTTO",
  ".OTWO...OCCCSSCCOTTO",
  ".OTTOOOOCCCCSSSOTTDO",
  "..OOCCCCCCCCCCCOTTDO",
  ".OOCCCCCCCCCCCCSOTDO",
  "OWWOCCCCCCCCCCSSODDO",
  "OPPSOCCCCSSSSSSODDO.",
  "OPPSOSSSOWWOSSODDDO.",
  ".OSSOODDOPPSOODDDO..",
  "..OO..ODOPPSO.OOO...",
  "........OOOO........",
];

const COLORS: Record<string, string> = {
  O: "#3a3a3a", // outline and closed eyes; lifted off pure black so the silhouette reads on the dark page
  T: "#1aa6a0", // body
  D: "#11746c", // body in shadow
  C: "#f0e2a0", // face and belly
  S: "#f2c46e", // belly shading
  P: "#8a4a1c", // paw pads
  W: "#ffffff", // claws and highlights
};

const COLS = SPRITE[0].length;
const ROWS = SPRITE.length;
// Whole-number scale keeps every sprite pixel square and crisp.
const SCALE = 2;

export function Snorlax() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full mb-1">
      <div className="snorlax-mover">
        <svg
          className="snorlax-sprite block"
          width={COLS * SCALE}
          height={ROWS * SCALE}
          viewBox={`0 0 ${COLS} ${ROWS}`}
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
