import React from "react";
import { Link } from "react-router-dom";

const FriendCard = ({ friend }) => {

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
    <Link to={`/friend/${friend.id}`}>
      <div className="bg-base-100 shadow rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition">
        <img src={friend.picture} className="w-16 h-16 rounded-full mx-auto mb-3"/>
        <h3 className="font-semibold text-lg">{friend.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {friend.days_since_contact}d ago
        </p>

        <div className="flex justify-center flex-wrap gap-2 mb-3">
          {friend.tags.map((tag, ind) => (
            <span key={ind} className="badge badge-success badge-sm">
              {tag}
            </span>
          ))}
        </div>

        <span className={`text-white px-3 py-1 rounded-full text-sm ${statusColor}`}>
          {statusText}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;