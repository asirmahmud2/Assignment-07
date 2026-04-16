import React, { useContext, useState } from "react";
import { TimelineContext } from "../Context/TimelineContext";
import { FaPhone, FaComment } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";

const Timeline = () => {
    const { timeline } = useContext(TimelineContext);
    const [filter, setFilter] = useState("ALL");
    let filtered = [];
    for (let i = 0; i < timeline.length; i++) {
        if (filter === "ALL") {
            filtered.push(timeline[i]);
        } else {
            if (timeline[i].type === filter) {
                filtered.push(timeline[i]);
            }
        }
    }
    const getIcon = (type) => {
        if (type === "Call") return <FaPhone className="text-xl" />;
        else if (type === "Text") return <FaComment className="text-xl" />;
        else return <CiVideoOn className="text-xl" />;
    };
    return (
        <div className="container mx-auto px-4 py-10">

            <h1 className="text-3xl font-bold mb-6">Timeline</h1>

            <select
                className="select select-bordered mb-6"
                onChange={(e) => setFilter(e.target.value)}
            >
                <option>ALL</option>
                <option>Call</option>
                <option>Text</option>
                <option>Video</option>
            </select>
            <div className="space-y-4">
                {
                    filtered.map(item => (
                        <div key={item.id} className="bg-base-100 shadow rounded-xl p-4 flex items-center gap-4">
                            <div className="text-2xl">
                                {getIcon(item.type)}
                            </div>
                            <div>
                                <h2 className="font-semibold">
                                    {item.title}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>


        </div>
    );
};

export default Timeline;