/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { SlCalender } from "react-icons/sl";

import { updateAssignment, setAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const path = useNavigate();

  const { assignment } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleSave = () => {
    assignmentsClient.updateAssignment(assignment);
      dispatch(
        updateAssignment({
          ...assignment,
        })
      );
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleButtonClick = () => {
    path(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Form>
        <FormGroup className="mb-4">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            type="text"
            id="wd-name"
            defaultValue={assignment && assignment.title}
            onChange={(e) =>
              dispatch(setAssignment({ ...assignment, title: e.target.value }))
            }
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormControl
            as="textarea"
            id="wd-description"
            defaultValue={assignment && assignment.description}
            onChange={(e) =>
              dispatch(
                setAssignment({ ...assignment, description: e.target.value })
              )
            }
          />
        </FormGroup>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <FormGroup as={Row} className="mb-3">
              <FormLabel
                htmlFor="wd-points"
                class="col-sm-3 col-form-label text-end"
              >
                Points
              </FormLabel>
              <Col sm={9}>
                <FormControl
                  id="wd-points"
                  type="number"
                  defaultValue={assignment && assignment.points}
                  onChange={(e) =>
                    dispatch(
                      setAssignment({ ...assignment, points: e.target.value })
                    )
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel
                class="col-sm-3 col-form-label text-end"
                htmlFor="wd-group"
              >
                Assignment Group
              </FormLabel>
              <Col sm={9}>
                <FormSelect id="wd-group">
                  <option selected>ASSIGNMENTS</option>
                </FormSelect>
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel
                class="col-sm-3 col-form-label text-end"
                htmlFor="wd-display-grade-as"
              >
                Display Grade As
              </FormLabel>
              <Col sm={9}>
                <FormSelect id="wd-display-grade-as">
                  <option value="Percentage" selected>
                    Percentage
                  </option>
                  <option value="Percentile">Percentile</option>
                  <option value="Grade">Grade</option>
                </FormSelect>
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel
                class="col-sm-3 col-form-label text-end"
                htmlFor="wd-submission-type"
              >
                Submission Type
              </FormLabel>
              <Col sm={9}>
                <div className="border rounded p-3">
                  <FormSelect id="wd-submission-type">
                    <option>Online</option>
                    <option>Offline</option>
                  </FormSelect>

                  <FormLabel className="fs-5 mt-3 mb-2">
                    <b>Online Entry Options</b>
                  </FormLabel>
                  <FormCheck
                    type="checkbox"
                    id="wd-text-entry"
                    label="Text Entry"
                    className="mb-2"
                  />
                  <FormCheck
                    type="checkbox"
                    id="wd-website-url"
                    label="Website URL"
                    className="mb-2"
                  />
                  <FormCheck
                    type="checkbox"
                    id="wd-media-recordings"
                    label="Media Recordings"
                    className="mb-2"
                  />
                  <FormCheck
                    type="checkbox"
                    id="wd-student-annotation"
                    label="Student Annotation"
                    className="mb-2"
                  />
                  <FormCheck
                    type="checkbox"
                    id="wd-file-upload"
                    label="File Uploads"
                    className="mb-2"
                  />
                </div>
              </Col>
            </FormGroup>

            <FormGroup className="mb-3 row">
              <FormLabel
                class="col-sm-3 col-form-label text-end"
                htmlFor="wd-assign-to"
              >
                Assign
              </FormLabel>
              <Col sm={9}>
                <div className="border rounded p-3">
                  <FormLabel className="fs-5">
                    <b>Assign to</b>
                  </FormLabel>
                  <FormSelect id="wd-assign-to">
                    <option selected>Everyone</option>
                    <option>TA</option>
                    <option>Students</option>
                  </FormSelect>
                  <FormLabel className="mt-4">
                    <b>Due</b>
                  </FormLabel>
                  <FormGroup className="input-group">
                    <FormControl
                      type="date"
                      id="wd-due-date"
                      defaultValue={
                        assignment && assignment.dueDate && assignment.dueDate.split("T")[0]
                      }
                      onChange={(e) =>
                        dispatch(
                          setAssignment({ ...assignment, dueDate: e.target.value })
                        )
                      }
                    />
                    <span className="input-group-text">
                      <SlCalender />
                    </span>
                  </FormGroup>

                  <Row className="mt-4">
                    <Col sm={6}>
                      <FormLabel>
                        <b>Available From</b>
                      </FormLabel>
                      <FormGroup className="input-group">
                        <FormControl
                          type="date"
                          id="wd-available-from"
                          defaultValue={
                            assignment && assignment.availableDate && assignment.availableDate.split("T")[0]
                          }
                          onChange={(e) =>
                            dispatch(
                              setAssignment({ ...assignment, availableDate: e.target.value })
                            )
                          }
                        />
                        <span className="input-group-text">
                          <SlCalender />
                        </span>
                      </FormGroup>
                    </Col>
                    <Col sm={6}>
                      <FormLabel>
                        <b>Until</b>
                      </FormLabel>
                      <FormGroup className="input-group">
                        <FormControl
                          type="date"
                          id="wd-available-until"
                          placeholder="2024-01-02"
                        />
                        <span className="input-group-text">
                          <SlCalender />
                        </span>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
            </FormGroup>

            <hr />
            {currentUser.role === "FACULTY" && (
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleButtonClick}
                variant="secondary"
                className="me-2"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} variant="danger">
                Save
              </Button>
            </div>)}
          </div>
        </div>
      </Form>
    </div>
  );
}
