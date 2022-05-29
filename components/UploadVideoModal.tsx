import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDropzone } from "react-dropzone";

const UploadVideoModal = ({ isModalOpen, setModalOpen }) => {
  const [file, setFile] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setFile(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{ transform: "translate(-50%, -50%)" }}
        className="outline-none rounded-md flex flex-col gap-4 bg-slate-800 w-2/5 top-1/2 left-1/2 absolute "
      >
        <div className="flex flex-row justify-between pt-6 px-6 items-center">
          <h2 className="font-medium text-xl text-white">
            {file ? "Add details" : "Upload video"}
          </h2>
          <CloseIcon
            className="hover:cursor-pointer  text-white"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <hr />
        {!file ? (
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
        ) : (
          <div className="flex flex-col ">
            <h2 className="text-white font-semibold text-2xl">Details</h2>
            <textarea className="bg-slate-700"></textarea>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default UploadVideoModal;
