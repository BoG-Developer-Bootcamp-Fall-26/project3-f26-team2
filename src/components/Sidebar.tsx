import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  userName: string;
  isAdmin: boolean;
  activePage: string;
};

const userLinks = [
  {
    label: "Training logs",
    href: "/training-logs",
    activeIcon: "activeTrainingLogo.png",
    inactiveIcon: "inactiveTrainingLogs.png",
  },
  {
    label: "Animals",
    href: "/animals",
    activeIcon: "activeAnimalsLogo.png",
    inactiveIcon: "inactiveAnimalLogo.png",
  },
];

const adminLinks = [
  {
    label: "All training logs",
    href: "/admin/training-logs",
    activeIcon: "activeAllTrainingLogo.png",
    inactiveIcon: "inactiveAllTrainingLogo.png",
  },
  {
    label: "All animals",
    href: "/admin/animals",
    activeIcon: "activeAllAnimalsLogo.png",
    inactiveIcon: "inactiveAllAnimalsLogo.png",
  },
  {
    label: "All users",
    href: "/admin/users",
    activeIcon: "activeAllUsersLogo.png",
    inactiveIcon: "inactiveAllUsersLogo.png",
  },
];

export default function Sidebar({ userName, isAdmin, activePage }: SidebarProps) {
  function renderLink(link: (typeof userLinks)[number]) {
    const isActive = activePage === link.href;
    const icon = isActive ? link.activeIcon : link.inactiveIcon;
    const linkColor = isActive
      ? "bg-[#D21312] text-white"
      : "text-gray-700 hover:bg-gray-100";

    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg ${linkColor}`}
      >
        <Image
          src={`/images/${icon}`}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
        />
        {link.label}
      </Link>
    );
  }

  return (
    <aside className="flex flex-col border-b border-gray-200 bg-white p-4 md:w-64 md:shrink-0 md:border-b-0 md:border-r lg:w-[336px] lg:p-6">
      <nav aria-label="Dashboard navigation" className="space-y-2">
        {userLinks.map(renderLink)}

        {isAdmin && (
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
            <p className="px-4 font-medium text-gray-700">Admin access</p>
            {adminLinks.map(renderLink)}
          </div>
        )}
      </nav>

      <div className="mt-auto pt-6">
        <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D21312] text-xl font-bold text-white"
          >
            {userName.charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <p className="break-words font-bold">{userName}</p>
            <p className="text-sm text-gray-600">
              {isAdmin ? "Admin" : "Trainer"}
            </p>
          </div>

          <Link href="/" aria-label="Log out" className="rounded-md p-2 hover:bg-gray-100">
            <Image
              src="/images/logoutLogo.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}