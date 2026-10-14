import type { SceneProps } from "./school-scene";

export function FeaturesScene({ className = "w-full h-full", ...props }: SceneProps) {
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
        <radialGradient id="feat-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--scene-feat-halo-start)" />
          <stop offset="100%" stopColor="var(--scene-feat-halo-end)" />
        </radialGradient>
        <linearGradient id="feat-core" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--scene-feat-core-1)" />
          <stop offset="100%" stopColor="var(--scene-feat-core-2)" />
        </linearGradient>
      </defs>

      <g transform="translate(-16 -16) scale(1.08)">
        {/* Ambient Radial Halo & Orbit Ring */}
        <circle cx="200" cy="200" r="120" fill="url(#feat-halo)" />
        <circle
          cx="200"
          cy="200"
          r="118"
          fill="none"
          stroke="var(--scene-feat-orbit)"
          strokeWidth="1.3"
          strokeDasharray="2 6"
          opacity="0.7"
        />

        {/* 4 Connectors to Satellite Cards */}
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="108"
          stroke="var(--scene-feat-connector)"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />
        <line
          x1="200"
          y1="200"
          x2="276"
          y2="200"
          stroke="var(--scene-feat-connector)"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="290"
          stroke="var(--scene-feat-connector)"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />
        <line
          x1="200"
          y1="200"
          x2="124"
          y2="200"
          stroke="var(--scene-feat-connector)"
          strokeWidth="1.4"
          strokeDasharray="2 4"
        />

        {/* Center ProgressEye Eye Core */}
        <circle cx="200" cy="200" r="50" fill="url(#feat-core)" />
        <ellipse cx="200" cy="200" rx="22" ry="13" fill="none" stroke="#ffffff" strokeWidth="2.4" />
        <circle cx="200" cy="200" r="6" fill="#f59e0b" />
        <circle cx="202" cy="198" r="1.6" fill="#ffffff" />

        {/* TOP SATELLITE: Attendance Grid (Gap-Fill B: 3x4 dots in #c7d2fe / #fde68a) */}
        <g>
          <rect
            x="155"
            y="40"
            width="90"
            height="68"
            rx="10"
            fill="var(--scene-card-bg)"
            stroke="var(--scene-card-border)"
            strokeWidth="2"
          />
          <rect
            x="155"
            y="40"
            width="90"
            height="15"
            rx="10"
            fill="var(--scene-feat-header-fill)"
          />
          <rect x="155" y="48" width="90" height="7" fill="var(--scene-feat-header-fill)" />
          <text
            x="200"
            y="51"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="var(--scene-feat-header-text)"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            ATTENDANCE
          </text>

          {/* 3 rows x 4 cols of attendance dots */}
          <circle cx="170" cy="67" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="190" cy="67" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="210" cy="67" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="230" cy="67" r="3.2" fill="var(--scene-feat-dot-present)" />

          <circle cx="170" cy="80" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="190" cy="80" r="3.2" fill="var(--scene-feat-dot-absent)" />
          <circle cx="210" cy="80" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="230" cy="80" r="3.2" fill="var(--scene-feat-dot-present)" />

          <circle cx="170" cy="93" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="190" cy="93" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="210" cy="93" r="3.2" fill="var(--scene-feat-dot-present)" />
          <circle cx="230" cy="93" r="3.2" fill="var(--scene-feat-dot-absent)" />
        </g>

        {/* RIGHT SATELLITE: Fees Rupee Coin */}
        <g>
          <rect
            x="276"
            y="166"
            width="68"
            height="68"
            rx="12"
            fill="var(--scene-card-bg)"
            stroke="var(--scene-card-border)"
            strokeWidth="2"
          />
          <circle
            cx="310"
            cy="195"
            r="17"
            fill="var(--scene-feat-coin-bg)"
            stroke="var(--scene-feat-coin-stroke)"
            strokeWidth="1.8"
          />
          <text
            x="310"
            y="201"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill="var(--scene-feat-coin-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            ₹
          </text>
          <text
            x="310"
            y="225"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="var(--scene-card-text)"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            FEES
          </text>
        </g>

        {/* BOTTOM SATELLITE: Exam Grade Pills (Gap-Fill C: A+ #1e1b4b, A/B #c7d2fe, C #fde68a) */}
        <g>
          <rect
            x="155"
            y="290"
            width="90"
            height="60"
            rx="10"
            fill="var(--scene-card-bg)"
            stroke="var(--scene-card-border)"
            strokeWidth="2"
          />
          <text
            x="200"
            y="306"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="var(--scene-card-text)"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            EXAMS
          </text>

          {/* 4 Pills: A+, A, B, C */}
          <rect
            x="163"
            y="314"
            width="16"
            height="22"
            rx="6"
            fill="var(--scene-feat-pill-aplus-bg)"
          />
          <text
            x="171"
            y="329"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--scene-feat-pill-aplus-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            A+
          </text>

          <rect x="183" y="314" width="16" height="22" rx="6" fill="var(--scene-feat-pill-a-bg)" />
          <text
            x="191"
            y="329"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--scene-feat-pill-a-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            A
          </text>

          <rect x="203" y="314" width="16" height="22" rx="6" fill="var(--scene-feat-pill-a-bg)" />
          <text
            x="211"
            y="329"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--scene-feat-pill-a-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            B
          </text>

          <rect x="223" y="314" width="16" height="22" rx="6" fill="var(--scene-feat-pill-c-bg)" />
          <text
            x="231"
            y="329"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="var(--scene-feat-pill-c-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            C
          </text>
        </g>

        {/* LEFT SATELLITE: Comms Chat Bubble */}
        <g>
          <rect
            x="56"
            y="166"
            width="68"
            height="68"
            rx="12"
            fill="var(--scene-card-bg)"
            stroke="var(--scene-card-border)"
            strokeWidth="2"
          />
          <path
            d="M 70 184 Q 70 178 76 178 L 104 178 Q 110 178 110 184 L 110 200 Q 110 206 104 206 L 84 206 L 76 213 L 78 206 L 76 206 Q 70 206 70 200 Z"
            fill="var(--scene-feat-chat-bg)"
            stroke="var(--scene-feat-chat-stroke)"
            strokeWidth="1.6"
          />
          <circle cx="80" cy="192" r="2" fill="#ffffff" />
          <circle cx="90" cy="192" r="2" fill="#ffffff" />
          <circle cx="100" cy="192" r="2" fill="#f59e0b" />
          <text
            x="90"
            y="225"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="var(--scene-card-text)"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            COMMS
          </text>
        </g>
      </g>
    </svg>
  );
}
