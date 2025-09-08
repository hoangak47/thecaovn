import React, { useCallback, useState } from "react";

export default function MultipleImage({ initialData, setData }) {
  const [multiple_image, setImage] = useState(initialData);

  React.useEffect(() => {
    setData((prev) => ({ ...prev, multiple_image: multiple_image }));
  }, [multiple_image]);

  React.useEffect(() => {
    setImage(initialData);
  }, [initialData]);

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      const filesArray = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (filesArray.length === 0) {
        alert("Chỉ chấp nhận file hình ảnh.");
        return;
      }

      await Promise.all(filesArray.map((file) => uploadFile(file)));
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      await Promise.all(filesArray.map((file) => uploadFile(file)));
    }
  };

  const uploadFile = async (file) => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
      const formData = new FormData();
      formData.append("upload", file);

      const response = await fetch(`${url}upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result?.url) {
        const uploaded = { url: result.url, title: "" };
        setImage((prevImage) => [...prevImage, uploaded]);
        return uploaded;
      } else {
        alert(`Upload thất bại cho file: ${file.name}`);
      }
    } catch (err) {
      alert("Lỗi khi upload ảnh");
    }
  };

  const handleDelete = (index) => {
    const updatedImage = [...multiple_image];
    updatedImage.splice(index, 1);
    setImage(updatedImage);
  };

  const handleTitleChange = (index, title) => {
    const updatedImage = [...multiple_image];
    updatedImage[index].title = title;
    setImage(updatedImage);
  };

  return (
    <div className="mx-auto bg-white rounded-md shadow-md p-6 space-y-6">
      <p className="text-gray-400 font-semibold text-sm select-none">
        Album ảnh: (jpg,gif,png,jpeg,gif,webp,WEBP)
      </p>
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        htmlFor="dropzone-file"
        className="border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex flex-col items-center justify-center py-16 px-6 cursor-pointer select-none"
      >
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <svg
          aria-hidden="true"
          className="h-10 w-10 text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <h3 className="text-gray-600 font-semibold text-lg mb-1">
          Kéo và thả hình vào đây
        </h3>
        <p className="text-gray-400 text-xs mb-4">hoặc</p>
        <button
          className="border border-red-700 text-red-700 font-semibold text-sm rounded-md px-4 py-2 hover:bg-red-700 hover:text-white transition"
          type="button"
        >
          chọn hình
        </button>
      </label>
      <div
        className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-3 pb-6 pr-3"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 transparent",
        }}
      >
        {multiple_image?.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 border border-gray-200 rounded-md bg-white flex flex-col items-center p-3"
          >
            <img
              alt="White tennis racket frame with red and blue stripes close-up"
              className="w-40 h-32 object-contain mb-3"
              draggable="false"
              height={140}
              src={item.url}
              width={180}
            />
            <button
              aria-label="Delete image 1"
              className="text-gray-400 hover:text-gray-600 mb-1"
              type="button"
              onClick={() => handleDelete(index)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>

            <input
              aria-label="Order number for image 1"
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm mb-1 focus:outline-none focus:ring-1 focus:ring-red-600"
              type="text"
              placeholder="Tiêu đề"
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
