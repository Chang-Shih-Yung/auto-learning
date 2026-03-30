"use client";

import { useState } from "react";
import type { ShowcaseMeta } from "@/lib/showcase";

function DemoFallback({ meta }: Readonly<{ meta: ShowcaseMeta }>) {
  return (
    <div
      className="bg-muted rounded-lg p-8"
      aria-label="本週無互動 demo — 以下為文字說明"
    >
      <p className="font-mono text-xs text-muted-foreground mb-4">
        本週以文字呈現學習成果
      </p>
      <p className="font-serif text-sm leading-[1.85] text-foreground mb-5">
        {meta.synthesis_note}
      </p>
      {meta.skills_used_in_demo.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {meta.skills_used_in_demo.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center bg-primary/8 text-primary font-mono text-[11px] px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface ShowcaseDemoProps {
  meta: ShowcaseMeta;
  year: string;
  week: string;
}

export default function ShowcaseDemo({
  meta,
  year,
  week,
}: Readonly<ShowcaseDemoProps>) {
  const [errored, setErrored] = useState(false);

  if (!meta.demo_available || errored) {
    return <DemoFallback meta={meta} />;
  }

  return (
    <iframe
      src={`/showcase/${year}/${week}/demo.html`}
      sandbox="allow-scripts"
      title={meta.demo_title}
      width="100%"
      height="500"
      className="rounded-md border border-foreground/6 bg-muted w-full"
      aria-label={meta.demo_title}
      onError={() => setErrored(true)}
    />
  );
}
