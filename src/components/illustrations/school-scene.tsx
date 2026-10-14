import type * as React from "react";

export interface SceneProps extends React.SVGProps<SVGSVGElement> {}

export function SchoolScene({ className = "w-full h-full", ...props }: SceneProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="sch-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-school-sky-top)" />
          <stop offset="100%" stopColor="var(--scene-school-sky-bottom)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sch-bldg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-school-facade-top)" />
          <stop offset="100%" stopColor="var(--scene-school-facade-bottom)" />
        </linearGradient>
      </defs>

      <g transform="translate(-16 -16) scale(1.08)">
        {/* Sky Backing */}
        <rect x="60" y="80" width="280" height="200" fill="url(#sch-sky)" opacity="0.5" />

        {/* Floating Indigo Sun / Halo (cx=310, cy=100) */}
        <g>
          <circle cx="310" cy="100" r="34" fill="var(--scene-school-sun)" opacity="0.92" />
          <circle cx="310" cy="100" r="44" fill="var(--scene-school-sun-halo1)" />
          <circle cx="310" cy="100" r="58" fill="var(--scene-school-sun-halo2)" />
        </g>

        {/* Gap-Fill A: Indigo Clouds (Requirement 8: Cloud 2 moved to x=175–225, away from sun at 310) */}
        <g opacity="0.85" className="animate-cloud-drift">
          {/* Cloud 1 (Left sky) */}
          <path
            d="M 68 118 C 68 112 73 108 79 108 C 81 103 86 100 92 100 C 99 100 105 104 107 110 C 111 110 115 113 115 118 C 115 123 111 126 106 126 L 76 126 C 71 126 68 122 68 118 Z"
            fill="var(--scene-school-cloud-1)"
          />
          {/* Cloud 2 (Center-left sky: x=175–225, safely clear of sun at cx=310) */}
          <path
            d="M 175 92 C 175 87 179 83 184 83 C 186 79 191 76 196 76 C 202 76 207 79 209 84 C 213 84 216 87 216 91 C 216 95 212 98 208 98 L 182 98 C 178 98 175 95 175 92 Z"
            fill="var(--scene-school-cloud-2)"
          />
        </g>

        {/* Heritage Tree */}
        <g style={{ transformOrigin: "120px 280px" }}>
          <rect x="116" y="260" width="8" height="50" fill="var(--scene-school-tree-trunk)" />
          <circle cx="120" cy="240" r="34" fill="var(--scene-school-tree1)" opacity="0.85" />
          <circle cx="100" cy="248" r="22" fill="var(--scene-school-tree2)" opacity="0.85" />
          <circle cx="140" cy="248" r="22" fill="var(--scene-school-tree2)" opacity="0.85" />
          <circle cx="120" cy="220" r="20" fill="var(--scene-school-tree3)" opacity="0.85" />
        </g>

        {/* Ground Line */}
        <line
          x1="40"
          y1="310"
          x2="360"
          y2="310"
          stroke="var(--scene-school-ground)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* School Main Building */}
        <g>
          {/* Spire & Finial */}
          <rect x="195" y="100" width="10" height="40" fill="var(--scene-school-structure)" />
          <circle cx="200" cy="98" r="5" fill="#f59e0b" />

          {/* Roof Pediment */}
          <polygon
            points="200,130 290,180 110,180"
            fill="var(--scene-school-structure)"
            stroke="var(--scene-school-structure-border)"
            strokeWidth="1"
          />

          {/* Building Facade */}
          <rect
            x="120"
            y="180"
            width="160"
            height="130"
            fill="url(#sch-bldg)"
            stroke="var(--scene-school-structure)"
            strokeWidth="2"
          />

          {/* Building Pillars (5 Pillars) */}
          <rect
            x="137"
            y="200"
            width="6"
            height="100"
            fill="var(--scene-school-pillar)"
            opacity="var(--scene-school-pillar-opacity)"
          />
          <rect
            x="172"
            y="200"
            width="6"
            height="100"
            fill="var(--scene-school-pillar)"
            opacity="var(--scene-school-pillar-opacity)"
          />
          <rect
            x="207"
            y="200"
            width="6"
            height="100"
            fill="var(--scene-school-pillar)"
            opacity="var(--scene-school-pillar-opacity)"
          />
          <rect
            x="242"
            y="200"
            width="6"
            height="100"
            fill="var(--scene-school-pillar)"
            opacity="var(--scene-school-pillar-opacity)"
          />
          <rect
            x="277"
            y="200"
            width="6"
            height="100"
            fill="var(--scene-school-pillar)"
            opacity="var(--scene-school-pillar-opacity)"
          />

          {/* Lintel and Base Plinth */}
          <rect x="125" y="194" width="150" height="6" fill="var(--scene-school-structure)" />
          <rect x="125" y="300" width="150" height="8" fill="var(--scene-school-structure)" />

          {/* Arch Door */}
          <rect x="186" y="245" width="28" height="55" fill="var(--scene-school-door-frame)" />
          <rect
            x="190"
            y="249"
            width="20"
            height="48"
            fill="var(--scene-school-door-inner)"
            opacity="0.6"
          />

          {/* Pediment Clock */}
          <circle
            cx="200"
            cy="155"
            r="9"
            fill="var(--scene-school-clock-face)"
            stroke="var(--scene-school-clock-hand)"
            strokeWidth="1.6"
          />
          <line
            x1="200"
            y1="155"
            x2="200"
            y2="149"
            stroke="var(--scene-school-clock-hand)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="200"
            y1="155"
            x2="204"
            y2="155"
            stroke="var(--scene-school-clock-hand)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        {/* Stack of Books (left ground) */}
        <g>
          <rect x="60" y="296" width="40" height="6" rx="1" fill="var(--scene-school-book1)" />
          <rect x="56" y="302" width="48" height="6" rx="1" fill="var(--scene-school-book2)" />
          <rect x="62" y="308" width="44" height="6" rx="1" fill="var(--scene-school-book3)" />
        </g>

        {/* Floating Exam Sheet (right) */}
        <g transform="rotate(-10 320 250)">
          <rect
            x="300"
            y="240"
            width="40"
            height="48"
            rx="2"
            fill="var(--scene-school-exam-bg)"
            stroke="var(--scene-school-exam-border)"
            strokeWidth="1.2"
          />
          <circle cx="320" cy="252" r="3" fill="#f59e0b" />
          <line
            x1="306"
            y1="262"
            x2="334"
            y2="262"
            stroke="var(--scene-school-exam-line)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="306"
            y1="270"
            x2="328"
            y2="270"
            stroke="var(--scene-school-exam-line)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
