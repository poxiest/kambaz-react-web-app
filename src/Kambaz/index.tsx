import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import AccountNavigation from "./Account/Navigation";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
