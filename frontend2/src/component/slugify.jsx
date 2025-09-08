export function slugify(str) {
  return str
    ?.toLowerCase()
    .replace(/đ/g, "d") // thay đ -> d
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .replace(/\s+/g, "-") // thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, "-") // bỏ gạch ngang thừa
    .replace(/^-+|-+$/g, ""); // xóa gạch ngang đầu/cuối
}
