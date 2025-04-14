/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as courseClient from "../../Courses/client";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const findUsersCourse = async () => {
    try {
      const userCourses = await courseClient.findUsersForCourse(cid);
      setUsers(userCourses);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (cid) {
      findUsersCourse();
    }
  }, [cid]);

  return (
    <div id="wd-people-table">
      {/* <PeopleDetails /> */}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              {/* <td className="wd-full-name text-nowrap">
                <Link
                  to={`/Kambaz/Account/Users/${user._id}`}
                  className="text-decoration-none"
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName} </span>
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td> */}
              <td className="wd-full-name">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName} </span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
