import Image from "next/image";

const riseLogoSrc =
  "https://www.todesktop.com/cdn-cgi/image/width=60,height=60,f=auto,fit=cover/_astro/customer-logo-Rise.D-djK163.png";
const rickAvatarSrc =
  "https://www.todesktop.com/cdn-cgi/image/width=48,height=48,f=auto,fit=cover/_astro/Rick.B3vEedp8.jpg";

function CodeGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 256 256"
      className="h-6 w-6 text-[#5E638C]"
      fill="currentColor"
    >
      <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" />
    </svg>
  );
}

function QuoteLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a
      href={href}
      className="border-b border-dotted border-[#A7AEB2] text-inherit transition-colors duration-150 hover:border-[#7C8389]"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function ToDesktopQuoteCard() {
  return (
    <div className="w-full max-w-[414px]">
      <article
        className="flex w-full flex-col justify-between overflow-hidden"
        style={{
          aspectRatio: "414 / 500",
          borderRadius: "18px",
          padding: "clamp(28px, 9.66%, 40px)",
          background:
            "linear-gradient(135deg, #E4F2E2 0%, #D7EAD6 42%, #DDE9DD 100%)",
          boxShadow: "inset 0 0 0 2px #24BA60",
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: "clamp(26px, 8%, 40px)" }}
        >
          <div className="flex flex-col gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#CCCCFF]">
              <CodeGlyph />
            </div>

            <h1
              className="text-[24px] leading-[1.333] text-[#081A14]"
              style={{
                fontFamily:
                  '"TT Hoves Pro", Inter, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Native APIs
            </h1>
          </div>

          <div
            className="relative text-[18px] leading-[1.56] text-[#30403A]"
            style={{ fontWeight: 400 }}
          >
            <span className="absolute -left-[18px] top-0 text-[40px] leading-none text-[#CBD1CC]">
              &ldquo;
            </span>
            <p className="m-0">
              What sets ToDesktop apart is its seamless integration with native
              APIs using our existing web codebase. By tapping into APIs like{" "}
              <QuoteLink href="https://www.todesktop.com/builder/docs/menus/create-dynamic-menus">
                Tray
              </QuoteLink>{" "}
              and{" "}
              <QuoteLink href="https://www.todesktop.com/builder/docs/application/sending-notifications">
                Notifications
              </QuoteLink>
              , we&apos;ve crafted an exceptionally polished desktop user
              experience.
              <span className="pl-1 text-[32px] leading-none text-[#CBD1CC]">
                &rdquo;
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="relative -mr-3 h-12 w-12 overflow-hidden rounded-full">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="48px"
                src={riseLogoSrc}
              />
            </div>

            <Image
              alt=""
              className="z-[1] rounded-full border border-white object-cover"
              height={48}
              sizes="48px"
              src={rickAvatarSrc}
              width={48}
            />
          </div>

          <div className="flex flex-col">
            <div className="text-[16px] font-semibold leading-6 text-[#111814]">
              Rick Pastoor
            </div>
            <div className="text-[16px] leading-6 text-[#6D6E73]">
              <QuoteLink href="https://risecalendar.com/">Rise</QuoteLink>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ToDesktopCardQuoteLabPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F5F1] px-4 py-10">
      <ToDesktopQuoteCard />
    </main>
  );
}
