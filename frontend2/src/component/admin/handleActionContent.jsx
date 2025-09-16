import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function HandleAction({
  initialData = {},
  setData,
  url,
  data,
  id = null,
  goback = true,
  redirectTo = null,
}) {
  const router = useRouter();
  const handleSave = async () => {
    if (id === "gioi-thieu") {
      try {
        await axios.put(`${url}`, data);
        alert("Cập nhật thành công!");
        if (goback) {
          if (redirectTo) {
            router.push(`${redirectTo}`);
          } else {
            router.back();
          }
        }
      } catch (error) {
        alert("Cập nhật thất bại!");
      }
    } else if (id) {
      try {
        await axios.put(`${url}/${id}`, data);
        alert("Cập nhật thành công!");
        if (goback) {
          if (redirectTo) {
            console.log(redirectTo);
            router.push(`${redirectTo}`);
          } else {
            router.back();
          }
        }
      } catch (error) {
        alert("Cập nhật thất bại!");
      }
    } else {
      try {
        await axios.post(url, data);
        alert("Thêm mới thành công!");
        if (goback) {
          if (redirectTo) {
            router.push(`${redirectTo}`);
          } else {
            router.back();
          }
        }
      } catch (error) {
        alert("Thêm mới thất bại!");
      }
    }
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleCancel = () => {
    router.back();
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
