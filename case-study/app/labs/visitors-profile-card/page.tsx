type HeatTone =
  | "empty"
  | "skySoft"
  | "sky"
  | "purpleSoft"
  | "purple"
  | "greenSoft"
  | "green";

const heatToneStyles: Record<HeatTone, string> = {
  empty: "bg-white",
  skySoft: "bg-[#EBF2FF]",
  sky: "bg-[#BED5FE]",
  purpleSoft: "bg-[#DAD9FC]",
  purple: "bg-[#B5B3F9]",
  greenSoft: "bg-[#C2EFCD]",
  green: "bg-[#33C758]",
};

const statItems = [
  { label: "First seen", value: "Jul 15, 2024", valueClassName: "text-[#999999]" },
  { label: "Sessions", value: "12", valueClassName: "text-[#999999]" },
  { label: "Revenue", value: "$249", valueClassName: "text-[#33C758]" },
];

const heatmapDots = Array.from({ length: 22 * 8 }, (_, index): HeatTone => {
  const col = index % 22;
  const row = Math.floor(index / 22);

  if (row >= 6 && col >= 18) return "green";
  if (row >= 5 && col >= 16) return col % 2 === 0 ? "greenSoft" : "purple";
  if ((row === 1 && col === 3) || (row === 2 && col === 9) || (row === 3 && col === 7)) {
    return "purpleSoft";
  }
  if ((row === 0 && col === 2) || (row === 2 && col === 4) || (row === 4 && col === 10)) {
    return "skySoft";
  }
  if ([2, 6, 10, 13, 17, 19].includes(col) && row < 6) return "skySoft";
  if ([3, 4, 15, 20].includes(col) && row < 6) return "purpleSoft";
  if ([8, 12, 18].includes(col) && row >= 3) return "sky";
  if ([14, 16].includes(col) && row >= 4) return "purple";
  if ([11, 17].includes(col) && row >= 5) return "greenSoft";
  return "empty";
});

function VisitorFeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-[#33C758]">
      <path
        d="M8 15c3.866 0 7-3.134 7-7S11.866 1 8 1 1 4.134 1 8s3.134 7 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.29 9.4c.31 1.21 1.41 2.1 2.71 2.1s2.4-.89 2.71-2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="5.55" cy="6.25" rx="1.05" ry="1.05" fill="currentColor" />
      <ellipse cx="10.45" cy="6.25" rx="1.05" ry="1.05" fill="currentColor" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-[#918DF6]">
      <path
        d="M6.70312 1.42297C7.41906 0.707007 8.57997 0.707007 9.2959 1.42297L10.1133 2.23938C10.2696 2.39548 10.4813 2.48352 10.7021 2.48352H11.6836C12.6959 2.48376 13.5165 3.30421 13.5166 4.31653V5.29797C13.5167 5.51888 13.6045 5.73063 13.7607 5.88684L14.5771 6.70325C15.2931 7.41914 15.293 8.58001 14.5771 9.29602L13.7607 10.1134C13.6045 10.2697 13.5166 10.4813 13.5166 10.7023V11.6837C13.5164 12.6959 12.6958 13.5165 11.6836 13.5167H10.7021C10.4812 13.5167 10.2696 13.6046 10.1133 13.7609L9.2959 14.5773C8.57996 15.2931 7.41904 15.2932 6.70312 14.5773L5.88672 13.7609C5.73051 13.6046 5.51875 13.5168 5.29785 13.5167H4.31641C3.30406 13.5167 2.48363 12.696 2.4834 11.6837V10.7023C2.4834 10.4813 2.39536 10.2696 2.23926 10.1134L1.42285 9.29602C0.706892 8.58002 0.706892 7.41918 1.42285 6.70325L2.23926 5.88684C2.39538 5.73064 2.48332 5.51882 2.4834 5.29797V4.31653C2.48346 3.30409 3.30396 2.48356 4.31641 2.48352H5.29785C5.5187 2.48344 5.73052 2.39552 5.88672 2.23938L6.70312 1.42297ZM10.999 5.34583C10.7166 5.10973 10.2957 5.1474 10.0596 5.42981L7.13574 8.9259L5.98438 7.70911C5.73137 7.44165 5.30947 7.42978 5.04199 7.68274C4.77457 7.93575 4.76267 8.35765 5.01562 8.62512L6.68262 10.3868C6.81339 10.5249 6.99743 10.6007 7.1875 10.5948C7.37736 10.5888 7.5558 10.5022 7.67773 10.3566L11.083 6.28528C11.319 6.00296 11.2811 5.58205 10.999 5.34583Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UsFlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 512 512" aria-hidden="true">
      <mask id="us_flag_mask" x="0" y="0" width="512" height="512" maskUnits="userSpaceOnUse">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#us_flag_mask)">
        <path
          fill="#EEE"
          d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"
        />
        <path fill="#D80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
        <path fill="#0052B4" d="M0 0h256v256H0Z" />
        <path
          fill="#EEE"
          d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"
        />
      </g>
    </svg>
  );
}

