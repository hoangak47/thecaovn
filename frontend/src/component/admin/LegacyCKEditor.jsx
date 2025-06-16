"use client";
import { useEffect } from "react";

export default function Editor({ id = "editor1", onChange, value }) {
  const expressUploadUrl = "http://localhost:5000/upload/image";

  useEffect(() => {
    const loadScripts = async () => {
      const ckeditorScript = document.createElement("script");
      ckeditorScript.src = "https://hoangak47.github.io/ckeditor/ckeditor.js";
      ckeditorScript.onload = () => {
        if (window.CKEDITOR && !window.CKEDITOR.instances[id]) {
          const editor = window.CKEDITOR.replace(id, {
            filebrowserUploadUrl: expressUploadUrl,
            filebrowserUploadMethod: "form",
            filebrowserImageUploadUrl: expressUploadUrl,
            removeDialogTabs: "link:upload;image:Upload",
            contentsCss:
              "https://cdn.ckeditor.com/4.16.2/standard-all/contents.css",
          });

          editor.on("change", () => {
            const data = editor.getData();
            onChange && onChange(data);
          });

          editor.on("paste", async (evt) => {
            const items = evt.data.dataTransfer.getData("text/html") || "";
            const itemsFiles = evt.data.dataTransfer._.files;

            if (itemsFiles && itemsFiles.length > 0) {
              evt.stop(); // Prevent default paste behavior

              for (const file of itemsFiles) {
                if (file.type.startsWith("image/")) {
                  const formData = new FormData();
                  formData.append("upload", file);

                  try {
                    const res = await fetch(expressUploadUrl, {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();
                    if (data?.url) {
                      editor.insertHtml(
                        `<img src="${data.url}" style="max-width:100%;" />`
                      );
                    } else {
                      alert("Upload hình ảnh thất bại!");
                    }
                  } catch (error) {
                    alert("Lỗi khi upload hình ảnh: " + error.message);
                  }
                }
              }
            }
          });

          editor.on("instanceReady", () => {
            const uploadButton = document.createElement("button");
            uploadButton.type = "button";
            uploadButton.textContent = "📤 Tải ảnh lên nhanh";
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
              input.accept = "image/*";

              input.onchange = async (e) => {
                const file = e.target?.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("upload", file);

                const res = await fetch(expressUploadUrl, {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                if (data?.url) {
                  editor.insertHtml(
                    `<img src="${data.url}" style="max-width:100%;" />`
                  );
                } else {
                  alert("Upload thất bại!");
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

  return (
    <div>
      <textarea id={id} defaultValue={value} />
    </div>
  );
}
