import Link from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
};

export const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <Link href={href} className="hover:text-slate-300 transition-all">
    {label}
  </Link>
);
