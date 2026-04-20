function DeelOnboardingIllustration() {
  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-t-[12px] bg-[#F7F5F2]">
      <div className="absolute left-1/2 top-[18px] w-[146px] -translate-x-1/2 rounded-[14px] border border-black/10 bg-[#F7F5F2] px-[14px] py-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <div className="relative h-[34px] w-[34px] rounded-full bg-[linear-gradient(135deg,#FFD76B_0%,#F4B63E_100%)]">
            <div className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-[#F7F5F2] bg-[#E23C3C]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium leading-none text-[#323232]">Contractor</div>
            <div className="mt-[6px] h-[3px] w-[48px] rounded-full bg-black/8" />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-[68px] flex w-[270px] -translate-x-1/2 items-center gap-4 rounded-[18px] bg-white px-5 py-4 shadow-[0_3px_10px_rgba(0,0,0,0.04)]">
        <div className="h-[54px] w-[54px] shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F6E08B_0%,#F0C85B_46%,#E4A53E_100%)]" />
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-semibold leading-none tracking-[-0.02em] text-[#292929]">
            Michel B.
          </div>
          <div className="mt-1 text-[13px] leading-none text-[#6D6B68]">Designer</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-[28px] items-center rounded-full border border-[#F08A21] px-4 text-[13px] font-semibold tracking-[0.02em] text-[#F08A21]">
            ONBOARD
          </span>
          <div className="h-0 w-0 border-b-[11px] border-l-[18px] border-t-[11px] border-b-transparent border-l-[#111111] border-t-transparent" />
        </div>
      </div>

      <div className="absolute left-1/2 top-[156px] w-[132px] -translate-x-1/2 rounded-[14px] border border-black/10 bg-[#F7F5F2] px-[12px] py-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <div className="relative h-[30px] w-[30px] rounded-full bg-[linear-gradient(135deg,#C8B0FF_0%,#8A6CF4_55%,#5F4BB8_100%)]">
            <div className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-[#F7F5F2] bg-[#3A89F6]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium leading-none text-[#323232]">Contractor</div>
            <div className="mt-[6px] h-[3px] w-[42px] rounded-full bg-black/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeelOnboardingCard() {
  return (
    <div
      className="flex w-[416px] max-w-full flex-col overflow-hidden rounded-[12px] bg-[#F7F5F2]"
      style={{ fontFamily: 'Inter, "Inter Fallback", Arial, Helvetica, sans-serif' }}
    >
      <div className="flex flex-col-reverse">
        <div className="px-8 pb-9 pt-5">
          <div className="max-w-[320px]">
            <h2 className="text-[49px] font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111]">
              Onboard in under 2 days
            </h2>
            <p className="mt-4 text-[20px] leading-[1.45] tracking-[-0.03em] text-[#2F2E2C]">
              Manage paperwork, contracts, tasks, account access, and equipment in one simple
              flow.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 text-[18px] font-semibold tracking-[-0.03em] text-[#111111]"
            >
              Explore IT
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <DeelOnboardingIllustration />
      </div>
    </div>
  );
}

export default function DeelOnboardingCardLabPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#111111]">
      <div className="mx-auto flex max-w-5xl justify-center">
        <DeelOnboardingCard />
      </div>
    </main>
  );
}
