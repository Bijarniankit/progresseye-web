import type { SceneProps } from "./school-scene";

export function FeatureDetailScene({ className = "w-full h-full", ...props }: SceneProps) {
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
        <filter id="card-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--scene-card-shadow)" />
        </filter>
      </defs>

      {/* CARD 1: Attendance (Back, tilted -4°) */}
      {/* Positioned at y=36 so all 4 class rows (Gr 6–9) are 100% visible above Card 2 */}
      <g transform="rotate(-4 200 95)" filter="url(#card-shadow)">
        <rect
          x="75"
          y="36"
          width="250"
          height="114"
          rx="12"
          fill="var(--scene-card-bg)"
          stroke="var(--scene-card-border)"
          strokeWidth="1.8"
        />

        {/* Card 1 Header */}
        <text
          x="92"
          y="56"
          fontSize="9"
          fontWeight="700"
          fill="var(--scene-card-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Attendance · This week
        </text>

        {/* Badge 94% */}
        <rect x="238" y="44" width="38" height="16" rx="8" fill="var(--scene-detail-badge-bg)" />
        <text
          x="257"
          y="55.5"
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          fill="var(--scene-detail-badge-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          94%
        </text>

        {/* Sample Data Tag */}
        <rect x="282" y="46" width="34" height="12" rx="3" fill="var(--scene-card-tag-bg)" />
        <text
          x="299"
          y="54.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="var(--scene-card-tag-text)"
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          SAMPLE
        </text>

        {/* Day Column Headers (M T W T F S) */}
        {[
          { id: "mon", label: "M", x: 152 },
          { id: "tue", label: "T", x: 178 },
          { id: "wed", label: "W", x: 204 },
          { id: "thu", label: "T", x: 230 },
          { id: "fri", label: "F", x: 256 },
          { id: "sat", label: "S", x: 282 },
        ].map((day) => (
          <text
            key={day.id}
            x={day.x}
            y="72"
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            fill="var(--scene-card-muted)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {day.label}
          </text>
        ))}

        {/* All 4 Class Rows (Gr 6, 7, 8, 9) fully exposed */}
        {[
          { id: "gr-6", label: "Gr 6", absent: [4] },
          { id: "gr-7", label: "Gr 7", absent: [] },
          { id: "gr-8", label: "Gr 8", absent: [1, 5] },
          { id: "gr-9", label: "Gr 9", absent: [3] },
        ].map((row, rIdx) => {
          const y = 82 + rIdx * 12;
          const dayIds = ["mon", "tue", "wed", "thu", "fri", "sat"];
          return (
            <g key={row.id}>
              <text
                x="92"
                y={y + 6}
                fontSize="6.5"
                fontWeight="600"
                fill="var(--scene-card-muted)"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {row.label}
              </text>
              {dayIds.map((dayId, col) => {
                const isAbsent = row.absent.includes(col);
                return (
                  <rect
                    key={`${row.id}-${dayId}`}
                    x={143 + col * 26}
                    y={y}
                    width="18"
                    height="7"
                    rx="3.5"
                    fill={
                      isAbsent
                        ? "var(--scene-detail-att-absent)"
                        : "var(--scene-detail-att-present)"
                    }
                  />
                );
              })}
            </g>
          );
        })}
      </g>

      {/* CARD 2: Fee Collection (Middle, straight 0°) */}
      <g transform="translate(0, 0)" filter="url(#card-shadow)">
        <rect
          x="68"
          y="152"
          width="264"
          height="112"
          rx="12"
          fill="var(--scene-card-bg)"
          stroke="var(--scene-card-border)"
          strokeWidth="1.8"
        />

        {/* Card 2 Header */}
        <text
          x="88"
          y="174"
          fontSize="9.5"
          fontWeight="700"
          fill="var(--scene-card-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Fee collection · Term 2
        </text>

        {/* Sample Data Tag */}
        <rect x="284" y="164" width="34" height="12" rx="3" fill="var(--scene-card-tag-bg)" />
        <text
          x="301"
          y="172.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="var(--scene-card-tag-text)"
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          SAMPLE
        </text>

        {/* Circular Donut (87%): r=23 -> circumference = 2 * PI * 23 = 144.5 */}
        {/* 87% fill -> strokeDashoffset = 144.5 * (1 - 0.87) = 18.8 */}
        <g transform="translate(116, 214)">
          <circle
            cx="0"
            cy="0"
            r="23"
            stroke="var(--scene-detail-donut-track)"
            strokeWidth="5.5"
            fill="none"
          />
          <circle
            cx="0"
            cy="0"
            r="23"
            stroke="var(--scene-detail-donut-fill)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeDasharray="144.5"
            strokeDashoffset="18.8"
            fill="none"
            transform="rotate(-90)"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="800"
            fill="var(--scene-card-text)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            87%
          </text>
        </g>

        {/* Amount & Subtitle */}
        <text
          x="156"
          y="204"
          fontSize="13.5"
          fontWeight="800"
          fill="var(--scene-card-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          ₹ 14,82,500
        </text>
        <text
          x="156"
          y="218"
          fontSize="7.5"
          fontWeight="500"
          fill="var(--scene-card-muted)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          of ₹ 17,00,000 collected
        </text>

        {/* Progress Bar (87% of 154px = 134px) */}
        <rect
          x="156"
          y="228"
          width="154"
          height="6"
          rx="3"
          fill="var(--scene-detail-progress-track)"
        />
        <rect
          x="156"
          y="228"
          width="134"
          height="6"
          rx="3"
          fill="var(--scene-detail-progress-fill)"
        />
      </g>

      {/* CARD 3: Exam Grade Distribution (Front, tilted +4°) */}
      <g transform="rotate(4 200 320)" filter="url(#card-shadow)">
        <rect
          x="75"
          y="266"
          width="250"
          height="118"
          rx="12"
          fill="var(--scene-card-bg)"
          stroke="var(--scene-card-border)"
          strokeWidth="1.8"
        />

        {/* Card 3 Header */}
        <text
          x="94"
          y="288"
          fontSize="9.5"
          fontWeight="700"
          fill="var(--scene-card-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Exams · Grade distribution
        </text>

        {/* Badge 53 / 53 */}
        <rect x="236" y="276" width="46" height="16" rx="8" fill="var(--scene-detail-badge-bg)" />
        <text
          x="259"
          y="287.5"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="800"
          fill="var(--scene-detail-badge-text)"
          fontFamily="Inter, system-ui, sans-serif"
        >
          53 / 53
        </text>

        {/* Sample Data Tag */}
        <rect x="286" y="278" width="30" height="12" rx="3" fill="var(--scene-card-tag-bg)" />
        <text
          x="301"
          y="286.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="var(--scene-card-tag-text)"
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="0.08em"
        >
          SAMPLE
        </text>

        {/* 5 Vertical Animated Bars: A+ 12, A 18, B 14, C 7, D 2 (Baseline y=354) */}
        {[
          { grade: "A+", count: 12, height: 38, color: "var(--scene-detail-bar-aplus)", x: 108 },
          { grade: "A", count: 18, height: 52, color: "var(--scene-detail-bar-a)", x: 148 },
          { grade: "B", count: 14, height: 42, color: "var(--scene-detail-bar-b)", x: 188 },
          { grade: "C", count: 7, height: 24, color: "var(--scene-detail-bar-c)", x: 228 },
          { grade: "D", count: 2, height: 10, color: "var(--scene-detail-bar-d)", x: 268 },
        ].map((item) => {
          const barY = 354 - item.height;
          return (
            <g key={`bar-${item.grade}`}>
              {/* Count on top of bar */}
              <text
                x={item.x + 10}
                y={barY - 3}
                textAnchor="middle"
                fontSize="6.5"
                fontWeight="700"
                fill="var(--scene-card-muted)"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {item.count}
              </text>
              {/* Bar Rect */}
              <rect x={item.x} y={barY} width="20" height={item.height} rx="4" fill={item.color} />
              {/* Grade Label under baseline */}
              <text
                x={item.x + 10}
                y="367"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="700"
                fill="var(--scene-card-text)"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {item.grade}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
