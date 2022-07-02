const LoadingVideoCard = () => {
  return (
    <div className={` flex flex-col gap-3`}>
      <div
        className="bg-gray-400"
        style={{
          width: "250px",
          height: "142px",
        }}
      />
      <div className="flex flex-row justify-start items-start gap-2">
        <div className={`rounded-full w-8 h-8  bg-gray-400`} />
        <div className="flex flex-col justify-between">
          <div className=" flex flex-col">
            <div className="flex flex-row items-center mt-1 bg-gray-400 w-8/12 p-2" />
            <div className="flex flex-row items-center bg-gray-400 w-full mt-2 p-2">
              <div className="text-sm text-transparent w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingVideoCard;
