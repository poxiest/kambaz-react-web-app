export default function Modules() {
    return (
        <div>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <button type="button"
                    onClick={() => alert("Hola!")}
                    id="wd-all-good"> Collapse All </button>
            <button type="button"
                    onClick={() => alert("Hole!")}
                    id="wd-all-good"> View Progress </button>
            <select id="wd-select-publish">
                <option value="">Publish All</option>
                <option value="publishNow">Publish Now</option>
                <option value="schedulePublish">Schedule Publish</option>
            </select>
            <button type="button"
                    onClick={() => alert("Hola!")}
                    id="wd-all-good"> + Module </button>
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Formatting User Interfaces with HTML</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Learn how to create user interfaces with HTML.</li>
                                <li className="wd-content-item">Deploy the assignment to Netlify.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Creating Single Page Applications with React</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to Javascript and React.</li>
                                <li className="wd-content-item">Dynamic Styling.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
