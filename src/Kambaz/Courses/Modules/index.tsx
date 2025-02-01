import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModulesControlsButton from "./ModulesControlButtons";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />

            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1 <ModulesControlsButton />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons /> </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />  Learn what is Web Development<LessonControlButtons /> </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> 
                    <BsGripVertical className="me-2 fs-3" /> Week 2 <ModulesControlsButton /> </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Formatting User Interfaces with HTML <LessonControlButtons /> </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Learn how to create user interfaces with HTML. <LessonControlButtons /> </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Deploy the assignment to Netlify. <LessonControlButtons /> </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary"> 
                    <BsGripVertical className="me-2 fs-3" /> 
                    Week 3 <ModulesControlsButton /> </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />  Creating Single Page Applications with React <LessonControlButtons /> </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />  Introduction to Javascript and React. <LessonControlButtons /> </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />  Dynamic Styling. <LessonControlButtons /> </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
