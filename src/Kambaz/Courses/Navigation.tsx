import { NavLink } from "react-router-dom";
export default function CourseNavigation() {

  const links = [
    { to: "/Kambaz/Courses/1234/Home", id: "wd-course-home-link", label: "Home" },
    { to: "/Kambaz/Courses/1234/Modules", id: "wd-course-modules-link", label: "Modules" },
    { to: "/Kambaz/Courses/1234/Piazza", id: "wd-course-piazza-link", label: "Piazza" },
    { to: "/Kambaz/Courses/1234/Zoom", id: "wd-course-zoom-link", label: "Zoom" },
    { to: "/Kambaz/Courses/1234/Assignments", id: "wd-course-quizzes-link", label: "Assignments" },
    { to: "/Kambaz/Courses/1234/Quizzes", id: "wd-course-assignments-link", label: "Quizzes" },
    { to: "/Kambaz/Courses/1234/Grades", id: "wd-course-grades-link", label: "Grades" },
    { to: "/Kambaz/Courses/1234/People", id: "wd-course-people-link", label: "People" },
  ]
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ to, id, label }) => (
        <NavLink
          key={id} to={to} id={id}
          className={({ isActive }) =>
            isActive ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}
          style={{ fontSize: "1rem", fontWeight: "normal" }}>
          {label}
        </NavLink>
      ))}
    </div>
  );
}