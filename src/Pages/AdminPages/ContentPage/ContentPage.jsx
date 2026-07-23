import { X, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useContent from "../../../components/hook/useContent";
import apiClient from "../../../lib/api-client";

const ContentPage = () => {
  const { content, loading, error: fetchError, refetch } = useContent();
  const [bannerPreview, setBannerPreview] = useState(null);
  const [offerPreview, setOfferPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [offerFile, setOfferFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const bannerInput = useRef(null);
  const offerInput = useRef(null);

  useEffect(() => {
    setBannerPreview(content?.banner_image || null);
    setOfferPreview(content?.offer_file || null);
    setBannerFile(null);
    setOfferFile(null);
  }, [content]);

  const getPreviewSrc = (preview) => {
    if (!preview) return "";
    return preview.startsWith("http") ? preview : `https://api.simfrii.com${preview}`;
  };

  const openFilePicker = (type) => {
    if (type === "banner") {
      bannerInput.current?.click();
    } else {
      offerInput.current?.click();
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);
    setIsUploading(true);

    const fileSizeMB = file.size / (1024 * 1024);
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      setIsUploading(false);
      return;
    }

    if (fileSizeMB > 5) {
      setError("Image size must be less than 5MB.");
      setIsUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "banner") {
        setBannerPreview(e.target.result);
        setBannerFile(file);
      } else {
        setOfferPreview(e.target.result);
        setOfferFile(file);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError("Unable to read the selected image.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!bannerPreview && !offerPreview) {
      setError("Please upload at least one image before saving.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      if (bannerFile) {
        formData.append("banner_image", bannerFile);
      }
      if (offerFile) {
        formData.append("offer_file", offerFile);
      }

      await apiClient.patch("/content/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Content updated successfully.");
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update content.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Content Management</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Upload and edit the banner and offer images for your landing page. Only images are accepted, and each file must be under 5MB.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_20px_80px_rgba(14,24,39,0.06)]">
        {fetchError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {isUploading && (
          <div className="mb-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            Saving changes...
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Banner Image</h2>
                <p className="mt-1 text-sm text-gray-500">Recommended size: 1200×500. PNG or JPG.</p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Image only</span>
            </div>

            <div className="relative rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-5 min-h-[240px] flex items-center justify-center">
              {bannerPreview ? (
                <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-sm">
                  <img
                    src={getPreviewSrc(bannerPreview)}
                    alt="Banner preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-between gap-3 bg-black/30 px-4 py-3 text-white">
                    <button
                      type="button"
                      onClick={() => openFilePicker("banner")}
                      className="rounded-full bg-white/15 px-3 py-2 text-sm transition hover:bg-white/25"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBannerPreview(null);
                        setBannerFile(null);
                      }}
                      className="rounded-full bg-white/15 px-3 py-2 text-sm transition hover:bg-white/25"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openFilePicker("banner")}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-sm text-gray-500 transition hover:border-purple-400 hover:bg-purple-50"
                >
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="font-medium text-gray-900">Upload banner image</span>
                  <span className="text-xs text-gray-500">PNG, JPG, JPEG — max 5MB</span>
                </button>
              )}
            </div>

            <input
              ref={bannerInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "banner")}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Offer Image</h2>
                <p className="mt-1 text-sm text-gray-500">Recommended size: 800×800. PNG or JPG.</p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Image only</span>
            </div>

            <div className="relative rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-5 min-h-[240px] flex items-center justify-center">
              {offerPreview ? (
                <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-sm">
                  <img
                    src={getPreviewSrc(offerPreview)}
                    alt="Offer preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-between gap-3 bg-black/30 px-4 py-3 text-white">
                    <button
                      type="button"
                      onClick={() => openFilePicker("offer")}
                      className="rounded-full bg-white/15 px-3 py-2 text-sm transition hover:bg-white/25"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOfferPreview(null);
                        setOfferFile(null);
                      }}
                      className="rounded-full bg-white/15 px-3 py-2 text-sm transition hover:bg-white/25"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openFilePicker("offer")}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-sm text-gray-500 transition hover:border-purple-400 hover:bg-purple-50"
                >
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="font-medium text-gray-900">Upload offer image</span>
                  <span className="text-xs text-gray-500">PNG, JPG, JPEG — max 5MB</span>
                </button>
              )}
            </div>

            <input
              ref={offerInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "offer")}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={refetch}
            disabled={isUploading}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isUploading}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
          >
            {isUploading ? "Saving..." : "Save Content"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
