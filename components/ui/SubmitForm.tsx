"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Simple SVG Icons for visual appeal without external dependencies
const UploadIcon = () => (
  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function SubmitForm() {
  // --- Original State ---
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("PYQ");
  const [file, setFile] = useState<File | null>(null);

  // --- New UI State ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  // Logic Flow (Preserved exactly as requested, just added Loading state wrapper)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF document.");

    try {
      setIsSubmitting(true); // Start Loading

      // Upload PDF to Storage
      const fileRef = ref(storage, `submissions/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // Save metadata in Firestore
      await addDoc(collection(db, "pending"), {
        title,
        subject,
        year,
        type,
        fileUrl,
        uploadedAt: Timestamp.now(),
      });

      alert("Submitted! Your submission is pending admin approval.");
      
      // Reset Form
      setTitle("");
      setSubject("");
      setYear("");
      setType("PYQ");
      setFile(null);

    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop Loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Contribute Material</h2>
          <p className="text-indigo-100 text-sm mt-1">Help your juniors by uploading PYQs or Assignments</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g. Mid-Sem Java Paper 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Subject & Year Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. DBMS"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year/Semester</label>
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="" disabled>Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <div className="flex gap-4 mt-1">
              {['PYQ', 'Assignment'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value={option}
                    checked={type === option}
                    onChange={(e) => setType(e.target.value)}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom File Upload Area */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
            <div className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
                file ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-400"
            }`}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                required={!file} // Only required if no file is set
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {file ? (
                <div className="flex items-center text-indigo-700 font-medium">
                  <FileIcon />
                  <span className="truncate max-w-[200px]">{file.name}</span>
                </div>
              ) : (
                <>
                  <UploadIcon />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF only (Max 5MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all 
              ${isSubmitting 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Submit Material"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}