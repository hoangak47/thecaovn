export default function Template({ children }) {
  return (
    <div>
      {/* Có thể thêm các thành phần chung sẽ re-render khi chuyển route */}
      {children}
    </div>
  );
}
