import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaArchive, FaTrash } from "react-icons/fa";
import { FaPhone, FaComment } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";
const FriendDetails = () => {
    const { id } = useParams();
    const [friend, setFriend] = useState(null);

    const loadData = async () => {
        const res = await fetch("/Data.json");
        const data = await res.json();
        const found = data.find(f => f.id === parseInt(id));
        setFriend(found);
    };
    // eslint-disable-next-line react-hooks/set-state-in-render
    loadData();

    if (!friend) return <div className="text-center py-20">Loading...</div>;

    let statusColor = "";
    let statusText = "";

    if (friend.status === "overdue") {
        statusColor = "bg-red-500";
        statusText = "Overdue";
    } else if (friend.status === "almost due") {
        statusColor = "bg-yellow-400 text-black";
        statusText = "Almost Due";
    } else {
        statusColor = "bg-green-700";
        statusText = "On-Track";
    }

    return (
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                <img src={friend.picture} className="w-20 h-20 rounded-full mx-auto mb-3" />
                <h2 className="text-xl font-semibold">{friend.name}</h2>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${statusColor}`}>
                    {statusText}
                </span>
                <div className="mt-3 flex justify-center gap-2 flex-wrap">
                    {
                        friend.tags.map((tag, i) => (
                            <span key={i} className="badge badge-success">{tag.toUpperCase()}</span>
                        ))
                    }
                </div>
                <p className="text-gray-500 mt-4 italic">"{friend.bio}"</p>
                <p className="text-sm text-gray-500 mt-2">{friend.email}</p>
                <div className="mt-6 space-y-3">
                    <button className="btn w-full flex gap-2"><FaClock /> Snooze 2 Weeks</button>
                    <button className="btn w-full flex gap-2"><FaArchive /> Archive</button>
                    <button className="btn w-full flex gap-2 text-red-500"><FaTrash /> Delete</button>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold">{friend.days_since_contact}</h2>
                        <p className="text-gray-500">Days Since Contact</p>
                    </div>
                    <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold">{friend.goal}</h2>
                        <p className="text-gray-500">Goal (Days)</p>
                    </div>
                    <div className="bg-base-100 shadow rounded-xl p-6 text-center">
                        <h2 className="text-xl font-bold">{friend.next_due_date}</h2>
                        <p className="text-gray-500">Next Due</p>
                    </div>

                </div>

                <div className="bg-base-100 shadow rounded-xl p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Relationship Goal</h3>
                        <p className="text-gray-500">
                            Connect every <span className="font-bold">{friend.goal} days</span>
                        </p>
                    </div>
                    <button className="btn btn-sm">Edit</button>
                </div>

                <div className="bg-base-100 shadow rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Check-In</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="btn h-18 flex flex-col items-center justify-center gap-2">
                            <FaPhone className="text-xl" />
                            Call
                        </button>
                        <button className="btn h-18 flex flex-col items-center justify-center gap-2">
                            <FaComment className="text-xl" />
                            Text
                        </button>
                        <button className="btn h-18 flex flex-col items-center justify-center gap-2">
                            <CiVideoOn className="text-xl" /> Video
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default FriendDetails;