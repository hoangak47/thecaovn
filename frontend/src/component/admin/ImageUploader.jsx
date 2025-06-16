import { useCallback } from "react";

function ImageUploader({ url, onChange }) {
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        uploadFile(files[0]);
      }
    },
    [onChange]
  );

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("upload", file);

    try {
      const response = await fetch("http://localhost:5000/upload/image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result?.url) {
        console.log("Uploaded image URL:", result.url);
        onChange?.(result.url); // ✅ Cập nhật cho parent
      } else {
        alert("Upload thất bại");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Lỗi khi upload ảnh");
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-3"></div>

      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        htmlFor="file-upload"
        className="border border-dashed border-gray-400 rounded p-6 text-center text-gray-500 text-xs cursor-pointer select-none block"
      >
        <div className="flex flex-col items-center justify-center">
          <i className="fas fa-cloud-upload-alt text-2xl mb-1"></i>
          <div>Kéo và thả hình vào đây</div>
          <div>Hoặc</div>
          <div className="mt-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-3 py-1 rounded inline-block">
            Chọn hình
          </div>
        </div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="mt-2 text-[10px] text-gray-500 font-semibold">
        (jpg, gif, png, jpeg, webp)
      </div>
    </div>
  );
}

export default ImageUploader;
