import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material";

function PopupQuestion({
	title,
	alert,
	text,
	confirm,
	cancle,
	visible,
	onClose }
) {
	return (
		<Dialog
        open={visible}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
					<DialogContentText id="alert-dialog-description">
						{text}
						{alert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
					<button
						onClick={confirm}
						className="btn danger-btn"
					>
            Confirm
					</button>
					<button
						onClick={cancle}
						className="btn primary-btn">Cancle
					</button>
        </DialogActions>
      </Dialog>
	)
}

export default PopupQuestion;