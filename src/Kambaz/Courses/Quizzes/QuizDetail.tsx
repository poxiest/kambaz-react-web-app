/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuiz } from "./reducerQuiz"; // Import the updateQuiz action
import { CgShapeHalfCircle } from "react-icons/cg";
import { updateQuizz } from "./client"; // Client API
import { useNavigate, useParams } from "react-router";
import * as courseClient from "../client";

const Details = ({ quizDetails }: { quizDetails: any }) => {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("quizDetails", quizDetails);
  const today = new Date().toISOString().split("T")[0];


  // Local state for editing the quiz details
  const [details, setDetails] = useState({
    _id: quizDetails?._id,
    name: quizDetails?.name || "",
    description: quizDetails?.description || "",
    availability: quizDetails?.availability || "Closed",
    type: quizDetails?.type || "Graded Quiz",
    group: quizDetails?.group || "Assignments",
    shuffled: quizDetails?.shuffled || true,
    time: quizDetails?.time || 20,
    multipleAttempts: quizDetails?.multipleAttempts || false,
    assignTo: quizDetails?.assignTo || "Everyone",
    dueDate: quizDetails?.dueDate || today,
    availableDate: quizDetails?.availableDate || today,
    untilDate: quizDetails?.untilDate || today,
    points: quizDetails?.points || 15,
    attempts: quizDetails?.attempts || 0,
    lock: quizDetails?.lock || false,
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    dates: ""
  });

  const hasChanges = () => {
    if (!quizDetails) return true; // Always save for new quizzes
  
    const keysToCheck = Object.keys(details) as (keyof typeof details)[];
    return keysToCheck.some((key) => {
      return details[key] !== quizDetails[key];
    });
  };

  // Function to determine availability
  const calculateAvailability = () => {
    const currentDate = new Date();
    console.log(currentDate)
    const availableFrom = new Date(details.availableDate);
    const availableUntil = new Date(details.untilDate);

    if (currentDate < availableFrom) {
      return "Not Available"; // Not yet available
    } else if (currentDate > availableUntil) {
      return "Closed"; // Past the available date
    } else {
      return "Available"; // Currently available
    }
  };

  useEffect(() => {
    const updatedAvailability = calculateAvailability();
    setDetails((prevDetails) => ({
      ...prevDetails,
      availability: updatedAvailability,
    }));
  }, [details.availableDate, details.untilDate]);

  // Handle input changes
  const handleInputChange = (
      e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      // Handle checkbox inputs
      setDetails((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
    ) {
      // Handle text, textarea, or select inputs
      setDetails((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));

      // Clear error when user starts typing in the name field
      if (target.name === "name" && target.value.trim() !== "") {
        setErrors(prev => ({
          ...prev,
          name: ""
        }));
      }

      // Clear date errors when any date field changes
      if (target.name === "dueDate" || target.name === "availableDate" || target.name === "untilDate") {
        setErrors(prev => ({
          ...prev,
          dates: ""
        }));
      }
    }
  };

  // Function to validate quiz before saving
  const validateQuiz = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate quiz title
    if (!details.name || details.name.trim() === "") {
      newErrors.name = "Quiz title is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Validate dates
    const availableFromDate = new Date(details.availableDate);
    const dueDate = new Date(details.dueDate);
    const untilDate = new Date(details.untilDate);

    if (dueDate < availableFromDate) {
      newErrors.dates = "Due date must be after the available from date";
      isValid = false;
    } else if (untilDate < dueDate) {
      newErrors.dates = "Available until date must be on or after the due date";
      isValid = false;
    } else {
      newErrors.dates = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save the updated quiz details
  const handleSave = () => {
    if (!validateQuiz()) {
      return; // Stop the save process if validation fails
    }

    if (!hasChanges()) {
      console.log("No changes to save.");
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      return;
    }

    const updatedQuiz = {
      ...details,
    };

    if (quizDetails) {
      // Update the existing quiz
      updateQuizz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
      console.log("Quiz Details Updated:", details);
    } else {
      // Create a new assignment
      const newQuiz = {
        ...details,
        _id: new Date().getTime().toString(),
      };
      courseClient.createQuizForCourse(cid, newQuiz);
      console.log("New quiz Created:", newQuiz);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  // Reset local state to cancel changes
  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    console.log("Edit Cancelled");
  };

  const handleSavePublish = () => {
    if (!validateQuiz()) {
      return; // Stop the save process if validation fails
    }

    const updatedQuiz = {
      ...details,
      published: true,
    };

    if (quizDetails) {
      // Updating an existing quiz
      updateQuizz(updatedQuiz); // API call
      dispatch(updateQuiz(updatedQuiz)); // Redux update
      console.log("Quiz Published:", updatedQuiz);
    } else {
      // Creating a new quiz
      const newQuiz = {
        ...updatedQuiz,
        _id: new Date().getTime().toString(), // create unique ID
      };
      courseClient.createQuizForCourse(cid, newQuiz);
      console.log("New Quiz Created & Published:", newQuiz);
    }

    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
      <div className="details">
        {/* Quiz Name Section */}
        <div className="mb-3 col-5">
          <input
              type="text"
              className={`form-control border ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={details.name}
              onChange={handleInputChange}
              placeholder="Unnamed Quiz"
          />
          {errors.name && (
              <div className="invalid-feedback">
                {errors.name}
              </div>
          )}
        </div>
        <div className="mb-4">
          <label className="form-label">Quiz Instructions:</label>

          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            {/* Left Toolbar Options */}
            <div className="d-flex">
              <button className="btn btn-link text-decoration-none me-3 text-black">
                Edit
              </button>
              <button className="btn btn-link text-decoration-none me-3 text-black">
                View
              </button>
              <button className="btn btn-link text-decoration-none me-3 text-black">
                Insert
              </button>
              <button className="btn btn-link text-decoration-none me-3 text-black">
                Format
              </button>
              <button className="btn btn-link text-decoration-none me-3 text-black">
                Tools
              </button>
            </div>

            {/* Right Progress */}
            <div className="d-flex align-items-center">
              <CgShapeHalfCircle
                  className="d-inline-block text-success fs-1"
                  style={{ transform: "rotate(90deg)" }}
              />
              <span className="me-2 fw-bold">100%</span>
            </div>
          </div>
          <textarea
              className="form-control"
              name="description"
              value={details.description}
              onChange={handleInputChange}
              placeholder="Add quiz instructions here..."
          ></textarea>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Quiz Type */}
            <div className="mb-3 row">
              <div className="col-3">
                <label htmlFor="wd-group">Quiz Type</label>
              </div>
              <div className="col-9">
                <select
                    id="wd-group"
                    className="form-select"
                    name="type"
                    value={details.type}
                    onChange={handleInputChange}
                >
                  <option>Graded Quiz</option>
                  <option>Ungraded Survey</option>
                  <option>Graded Survey</option>
                  <option>Practice Quiz</option>
                </select>
              </div>
            </div>

            {/* Assignment Group */}
            <div className="mb-3 row">
              <div className="col-3">
                <label htmlFor="wd-display-grade-as">Assignment Group</label>
              </div>
              <div className="col-9">
                <select
                    id="wd-display-grade-as"
                    className="form-select"
                    name="group"
                    value={details.group}
                    onChange={handleInputChange}
                >
                  <option>Quizzes</option>
                  <option>Exams</option>
                  <option>Assignments</option>
                  <option>Project</option>
                </select>
              </div>
            </div>

            {/* Options Section */}
            <div className="mb-3 row">
              <div className="col-9">
                <label className="fs-5">
                  <h6>
                    <b>Options</b>
                  </h6>
                </label>
                <div className="form-check mt-3">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-chkbox-text"
                      name="shuffled"
                      checked={details.shuffled}
                      onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-text">
                    Shuffle Answers
                  </label>
                </div>
                <div className="form-check mt-3">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-chkbox-lock"
                      name="lock"
                      checked={details.lock}
                      onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-lock">
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="form-check mt-3 me-2 col-11 d-flex">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-chkbox-website"
                      name="time"
                      checked={!!details.time}
                      onChange={handleInputChange}
                  />
                  <label
                      className="form-check-label col-3 ms-2"
                      htmlFor="wd-chkbox-website"
                  >
                    Time Limit
                  </label>
                  <input
                      type="number"
                      className="form-control me-2 w-2"
                      name="time"
                      value={details.time}
                      onChange={handleInputChange}
                      placeholder="Enter time limit"
                  />
                  <label className="form-label">Minutes</label>
                </div>
                <div className="form-check mt-3">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      id="wd-chkbox-media"
                      name="multipleAttempts"
                      checked={details.multipleAttempts}
                      onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="wd-chkbox-media">
                    Allow Multiple Attempts
                  </label>
                </div>
                {details.multipleAttempts && (
                    <div className="mt-2">
                      <label htmlFor="num-attempts" className="form-label">
                        Number of Attempts
                      </label>
                      <input
                          type="number"
                          id="num-attempts"
                          name="attempts"
                          value={details.attempts || 1}
                          className="form-control"
                          min="1"
                          onChange={handleInputChange}
                      />
                    </div>
                )}
              </div>
            </div>

            {/* Assign Section */}
            <div className="mb-3 row">
              <div className="col-3 ">
                <label htmlFor="wd-assign-to">Assign</label>
              </div>
              <div className="col-9">
                <div className="border rounded p-3">
                  <label htmlFor="wd-assign-to" className="form-label fs-5">
                    <b>Assign to</b>
                  </label>
                  <input
                      id="wd-assign-to"
                      className="form-control"
                      type="text"
                      name="assignTo"
                      value={details.assignTo}
                      onChange={handleInputChange}
                  />
                  <div className="form-group mt-4">
                    <label htmlFor="wd-due fs-6">
                      <b>Due</b>
                    </label>
                    <div className="input-group">
                      <input
                          type="date"
                          id="wd-due"
                          name="dueDate"
                          className={`form-control col-9 ${errors.dates ? 'is-invalid' : ''}`}
                          value={details.dueDate}
                          onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row mt-4">
                    <div className="col-6">
                      <label htmlFor="wd-available-from">
                        <b>Available from</b>
                      </label>
                      <input
                          type="date"
                          name="availableDate"
                          id="wd-available-from"
                          className={`form-control ${errors.dates ? 'is-invalid' : ''}`}
                          value={details.availableDate}
                          onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="wd-until">
                        <b>Available until</b>
                      </label>
                      <input
                          type="date"
                          id="wd-until"
                          name="untilDate"
                          className={`form-control ${errors.dates ? 'is-invalid' : ''}`}
                          value={details.untilDate}
                          onChange={handleInputChange}
                      />
                    </div>
                    {errors.dates && (
                        <div className="col-12 text-danger mt-2">
                          {errors.dates}
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-danger me-2" onClick={handleSave}>
                Save
              </button>
              <button
                  className="btn btn-warning me-2"
                  onClick={handleSavePublish}
              >
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Details;