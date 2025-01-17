import { Routes, Route, Navigate } from "react-router-dom";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import Home from "./Home";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr />
            <table>
                <tr>
                    <td valign="top">
                        <CourseNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />}/>
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<h2>Assignments</h2>} />
                            <Route path="Assignments/:aid" element={<h2>Assignment Editor</h2>} />
                            <Route path="People" element={<h2>People</h2>} />
                        </Routes>
                    </td>
                </tr>
            </table>

        </div>
    );
}
