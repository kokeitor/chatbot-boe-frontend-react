import toast from "react-hot-toast";
// Custom toast function for showing the uploaded server files
export function FilesCustomToast(t, files) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-mono font-bold text-[#08fa30]">
              Archivos subidos con éxito
            </p>
            {files.map(function showFiles(f, index) {
              return (
                <p className="mt-1 text-sm font-mono text-gray-500" key={index}>
                  {f.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-[#2a63ff] hover:text-[#6d93fc] focus:text-[#6d93fc] hover:bg-[#e0edff] focus:bg-[#d6e4ff] focus:outline-none focus:ring-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export function FilesDeletedCustomToast(t) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-mono font-bold text-[#ff3939]">
              Archivos elminados con éxito
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-[#2a63ff] hover:text-[#6d93fc] focus:text-[#6d93fc] hover:bg-[#e0edff] focus:bg-[#d6e4ff] focus:outline-none focus:ring-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
