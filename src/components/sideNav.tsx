"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Fields = {
  "Component Name": string;
  [key: string]: any;
};

type SideNavProps = {
  componentItems?: { name: string; tag: string }[];
};

const flowItems = [
  { name: "Onboarding", tag: "onboarding" },
  { name: "Checkout", tag: "checkout" },
  { name: "Profile Setup", tag: "profile-setup" },
  { name: "Feedback", tag: "feedback" },
  { name: "Support", tag: "support" },
  { name: "Notifications", tag: "notifications" },
  { name: "Search", tag: "search" },
  { name: "Messaging", tag: "messaging" },
  { name: "Payment", tag: "payment" },
  { name: "Subscription", tag: "subscription" },
  { name: "Error Handling", tag: "error-handling" },
  { name: "User Journey", tag: "user-journey" },
];

const SideNav = ({ componentItems = [] }: SideNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFlow = pathname.startsWith("/uiFlows");
  const navItems = isFlow ? flowItems : componentItems;
  const basePath = isFlow ? "/uiFlows" : "/components";
  const currentTag = searchParams.get("tag") || (isFlow ? "onboarding" : "all");

  if (!isFlow && (!componentItems || componentItems.length === 0)) {
    return (
      <div className="flex flex-col min-w-[180px] max-w-[180px] text-white/60 px-4 py-2">
        No component names provided.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-[180px] max-w-[180px]">
      {navItems.map((item) => {
        const href = `${basePath}?tag=${encodeURIComponent(item.tag)}`;
        const isActive = currentTag === item.tag;

        return (
          <Link
            key={item.tag}
            href={href}
            className={`block rounded mb-1 last:mb-0 transition-colors duration-200 ease-in-out py-2 first:pt-0 font-medium ${
              isActive
                ? "text-white font-semibold"
                : "text-white/50  hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SideNav;
