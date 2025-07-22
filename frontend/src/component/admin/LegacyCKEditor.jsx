"use client";
import { useEffect, useRef } from "react";

export default function Editor({
  id = "editor1",
  onChange,
  value,
  disableImageUpload = false,
  height = null,
}) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const expressUploadUrl = `${url}upload`;

  const editorRef = useRef(null);
  useEffect(() => {
    const loadScripts = async () => {
      window.CKEDITOR_BASEPATH = "https://hoangak47.github.io/ckeditor/"; // ✅ tránh lỗi 404
      const ckeditorScript = document.createElement("script");
      ckeditorScript.src = "https://hoangak47.github.io/ckeditor/ckeditor.js";
      ckeditorScript.onload = () => {
        if (window.CKEDITOR && !window.CKEDITOR.instances[id]) {
          const config = {
            filebrowserUploadUrl: expressUploadUrl,
            filebrowserUploadMethod: "form",
            filebrowserImageUploadUrl: expressUploadUrl,
            removeDialogTabs: "link:upload;image:Upload",
            contentsCss:
              "https://cdn.ckeditor.com/4.16.2/standard-all/contents.css",
          };

          if (height) {
            config.height = height;
          }

          const editor = window.CKEDITOR.replace(id, config);

          editorRef.current = editor;

          editor.on("change", () => {
            const data = editor.getData();
            onChange && onChange(data);
          });

          editor.on("instanceReady", () => {
            if (disableImageUpload) return;

            const uploadButton = document.createElement("button");
            uploadButton.type = "button";
            uploadButton.textContent = "📤 Tải ảnh/video lên";
            uploadButton.style.marginBottom = "10px";
            uploadButton.style.padding = "6px 12px";
            uploadButton.style.background = "#4CAF50";
            uploadButton.style.color = "white";
            uploadButton.style.border = "none";
            uploadButton.style.borderRadius = "4px";
            uploadButton.style.cursor = "pointer";

            uploadButton.onclick = async () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*,video/*"; // ✅ chấp nhận cả ảnh và video

              input.onchange = async (e) => {
                const file = e.target?.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("upload", file); // ✅ tên field đúng

                try {
                  const res = await fetch(expressUploadUrl, {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();

                  if (data?.url) {
                    if (data.type.startsWith("image/")) {
                      editor.insertHtml(
                        `<img src="${data.url}" alt="${data.name}" style="max-width: 100%; margin: 10px 0;" />`
                      );
                    } else if (data.type.startsWith("video/")) {
                      editor.insertHtml(
                        `<video src="${data.url}" controls style="max-width: 100%; margin: 10px 0;" />`
                      );
                    } else {
                      alert("Loại file không được hỗ trợ.");
                    }
                  } else {
                    alert("Upload thất bại!");
                  }
                } catch (error) {
                  alert("Lỗi khi upload: " + error.message);
                }
              };

              input.click();
            };

            const editorContainer = document.getElementById(id)?.parentElement;
            if (editorContainer) {
              editorContainer.insertBefore(
                uploadButton,
                editorContainer.firstChild
              );
            }
          });
        }
      };

      document.body.appendChild(ckeditorScript);
    };

    loadScripts();
  }, [id, onChange]);

  useEffect(() => {
    if (
      editorRef.current &&
      value !== undefined &&
      value !== editorRef.current.getData()
    ) {
      editorRef.current.setData(value);
    }
  }, [value]);

  return (
    <div>
      <textarea id={id} defaultValue={value} />
    </div>
  );
}
