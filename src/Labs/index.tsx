import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import { Route, Routes, Navigate } from "react-router";

export default function Labs() {
  return (
    <div>
      <h1><u>CS5610-01 Spring 2025</u></h1>
      <h1><u>Sri Vishaak Ramesh Babu</u></h1>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
);}
