import { useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Dropzone from "react-dropzone";
import { useSession } from "next-auth/react";

const UploadVideoModal = ({ isModalOpen, setModalOpen }) => {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const closeModal = () => {
    setVideo("");
    setThumbnail("");
    setTitle("");
    setDesc("");
    setModalOpen(false);
  };

  const upload = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/videos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: session?.user?.name,
        profilePic: session?.user?.image,
        title,
        desc,
        video,
        thumbnail,
      }),
    })
      .then((res) => res.json())
      .then((fin) => fin.status === "success" && setLoading(false))
      .catch((err) => console.error(err));
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        sx={{ transform: "translate(-50%, -50%)" }}
        className="outline-none rounded-md flex flex-col gap-4 bg-slate-800 w-2/5 top-1/2 left-1/2 absolute "
      >
        <div className="flex flex-row justify-between pt-6 px-6 items-center">
          <h2 className="font-medium text-xl text-white">
            {video ? "Add details" : "Upload video"}
          </h2>
          <CloseIcon
            className="hover:cursor-pointer  text-white"
            onClick={closeModal}
          />
        </div>
        <hr />
        {!video ? (
          <Dropzone
            onDrop={(acceptedFiles) => {
              acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onabort = () => console.log("file reading was aborted");
                reader.onerror = () => console.log("file reading has failed");
                reader.onload = () => {
                  const binaryStr = reader.result;
                  setVideo(binaryStr);
                };
                reader.readAsDataURL(file);
              });
            }}
          >
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
        ) : (
          <div className="flex flex-col p-6">
            <h2 className="text-white font-semibold text-2xl mb-4">Details</h2>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-700 text-white p-2"
              placeholder="Title (required)"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-slate-700 text-white mt-6 p-2"
              placeholder="Description"
            />
            <h2 className="text-white font-semibold text-2xl my-4">
              Thumbnail
            </h2>
            <Dropzone
              onDrop={(acceptedFiles) => {
                acceptedFiles.forEach((file) => {
                  const reader = new FileReader();
                  reader.onabort = () =>
                    console.log("file reading was aborted");
                  reader.onerror = () => console.log("file reading has failed");
                  reader.onload = () => {
                    const binaryStr = reader.result;
                    setThumbnail(binaryStr);
                  };
                  reader.readAsDataURL(file);
                });
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="w-2/5 h-20 object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center hover:cursor-pointer border-dashed border rounded-sm p-4 w-2/5 h-20">
                      <AddPhotoAlternateIcon className="text-white" />
                      <span className="text-white text-sm">
                        Upload thumbnail
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            <button
              onClick={upload}
              className="self-end text-black font-semibold uppercase bg-slate-300 p-3 rounded-md flex items-center justify-center"
              style={{ height: "48px", width: "85px" }}
            >
              {isLoading ? <CircularProgress size={26} /> : "Upload"}
            </button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default UploadVideoModal;
