"use client";

import FormSchema from "@/component/admin/formSchema";
import FormSEO from "@/component/admin/formSEO";
import RenderMainContentFields from "@/component/admin/renderMainContentFields";
import React, { use } from "react";

import NoImage from "@/assets/images/noimage.png";
import HandleAction from "@/component/admin/handleActionContent";
import axios from "axios";
import MultipleImage from "@/component/admin/multipleImage";

export default function page({ params }) {
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: NoImage.src,
    url: "",
    parent_category: "",
    active: true,
    SEO_title: "",
    SEO_description: "",
    SEO_keywords: "",
    SEO_image: NoImage.src,
    schema: "",
  });

  const { id } = use(params);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}danh-muc/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData({});
      });
  }, []);

  const handleChange = (key) => (value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const [options, setOptions] = React.useState([
    { value: "Sản phẩm", label: "san-pham" },
    { value: "Ngành Nghề", label: "nganh-nghe" },
    { value: "Gia Công", label: "gia-cong" },
  ]);

  return (
    <div className="bg-[#f8f9fc] text-[#3a3a3a] font-sans text-sm leading-relaxed overflow-y-auto">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="p-6 space-y-6">
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${process.env.NEXT_PUBLIC_API_URL}danh-muc`}
            data={data}
            id={id}
          />

          <RenderMainContentFields
            data={data}
            setData={setData}
            handleChange={handleChange}
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
                <div className="relative">
                  <input
                    id="category"
                    list="categories"
                    placeholder="Danh mục cấp 1"
                    className="w-full border border-red-600 rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-invalid="true"
                    aria-describedby="category-error"
                    defaultValue={
                      options.find((opt) => opt.label === data?.parent_category)
                        ?.value || ""
                    }
                    onChange={(e) => {
                      const selectedText = e.target.value;
                      const matchedOption = options.find(
                        (opt) => opt.value === selectedText
                      );
                      if (matchedOption) {
                        setData((prev) => ({
                          ...prev,
                          parent_category: matchedOption.label,
                        }));
                      }
                    }}
                  />
                  <datalist id="categories">
                    {options.map((option, index) => (
                      <option
                        key={index}
                        value={option.value}
                        data-value={option.label}
                      >
                        {option.value}
                      </option>
                    ))}
                  </datalist>
                </div>
              </form>
            </div>
          </RenderMainContentFields>

          <MultipleImage
            initialData={data?.multiple_image || []}
            setData={setData}
          />

          <FormSEO data={data} setData={setData} handleChange={handleChange} />
          <FormSchema
            data={data}
            setData={setData}
            handleChange={handleChange}
          />
          <HandleAction
            initialData={data}
            setData={setData}
            url={`${process.env.NEXT_PUBLIC_API_URL}danh-muc`}
            data={data}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}
