import React, { useState } from "react";
import { ArrowLeft, MoreVertical, Edit, X, ChevronDown, ChevronRight } from "lucide-react";

const AccordionSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border rounded bg-gray-50">
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100"
            >
                {title}
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
            </button>

            {/* Body */}
            {isOpen && <div className="px-4 py-3 text-sm text-gray-700">{children}</div>}
        </div>
    );
};

const CustomerPreviewPage = ({ customerData, onClose, onDelete }) => {
    const [activeTab, setActiveTab] = useState("overview");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    if (!customerData) return null;

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments([{ text: newComment, date: new Date() }, ...comments]);
        setNewComment("");
    };

    return (
        <section className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                        <ArrowLeft size={20} />
                    </button>
                    <h3 className="text-xl font-semibold truncate">
                        {customerData.companyName ||
                            `${customerData.firstName} ${customerData.lastName}`}
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-1">
                        <Edit size={16} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(customerData._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                        <MoreVertical size={20} />
                    </button>
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b flex space-x-6 px-4 bg-gray-50">
                {["overview", "comments", "transactions", "mails", "statement"].map(
                    (tab) => (
                        <button
                            key={tab}
                            className={`py-2 text-sm font-medium ${activeTab === tab
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    )
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* ---------------- Overview ---------------- */}
                {activeTab === "overview" && (
                    <div className="space-y-4">
                        <AccordionSection title="Billing Address">
                            {customerData.billingAddress ? (
                                <div>
                                    <p>{customerData.billingAddress.address1}</p>
                                    <p>
                                        {customerData.billingAddress.city}, {customerData.billingAddress.state},{" "}
                                        {customerData.billingAddress.country} - {customerData.billingAddress.pincode}
                                    </p>
                                </div>
                            ) : (
                                <p>Not provided</p>
                            )}
                        </AccordionSection>

                        <AccordionSection title="Shipping Address">
                            {customerData.shippingAddress ? (
                                <div>
                                    <p>{customerData.shippingAddress.address1}</p>
                                    <p>
                                        {customerData.shippingAddress.city}, {customerData.shippingAddress.state},{" "}
                                        {customerData.shippingAddress.country} - {customerData.shippingAddress.pincode}
                                    </p>
                                </div>
                            ) : (
                                <p>Not provided</p>
                            )}
                        </AccordionSection>


                        <AccordionSection title="Tax Information">
                            <p>
                                <strong>GST:</strong> {customerData.gstNumber || "N/A"}
                            </p>
                            <p>
                                <strong>PAN:</strong> {customerData.panNumber || "N/A"}
                            </p>
                        </AccordionSection>

                        {customerData.contactPersons?.length > 0 && (
                            <AccordionSection title="Contact Persons">
                                <ul className="list-disc pl-5">
                                    {customerData.contactPersons.map((person, idx) => (
                                        <li key={idx}>
                                            {person.name} — {person.email} ({person.phone})
                                        </li>
                                    ))}
                                </ul>
                            </AccordionSection>
                        )}
                    </div>
                )}

                {/* ---------------- Comments ---------------- */}
                {activeTab === "comments" && (
                    <div>
                        {/* Comment Box */}
                        <div className="border rounded mb-4">
                            <div className="bg-gray-100 px-3 py-2 flex gap-2 text-sm">
                                <button className="font-bold">B</button>
                                <button className="italic">I</button>
                                <button className="underline">U</button>
                            </div>
                            <textarea
                                rows="3"
                                className="w-full p-3 focus:outline-none"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="border-t px-3 py-2">
                                <button
                                    onClick={handleAddComment}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                >
                                    Add Comment
                                </button>
                            </div>
                        </div>

                        {/* Comment List */}
                        <h4 className="font-semibold text-gray-700 mb-2">All Comments</h4>
                        {comments.length > 0 ? (
                            <ul className="space-y-3">
                                {comments.map((c, idx) => (
                                    <li
                                        key={idx}
                                        className="p-3 border rounded bg-white shadow-sm"
                                    >
                                        <p>{c.text}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {c.date.toLocaleString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>
                )}

                {/* ---------------- Transactions ---------------- */}
                {activeTab === "transactions" && (
                    <div className="text-gray-500">Transactions will appear here.</div>
                )}

                {/* ---------------- Mails ---------------- */}
                {activeTab === "mails" && (
                    <div className="text-gray-500">No mails found.</div>
                )}

                {/* ---------------- Statement ---------------- */}
                {activeTab === "statement" && (
                    <div className="text-gray-500">Statement data coming soon.</div>
                )}
            </div>
        </section>
    );
};

export default CustomerPreviewPage;
