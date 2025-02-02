import { NavLink } from "react-router-dom";
export default function AccountNavigation() {
  const links = [
    { to: "/Kambaz/Account/Signin", label: "Signin" },
    { to: "/Kambaz/Account/Signup", label: "Signup" },
    { to: "/Kambaz/Account/Profile", label: "Profile" },
  ];
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 position-fixed">
      {links.map(({ to, label }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "list-group-item active border border-0"
              : "list-group-item text-danger border border-0"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
