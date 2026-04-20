type CountryRow = {
  country: string;
  flag: string;
  value: string;
  neutralWidth: string;
  successWidth?: string;
};

const countries: CountryRow[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    value: "1,823",
    neutralWidth: "50%",
    successWidth: "50%",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    value: "654",
    neutralWidth: "17.9375%",
    successWidth: "17.4679%",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    value: "521",
    neutralWidth: "14.2896%",
    successWidth: "11.3782%",
  },
  {
    country: "France",
    flag: "🇫🇷",
    value: "398",
    neutralWidth: "10.9161%",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    value: "312",
    neutralWidth: "8.55732%",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    value: "245",
    neutralWidth: "6.71969%",
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    value: "176",
    neutralWidth: "5%",
  },
];

function RevenueIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 16 16" className="text-[#33C758]">
      <path
        d="M8 4.5V3.72222M8 11.5V12.2778M9.68428 5.66667C9.34812 5.20171 8.71976 4.88889 8 4.88889H7.78393C6.82937 4.88889 6.05556 5.50795 6.05556 6.27161V6.33097C6.05556 6.8772 6.44132 7.37653 7.05204 7.62083L8.94796 8.37917C9.55867 8.62347 9.94444 9.1228 9.94444 9.66903C9.94444 10.4655 9.13742 11.1111 8.14187 11.1111H8C7.28024 11.1111 6.65188 10.7983 6.31569 10.3333M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulletRevenueIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-[#33C758]">
      <path
        d="M10.1724 6.7931C7.03448 9.93103 7.11462 13.2688 6.096 15C5.07641 13.2688 4.13793 8.77145 1 8.77145M13.3103 4.37931C12.8622 4.37931 12.4325 4.20129 12.1156 3.88442C11.7987 3.56755 11.6207 3.13778 11.6207 2.68966C11.6207 2.24153 11.7987 1.81176 12.1156 1.49489C12.4325 1.17802 12.8622 1 13.3103 1C13.7585 1 14.1882 1.17802 14.5051 1.49489C14.822 1.81176 15 2.24153 15 2.68966C15 3.13778 14.822 3.56755 14.5051 3.88442C14.1882 4.20129 13.7585 4.37931 13.3103 4.37931Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulletSyncIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="text-[#33C758]">
      <path
        d="M8 12.3514V15M8 1V3.64865"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3516 8H15.0002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.05078 3.05005L8.00037 8.00001M8.00037 8.00001L3.05078 12.9496M8.00037 8.00001L1 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0781 11.0765L12.951 12.9494M11.0781 4.92293L12.951 3.05005"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulletVisitorIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#33C758]"
    >
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

function ArrowIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VisitorsRevenueCard() {
  return (
    <div
      className="flex min-h-[658px] w-[391px] max-w-full flex-col overflow-hidden rounded-2xl bg-[rgba(0,0,0,0.08)]"
      style={{ letterSpacing: "-0.02em" }}
    >
      <div className="flex flex-col items-start gap-3 px-8 pb-6 pt-6">
        <span
          className="flex h-9 w-10 items-center justify-center rounded-full bg-white"
          style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.08), 0px 0px 0px 1px rgba(0,0,0,0.05)" }}
        >
          <RevenueIcon />
        </span>

        <div className="max-w-[288px]">
          <h3 className="text-[38px] font-medium leading-[1.02] tracking-[-0.055em] text-[#33C758]">
            Revenue attribution
            <span className="block text-[#181925]">
              See which of your
              <br />
              channels bring in your most revenue.
            </span>
          </h3>
        </div>

        <ul className="mt-[2px] flex list-none flex-col gap-1">
          <li className="flex items-center gap-2">
            <BulletRevenueIcon />
            <span className="text-sm font-medium leading-[1.25] tracking-[-0.02em] text-[#181925]">
              Revenue updates in real-time
            </span>
          </li>
          <li className="flex items-center gap-2">
            <BulletSyncIcon />
            <span className="text-sm font-medium leading-[1.25] tracking-[-0.02em] text-[#181925]">
              One-click Stripe sync
            </span>
          </li>
          <li className="flex items-center gap-2">
            <BulletVisitorIcon />
            <span className="text-sm font-medium leading-[1.25] tracking-[-0.02em] text-[#181925]">
              Per-visitor revenue
            </span>
          </li>
        </ul>

        <a
          href="#"
          className="mt-[2px] inline-flex h-8 items-center gap-1 rounded-full bg-white px-2.5 pr-1.5 text-sm font-medium text-[#181925]"
          style={{
            boxShadow: "0px 1px 1px rgba(0,0,0,0.08), 0px 0px 0px 1px rgba(0,0,0,0.05)",
          }}
        >
          Learn more
          <ArrowIcon />
        </a>
      </div>

      <div className="relative flex h-[320px] w-full items-end overflow-hidden px-8 pb-6 pt-0">
        <div className="flex w-full flex-col gap-1">
          {countries.map((row) => (
            <div
              key={row.country}
              className="group relative flex h-9 w-full items-center overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center gap-[3px]">
                <div
                  className={`pointer-events-none h-full transform-gpu bg-[rgba(0,0,0,0.05)] transition-[width] duration-300 ease-out ${
                    row.successWidth ? "rounded-l-md" : "rounded-md"
                  }`}
                  style={{ width: row.neutralWidth }}
                />
                {row.successWidth ? (
                  <div
                    className="pointer-events-none h-full transform-gpu rounded-r-md bg-[rgba(51,199,88,0.16)] transition-[width] duration-300 ease-out"
                    style={{ width: row.successWidth }}
                  />
                ) : null}
              </div>

              <div className="relative z-10 flex w-full items-center gap-2 pl-2.5 pr-3">
                <div className="flex w-4 shrink-0 items-center justify-center text-[14px] leading-none">
                  {row.flag}
                </div>
                <div className="min-w-0 flex-1 truncate text-left text-sm tracking-[-0.02em] text-[#181925]">
                  {row.country}
                </div>
                <div className="relative ml-auto h-5 shrink-0 overflow-hidden">
                  <span className="flex items-center justify-end whitespace-nowrap text-sm text-[#666666]">
                    <span>{row.value}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VisitorsCardLabPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#181925]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div className="max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7D767A]">
            Reference Recreation
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#181925]">
            Visitors Revenue Attribution Card
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
            Recreated as a standalone lab so we can judge the card language, spacing,
            and proof-module structure without disturbing the case-study sections.
          </p>
        </div>

        <VisitorsRevenueCard />
      </div>
    </main>
  );
}
