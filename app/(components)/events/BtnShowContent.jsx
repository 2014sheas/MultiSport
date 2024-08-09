"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const BtnShowContent = ({ contentType, content }) => {
  if (!content) {
    content = "There is currently no " + contentType + " to display.";
  }
  const [open, setOpen] = useState(false);

  const showContent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button onClick={showContent} className="btn w-1/6">
        {contentType}
      </button>
      <Dialog open={open} onClose={handleClose} className="w-full">
        <DialogTitle>{contentType}</DialogTitle>
        <DialogContent>
          <div className="w-5/6">{content}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BtnShowContent;
