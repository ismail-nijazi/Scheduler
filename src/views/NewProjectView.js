import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function NewProjectView() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");

	return (
		<div className='modal'>
      <div className="newProject">
        <div className="head">
          <span className="title">Add a new project</span>
          <button
            type="button"
            className="btn transparent-btn close-btn"
            onClick={() => navigate(-1)}>
            <FaTimes size={26} />
          </button>
        </div>
				<div className="content">
					<div className="row">
            <div className="col">
              <span>Title</span>
              <input
                className="input"
                type="text"
                name="title"
								value={title}
								placeholder="Title"
                onChange={(event) =>setTitle(event.target.value)}
              />
            </div>
					</div>
					<div className="row footer">
						<div className="col">
							<button type="button" className="btn primary-btn">
								Add
							</button>
						</div>
					</div>
				</div>
      </div>
    </div>
	)
}

export default NewProjectView;