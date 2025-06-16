import React from "react";

export default function HandleAction({ initialData, setData, url, data }) {
  const handleSave = () => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => alert("Lưu thành công!"))
      .catch(() => alert("Lưu thất bại!"));
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleCancel = () => {
    window.location.reload();
  };
  return (
    <div className="flex space-x-2 mb-4">
      <button
        className="flex items-center gap-1 bg-[#198754] hover:bg-[#157347] text-white text-xs font-semibold px-3 py-1 rounded"
        type="button"
        onClick={handleSave}
      >
        <i className="fas fa-save"></i>Lưu
      </button>
      <button
        className="flex items-center gap-1 bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-xs font-semibold px-3 py-1 rounded"
        type="button"
        onClick={handleReset}
      >
        <i className="fas fa-redo-alt"></i>Làm lại
      </button>
      <button
        className="flex items-center gap-1 bg-[#f44336] hover:bg-[#d32f2f] text-white text-xs font-semibold px-3 py-1 rounded"
        type="button"
        onClick={handleCancel}
      >
        <i className="fas fa-sign-out-alt"></i>Thoát
      </button>
    </div>
  );
}
