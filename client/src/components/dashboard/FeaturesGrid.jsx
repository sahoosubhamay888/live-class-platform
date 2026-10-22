import { APP_CONFIG } from "../../utils/constants";
import { FaComments, FaShieldAlt, FaUsers, FaVideo } from "react-icons/fa";

const iconMap = {
    FaVideo: FaVideo,
    FaComments: FaComments,
    FaShieldAlt: FaShieldAlt,
    FaUsers: FaUsers,
};

const colorMap = {
    blue: "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    purple: "bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    indigo: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]",
};

const FeaturesGrid = () => {
    const features = APP_CONFIG.FEATURES.slice(0, 4);
    return (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
                    <div
                        key={index}
                        className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.2] hover:-translate-y-1 transition-all duration-300 shadow-xl group"
                    >
                        <div
                            className={`w-12 h-12 ${colorMap[feature.color] || colorMap.indigo} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                        >
                            {IconComponent && <IconComponent className="w-6 h-6" />}
                        </div>
                        <h4 className="font-bold text-white text-base mb-2 tracking-tight">
                            {feature.title}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            {feature.shortDescription}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default FeaturesGrid;