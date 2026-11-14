"use client";

import { useEffect, useState } from "react";
import TextType from "@/components/type-text";

// Survives tab switches (client navigation) but resets on a full reload, so the
// name types out once per visit instead of every time home is reopened.
let typedThisVisit = false;

export function Name() {
  const [animate] = useState(() => !typedThisVisit);

  useEffect(() => {
    typedThisVisit = true;
  }, []);

  return (
    <h1 aria-label="Tae Hee Lee" className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
      {animate && (
        <span aria-hidden className="motion-reduce:hidden">
          <TextType
            as="span"
            text={["Tae Hee Lee", "Tae Hee Lee"]}
            typingSpeed={200}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
            cursorClassName="font-light"
          />
        </span>
      )}
      <span aria-hidden className={animate ? "hidden motion-reduce:inline" : undefined}>
        Tae Hee Lee
      </span>
    </h1>
  );
}
