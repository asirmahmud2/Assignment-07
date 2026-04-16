import React, { useContext } from "react";
import { TimelineContext } from "../Context/TimelineContext";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const Stats = () => {
    const { timeline } = useContext(TimelineContext);

    let call = 0;
    let text = 0;
    let video = 0;
    for (let i = 0; i < timeline.length; i++) {
        if (timeline[i].type === "Call") call++;
        else if (timeline[i].type === "Text") text++;
        else if (timeline[i].type === "Video") video++;
    }
    const data = [
        { name: "Text", value: text },
        { name: "Call", value: call },
        { name: "Video", value: video }
    ];
    const COLORS = ["#7c3aed", "#1f5f3b", "#22c55e"];
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-8">
                Friendship Analytics
            </h1>

            <div className="bg-base-100 shadow rounded-xl p-8">
                <h2 className="text-lg font-semibold mb-6">
                    By Interaction Type
                </h2>
                <div className="flex justify-center">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >

                            {
                                data.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))
                            }


                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>


        </div>
    );
};

export default Stats;