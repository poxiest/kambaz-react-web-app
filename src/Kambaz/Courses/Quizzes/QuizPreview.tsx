/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import * as quizClient from "./client";

interface Answer {
  questionId: string;
  answer: string[]; // The answer is always an array of strings
}

interface Attempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  timestamp: string;
  score: number;
}

export default function QuizPreview() {
  const { quizId } = useParams();
  const { attemptId } = useParams();
  const navigate = useNavigate();

  console.log(quizId);
  console.log(attemptId);

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((q: any) => q._id === quizId);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();

  console.log("Current quiz", quiz);

  const [userAttempts, setUserAttempts] = useState<Attempt[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [, setTime] = useState("");
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(false);
  const [back, setBack] = useState(false);
  const [, setQuesId] = useState();
  let [, setAtt] = useState<number | null>(null);

  useEffect(() => {
    if (quiz) {
      setAtt(quiz.attempts);
    }
  }, [quiz]);

  const fetchQuestion = async () => {
    setIsLoading(true);
    try {
      const quiz = await quizClient.findQuestionsForQuiz(quizId as string);
      console.log("Inside fetchQuestion");
      setQuizQuestions(Array.isArray(quiz) ? quiz : []);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setQuizQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchAttempts = async () => {
    try {
      const userId = currentUser._id;
      const attempts = await quizClient.fetchUserAttempts(
        quizId as string,
        userId
      );
      if (attemptId) {
        setDisable(true);
      }
      setUserAttempts(attempts);
    } catch (error) {
      console.error("Failed to fetch attempts:", error);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  console.log(userAttempts);
  console.log(quizQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBefore = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    const currentTime = new Date().toLocaleString();
    setTime(currentTime);

    let calculatedScore = 0;
    console.log(answers);

    answers.forEach((submittedAnswer) => {
      const question = quizQuestions.find(
        (q: any) => q._id === submittedAnswer.questionId
      );

      console.log(question);
      if (question) {
        console.log("Inside Question");
        let correctAnswers: string[] = [];
        let isCorrect = false;

        switch (question.qtype) {
          case "multipleChoice":
            if (Array.isArray(question.answer)) {
              correctAnswers = question.answer
                .filter((opt: any) => opt.isAnswer)
                .map((opt: any) => opt.answer);
            }

            isCorrect =
              JSON.stringify(correctAnswers.sort()) ===
              JSON.stringify(submittedAnswer.answer.sort());
            console.log(isCorrect);

            if (isCorrect) {
              calculatedScore += question.points;
            }
            break;

          case "true / false":
            if (Array.isArray(question.answer)) {
              correctAnswers = question.answer[0].isAnswer;
            }
            console.log("t/f", correctAnswers);
            console.log("t/f   ", submittedAnswer.answer[0]);
            isCorrect =
              question.answer[0].isAnswer ===
              (submittedAnswer.answer[0].toLowerCase() === "true");

            console.log("Checking", isCorrect);
            if (isCorrect) {
              calculatedScore += question.points;
            }
            break;

          case "fillIn":
            correctAnswers = question.answer
              .filter((opt: any) => opt.isAnswer)
              .map((opt: any) => opt.answer.trim().toLowerCase());

            isCorrect = correctAnswers.includes(
              (submittedAnswer.answer[0] || "").trim().toLowerCase()
            );

            if (isCorrect) {
              calculatedScore += question.points;
            }
            break;

          default:
            console.warn(
              "Unsupported question type for scoring:",
              question.qtype
            );
        }
      }
    });

    console.log("Final Calculated Score:", calculatedScore);
    setScore(calculatedScore);

    const newAttempt: Attempt = {
      _id: userAttempts[0]?._id ?? "",
      quizId: quizId as string,
      userId: currentUser._id,
      answers: [...answers],
      timestamp: new Date().toISOString(),
      score: calculatedScore,
    };

    quizClient.createAttempt(newAttempt);
    console.log("Created new attempt:", newAttempt);
    setBack(!back);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  };

  const handleReturn = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
  };

  // Current question to render
  const currentQuestion = quizQuestions[currentIndex];
  console.log(currentQuestion);

  // Function to render different question types
  const renderQuestion = (question: any) => {
    if (!question || !question._id) {
      return <p>This question is not properly configured.</p>;
    }

    const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
      console.log(disable);
      if (disable) return;
      setQuesId(question._id);
      setAnswers((prevAnswers) => {
        const questionIndex = prevAnswers.findIndex(
          (answer) => answer.questionId === questionId
        );

        if (questionIndex > -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionIndex] = {
            questionId,
            answer: [selectedAnswer],
          };
          return updatedAnswers;
        } else {
          return [...prevAnswers, { questionId, answer: [selectedAnswer] }];
        }
      });
    };

    if (Array.isArray(question.answer) && question.answer.length > 0) {
      console.log(question.answer[0].isAnswer);
    } else {
      console.log("question.answer is not a valid array or is empty.");
    }

    const userAnswer = userAttempts[0]?.answers.find(
      (answer) => answer.questionId === question._id
    );
    const userSelectedAnswer = userAnswer ? userAnswer.answer : [];
    console.log(userSelectedAnswer);

    switch (question.qtype) {
      case "multipleChoice":
        return (
          <div>
            {Array.isArray(question.answer) &&
              question.answer.map((option: any, index: any) => (
                <div
                  className={`form-check p-2 rounded ${
                    attemptId && option.isAnswer
                      ? "bg-success bg-opacity-25 border border-success"
                      : ""
                  } ${
                    attemptId &&
                    userSelectedAnswer.includes(option.answer) &&
                    !option.isAnswer
                      ? "bg-danger bg-opacity-25 border border-danger"
                      : ""
                  }`}
                  key={index}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${question._id}`}
                    className="form-check-input"
                    disabled={disable}
                    onChange={() =>
                      handleAnswerChange(question._id, option.answer)
                    }
                    checked={userSelectedAnswer.includes(option.answer)}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className={`form-check-label ${disable ? "text-body" : ""}`}
                  >
                    {attemptId && option.isAnswer && (
                      <span
                        className="me-2 text-success fw-bold"
                        aria-label="Correct Answer"
                      >
                        ✓
                      </span>
                    )}
                    {attemptId &&
                      userSelectedAnswer.includes(option.answer) &&
                      !option.isAnswer && (
                        <span
                          className="me-2 text-danger fw-bold"
                          aria-label="Your Answer"
                        >
                          ✗
                        </span>
                      )}
                    {option.answer}
                  </label>
                </div>
              ))}
          </div>
        );

      case "fillIn":
        return (
          <div>
            <input
              type="text"
              className={`form-control ${
                attemptId &&
                question.answer
                  .filter((opt: any) => opt.isAnswer)
                  .map((opt: any) => opt.answer.trim().toLowerCase())
              }
                  ? "border-success"
                  : ""
              } ${
                attemptId &&
                !question.answer
                  .filter((opt: any) => opt.isAnswer)
                  .map((opt: any) => opt.answer.trim().toLowerCase())
              }
                  ? "border-danger"
                  : ""
              }`}
              placeholder="Type your answer here..."
              disabled={disable}
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value.trim())
              }
              {...(attemptId && { value: userSelectedAnswer[0] || "" })}
            />
            {attemptId && question.answer.some((ans: any) => ans.isAnswer) && (
              <p className="text-success mt-2">
                Correct Answer:{" "}
                {question.answer
                  .filter((ans: any) => ans.isAnswer)
                  .map((ans: any) => ans.answer)
                  .join(", ")}
              </p>
            )}
          </div>
        );

      case "true / false":
        return (
          <div>
            <div
              className={`form-check ${
                attemptId &&
                Array.isArray(question.answer) &&
                question.answer.length > 0 &&
                question.answer[0].isAnswer &&
                userSelectedAnswer.includes("True")
                  ? "bg-success text-white"
                  : attemptId &&
                    userSelectedAnswer.includes("True") &&
                    !question.answer[0].isAnswer
                  ? "bg-danger text-white"
                  : ""
              }`}
            >
              <input
                type="radio"
                id="true"
                name={`question-${question.questionId}`}
                disabled={disable}
                checked={
                  attemptId ? userSelectedAnswer.includes("True") : false
                }
                className="form-check-input"
                onChange={() => handleAnswerChange(question._id, "True")}
              />
              <label htmlFor="true" className="form-check-label">
                True
              </label>
            </div>
            <div
              className={`form-check ${
                attemptId &&
                Array.isArray(question.answer) &&
                question.answer.length > 0 &&
                !question.answer[0].isAnswer &&
                userSelectedAnswer.includes("False")
                  ? "bg-success text-white"
                  : attemptId &&
                    userSelectedAnswer.includes("False") &&
                    question.answer[0].isAnswer
                  ? "bg-danger text-white"
                  : ""
              }`}
            >
              <input
                type="radio"
                id="false"
                name={`question-${question.questionId}`}
                className="form-check-input"
                onChange={() => handleAnswerChange(question._id, "False")}
                disabled={disable}
                checked={
                  attemptId ? userSelectedAnswer.includes("False") : false
                }
              />
              <label htmlFor="false" className="form-check-label">
                False
              </label>
            </div>
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  // Empty state for no questions
  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Handle empty questions state
  // Handle empty questions state
  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Quiz Preview</h2>

        {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
          <div className="alert alert-danger" role="alert">
            This is a preview of the published version of the quiz
          </div>
        )}

        <div className="alert alert-info">
          <h4 className="alert-heading">No Questions Available</h4>
          <p>This quiz does not have any questions yet.</p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`)}
        >
          Back to Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Quiz Title */}

      {/* Warning Banner */}
      {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
        <>
          <h2>Quiz Preview</h2>

          <div className="alert alert-danger" role="alert">
            This is a preview of the published version of the quiz
          </div>
        </>
      )}

      {/* Quiz Details */}
      <p>
        <strong>Started:</strong> {new Date().toLocaleString()}
      </p>

      <h5>
        <strong>Quiz Instructions</strong>
      </h5>
      <p>{quiz?.description || "No instructions provided."}</p>

      {/* Render Current Question */}
      <div className="border rounded p-3 mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Question Header */}
          <div>
            <strong>Question {currentIndex + 1}</strong>
          </div>
          <span>{currentQuestion?.points || 0} pts</span>
        </div>
        <p>{currentQuestion?.question || "Question text not available"}</p>

        {/* Render Question Based on Type */}
        {renderQuestion(currentQuestion)}

        {/* Next Button */}
        <div className="d-flex justify-content-end">
          {currentIndex > 0 && (
            <div className="row-5 text-end me-4 mt-3">
              <button className="btn btn-danger" onClick={handleBefore}>
                &lt; Before
              </button>
            </div>
          )}
          {currentIndex < quizQuestions.length - 1 && (
            <div className="d-flex justify-content-end">
              <div className="row text-end me-2 mt-3">
                <button className="btn btn-primary" onClick={handleNext}>
                  Next &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Save Info */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p>
          Quiz saved at{" "}
          {new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        {!back && !attemptId && currentIndex === quizQuestions.length - 1 && (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
        {back && (
          <button className="btn btn-primary" onClick={handleReturn}>
            Return
          </button>
        )}
        {(score !== null || attemptId) && (
          <div>
            <h3>Your Score: {attemptId ? userAttempts[0]?.score : score}</h3>
          </div>
        )}
      </div>

      {/* Question Navigation */}
      <div className="mt-4">
        <h6>Questions</h6>
        <ul className="list-unstyled">
          {quizQuestions.map((question: any, index: any) => (
            <li
              key={question._id || index}
              className={`text-danger ${
                index === currentIndex ? "fw-bold" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <span>❓</span> Question {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
