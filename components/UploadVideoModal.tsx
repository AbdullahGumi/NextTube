import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Dropzone from "react-dropzone";

const UploadVideoModal = ({ isModalOpen, setModalOpen }) => {
  return (
    <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{ transform: "translate(-50%, -50%)" }}
        className="outline-none rounded-md flex flex-col gap-4 bg-slate-800 w-2/5 top-1/2 left-1/2 absolute "
      >
        <div className="flex flex-row justify-between pt-6 px-6 items-center">
          <h2 className="font-medium text-xl text-white">Upload video</h2>
          <CloseIcon
            className="hover:cursor-pointer  text-white"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <hr />
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4 p-6">
                <div className="bg-slate-900 w-36 h-36 rounded-full flex items-center justify-center hover:cursor-pointer">
                  <FileUploadIcon sx={{ fontSize: "65px", color: "#aaa" }} />
                </div>
                <span className="text-base text-white font-medium">
                  Drag and drop video files to upload
                </span>
              </div>
            </div>
          )}
        </Dropzone>
      </Box>
    </Modal>
  );
};

export default UploadVideoModal;