function AvatarBlob() {
  return (
    <svg width="56" height="56" viewBox="0 0 80 80" fill="none" role="img" aria-hidden="true">
      <mask id="avatar_mask" x="0" y="0" width="80" height="80" maskUnits="userSpaceOnUse">
        <rect width="80" height="80" rx="160" fill="#FFFFFF" />
      </mask>
      <g mask="url(#avatar_mask)">
        <rect width="80" height="80" fill="#845EC2" />
        <path
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill="#F9C80E"
          filter="url(#avatar_blur)"
          transform="translate(-4 4) rotate(-308 40 40) scale(1.4)"
        />
        <path
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill="#F86624"
          filter="url(#avatar_blur)"
          transform="translate(-6 -6) rotate(-102 40 40) scale(1.4)"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
      <defs>
        <filter id="avatar_blur" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

function GoogleBadge() {
  return (
    <span
      className="inline-flex h-6 max-w-full items-center gap-1 rounded-full border border-black/10 bg-white bg-clip-padding pl-1.5 pr-2.5 text-xs text-[#181925]"
      style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.04)" }}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
        <span
          className="text-[11px] font-semibold leading-none"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #4285F4 0%, #4285F4 34%, #EA4335 34%, #EA4335 58%, #FBBC05 58%, #FBBC05 76%, #34A853 76%, #34A853 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          G
        </span>
      </span>
      <span className="truncate">Google</span>
    </span>
  );
}

function VisitorsProfileCard() {
  return (
    <div
      className="flex w-[558px] max-w-full flex-col overflow-hidden rounded-2xl bg-[rgba(0,0,0,0.08)]"
      style={{ letterSpacing: "-0.02em" }}
    >
      <div className="flex flex-col items-start gap-3 px-8 pb-6 pt-8">
        <span
          className="flex h-9 w-10 items-center justify-center rounded-full bg-white"
          style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.08), 0px 0px 0px 1px rgba(0,0,0,0.05)" }}
        >
          <VisitorFeatureIcon />
        </span>

        <div className="flex max-w-[404px] flex-col gap-0.5">
          <h3 className="text-[38px] font-medium leading-[1.02] tracking-[-0.055em] text-[#33C758]">
            Visitor profiles
          </h3>
          <p className="text-[38px] font-medium leading-[1.02] tracking-[-0.055em] text-[#181925]">
            See lifetime revenue for each visitor from first touch to purchase.
          </p>
        </div>
      </div>

      <div className="relative flex h-[320px] w-full items-start overflow-hidden px-8 pb-6 pt-0">
        <div
          className="flex w-full flex-col gap-6 rounded-[24px] bg-white p-8"
          style={{
            boxShadow:
              "0px 1px 3px rgba(0,0,0,0.08), 0px 8px 16px rgba(0,0,0,0.06), 0px 0px 0px 1px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col gap-5">
            <AvatarBlob />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[24px] font-medium leading-[1.05] tracking-[-0.04em] text-[#181925]">
                  Massive Cat
                </h4>
                <VerifiedIcon />
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-[#33C758]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}
                />
                <span className="text-xs text-[#999999]">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center">
              <UsFlagIcon />
            </span>
            <GoogleBadge />
          </div>

          <div className="flex w-full gap-6">
            {statItems.map((item) => (
              <div key={item.label} className="flex max-w-[110px] flex-1 flex-col">
                <span className="text-sm font-medium tracking-[-0.02em] text-[#181925]">
                  {item.label}
                </span>
                <span className={`text-sm ${item.valueClassName}`}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium tracking-[-0.02em] text-[#181925]">
                Activity
              </span>
              <p className="text-xs text-[#666666]">
                702 events &middot; $1,966 <span className="text-[#999999]">in the last 6 months</span>
              </p>
            </div>

            <div
              className="-mx-[3px] grid w-full"
              style={{ gridTemplateColumns: "repeat(22, minmax(0, 1fr))" }}
            >
              {heatmapDots.map((tone, index) => (
                <div key={`${tone}-${index}`} className="cursor-pointer p-[3px]">
                  <div
                    className={`aspect-square w-full max-h-4 max-w-4 rounded-full ${heatToneStyles[tone]}`}
                    style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisitorsProfileCardLabPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#181925]">
      <div className="mx-auto flex max-w-5xl justify-center">
        <VisitorsProfileCard />
      </div>
    </main>
  );
}
