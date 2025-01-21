export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <h3><label htmlFor="wd-name">Assignment Name</label></h3>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="Assignments" selected>Assignments</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade As</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="Percentage" selected>Percentage</option>
                            <option value="Percentile">Percentile</option>
                            <option value="Grade">Grade</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <select id="wd-submission-type">
                                        <option>Online</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Online Entry Options</label><br />
                                    <input type="checkbox" name="online-entry-options" id="wd-text-entry" />
                                    <label htmlFor="wd-text-entry">Text Entry</label><br />
                                    <input type="checkbox" name="online-entry-options" id="wd-website-url" />
                                    <label htmlFor="wd-website-url">Website URL</label><br />
                                    <input type="checkbox" name="online-entry-options" id="wd-media-recordings" />
                                    <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                                    <input type="checkbox" name="online-entry-options" id="wd-student-annotation" />
                                    <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                                    <input type="checkbox" name="online-entry-options" id="wd-file-upload" />
                                    <label htmlFor="wd-file-upload">File Uploads</label><br />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-assign-to">Assign</label>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="wd-assign-to"> Assign to </label>
                                </td>
                            </tr>
                            <tr>
                                <select id="wd-assign-to" multiple>
                                    <option value="everyone" selected>Everyone</option>
                                </select>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="wd-due-date"> Due </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="date" id="wd-due-date" value="2024-01-02" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="wd-available-from"> Available From </label>
                                </td>
                                <td>
                                    <label htmlFor="wd-available-until"> Until </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="date" id="wd-available-from" value="2024-01-02" />
                                </td>
                                <td>
                                    <input type="date" id="wd-available-until" value="2024-01-02" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <hr />
            <div style={{ float: "right"}}>
            <button> Cancel </button>
            <button> Save </button>
            </div>
        </div>
    );
}
