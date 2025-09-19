"use client";

import FormSchema from "@/component/admin/formSchema";
import FormSEO from "@/component/admin/formSEO";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";
import React, { act } from "react";

import NoImage from "@/assets/images/noimage.png";
import HandleAction from "@/component/admin/handleActionContent";
import axios from "axios";
import MultipleImage from "@/component/admin/multipleImage";

export default function page() {
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: NoImage.src,
    url: "",
    type: "san-pham",
    parent_category: "",
    active: true,
    SEO_title: "",
    SEO_description: "",
    SEO_keywords: "",
    SEO_image: NoImage.src,
    schema: "",
  });

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  const [options, setOptions] = React.useState([
    { label: "Sản phẩm", value: "san-pham" },
    { label: "Ngành Nghề", value: "nganh-nghe" },
    { label: "Gia Công", value: "gia-cong" },
  ]);
  const [options1, setOptions1] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${url}danh-muc`).then((response) => {
      const mapped = response.data.map((item) => ({
        value: item.url, // hoặc item.id nếu bạn muốn
        label: item.title,
      }));
      setOptions1(mapped);
    });
  }, []);

  const [selectOptions, setSelectOptions] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${url}danh-muc?search=${selectOptions}`).then((response) => {
      const mapped = response.data.map((item) => ({
        value: item.url,
        label: item.title,
      }));
      setOptions1(mapped);
    });
  }, [selectOptions]);

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${url}san-pham`}
            data={data}
            redirectTo={"/admin/san-pham"}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
            short_description_input="textarea"
          >
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
              <div className="px-5 py-3 border-b border-gray-300">
                <h2 className="text-gray-700 font-semibold text-base">
                  Danh mục sản phẩm
                </h2>
              </div>
              <form className="p-5">
                <label
                  htmlFor="category"
                  className="block text-gray-700 mb-2 text-sm font-normal"
                >
                  Danh mục cấp 1:
                </label>

                <select
                  className="w-full px-[15px] py-[12px] border border-gray-300 rounded-md text-sm text-gray-800 bg-white cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  value={data.parent_category}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      parent_category: e.target.value,
                    }));
                    setSelectOptions(e.target.value);
                  }}
                >
                  <option value="">Tất cả danh mục</option>
                  {options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="category"
                  className="block text-gray-700 mb-2 text-sm font-normal"
                >
                  Danh mục cấp 2:
                </label>
                <select
                  className="w-full px-[15px] py-[12px] border border-gray-300 rounded-md text-sm text-gray-800 bg-white cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  value={data.parent_category}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      parent_category: e.target.value,
                    }))
                  }
                >
                  <option value="">Tất cả danh mục</option>
                  {/* {options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                  {options1.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </RenderMainContentFields>

          <FormSEO data={data} setData={setData} handleChange={handleChange} />
          <FormSchema
            data={data}
            setData={setData}
            handleChange={handleChange}
          />
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${url}san-pham`}
            data={data}
            redirectTo={"/admin/san-pham"}
          />
        </div>
      </div>
    </div>
  );
}
