import { useEffect } from "react";
import {
    FaExclamationCircle,
    FaExpand,
    FaSpinner,
    FaVideo,
} from "react-icons/fa";
import { APP_CONFIG } from "../../utils/constants";

const VideoContainer = ({
    containerRef,
    isJoined,
    zegoError,
    zegoLoading,
    onFullscreen,
    onLeave,
    leaveButtonText,
}) => {
    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        const applyDOMFixes = () => {
            // 1. Color join link text
            const walker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            let textNode;
            while ((textNode = walker.nextNode())) {
                if (textNode.nodeValue && textNode.nodeValue.includes("join?roomId=")) {
                    const parent = textNode.parentElement;
                    if (parent && !parent.hasAttribute("data-link-colored")) {
                        parent.setAttribute("data-link-colored", "true");
                    }
                }
            }

            const linkElements = container.querySelectorAll("input, div, p, span, a");
            linkElements.forEach((el) => {
                if (
                    (el.value && el.value.includes("join?roomId=")) ||
                    (el.innerText && el.innerText.includes("join?roomId="))
                ) {
                    el.setAttribute("data-link-colored", "true");
                }
            });

            // Target the user name input in Zego preview and color it like the URL
            const allInputs = container.querySelectorAll("input");
            allInputs.forEach((input) => {
                if (!input.value?.includes("join?roomId=")) {
                    input.setAttribute("data-name-colored", "true");
                }
            });

            // 2. Keep participant name tags pinned cleanly to the bottom of each tile
            const treeWalker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
            let n;
            while ((n = treeWalker.nextNode())) {
                if (n.nodeValue && (n.nodeValue.includes("(You)") || n.parentElement?.querySelector("svg"))) {
                    const namePill = n.parentElement?.closest("div");
                    if (namePill && namePill !== container && namePill.parentElement) {
                        const style = window.getComputedStyle(namePill);
                        if (style.position === "absolute") {
                            namePill.style.setProperty("bottom", "8px", "important");
                            namePill.style.setProperty("top", "auto", "important");
                            namePill.style.setProperty("max-width", "90%", "important");
                        }
                    }
                }
            }
        };

        const observer = new MutationObserver(() => {
            applyDOMFixes();
        });

        observer.observe(container, { childList: true, subtree: true, characterData: true });
        applyDOMFixes();
        const intervalId = setInterval(applyDOMFixes, 800);

        return () => {
            observer.disconnect();
            clearInterval(intervalId);
        };
    }, [containerRef]);
    return (
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/[0.1] p-3 sm:p-6">
            <div className="flex flex-wrap items-center justify-between mb-4 pb-3 border-b border-white/[0.08] gap-3 relative z-20">
                <h2 className="text-base sm:text-xl font-bold text-white flex items-center tracking-tight flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mr-2.5 flex-shrink-0">
                        <FaVideo className="w-4 h-4 text-indigo-400" />
                    </div>
                    {APP_CONFIG.SESSION_CONTENT.VIDEO.TITLE}
                </h2>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto sm:ml-0 flex-shrink-0">
                    {isJoined && (
                        <span className="flex items-center text-xs text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 px-2.5 sm:px-3 py-1 rounded-full shadow-xs">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                            {APP_CONFIG.SESSION_CONTENT.VIDEO.CONNECTED}
                        </span>
                    )}

                    <button
                        onClick={onFullscreen}
                        className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-xl transition-all cursor-pointer hover:scale-105"
                    >
                        <FaExpand className="inline-block mr-1.5" />
                        {APP_CONFIG.SESSION_CONTENT.VIDEO.FULLSCREEN}
                    </button>
                </div>
            </div>

            {zegoError && (
                <div className="mb-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-2xl shadow-md">
                    <div className="flex items-center">
                        <FaExclamationCircle className="w-5 h-5 mr-3 flex-shrink-0 text-rose-400" />
                        <span className="text-sm font-medium">{zegoError}</span>
                    </div>
                </div>
            )}

            <div
                id="zego-video-container"
                ref={containerRef}
                className="w-full h-[520px] sm:h-[580px] lg:h-[620px] rounded-2xl overflow-hidden bg-slate-950 border border-white/[0.1] shadow-2xl relative"
                style={{
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    isolation: "isolate",
                }}
            />

            {zegoLoading && (
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center text-slate-400 text-sm font-medium">
                        <FaSpinner className="animate-spin h-4 w-4 mr-2 text-indigo-400" />
                        {APP_CONFIG.SESSION_CONTENT.VIDEO.CONNECTING}
                    </div>
                </div>
            )}

            {/* Leave button must remain accessible while on the call */}
            {onLeave && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onLeave}
                        className="px-8 py-3.5 font-bold text-white bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 rounded-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.35)] transition-all cursor-pointer text-sm sm:text-base"
                    >
                        {leaveButtonText || APP_CONFIG.SESSION_CONTENT.VIDEO.LEAVE_BUTTON}
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoContainer;
