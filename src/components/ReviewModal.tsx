import { X } from "lucide-react";
import Rating from "./Rating";

interface ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({ onClose }: ReviewModalProps) {
  return (
    <div className="fixed flex flex-col gap-2 inset-0 items-center justify-center z-50">
      <button className="backdrop-blur-lg backdrop-filter bg-opacity-70 bg-white flex justify-center p-4 rounded-full z-10" onClick={onClose}>
        <X size={24} className="cursor-pointer stroke-east-bay-700" />
      </button>
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-80 bg-white flex flex-col h-[400px] p-3 relative rounded-lg shadow-lg w-[600px] z-10">
        <h1 className="bg-clip-text bg-gradient-to-l font-sans font-semibold from-malachite-400 p-3 text-2xl text-transparent to-east-bay-500">Share your thoughts </h1>
        <div className="flex flex-row gap-2 p-3">
          <span className="font-sans font-semibold text-bunker-800 text-lg">Your rating</span>
          <Rating />
        </div>
        <textarea
          className="bg-transparent border-2 border-east-bay-900 focus:border-malachite-400 p-3 rounded-lg text-bunker-900 w-full"
          placeholder="Write your review here..."
          rows={9}
        ></textarea>
        <div className="align-middle bg-slate-500 flex flex-col items-end justify-start p-2 rounded-lg">
          <button className="bg-east-bay-800 p-2 rounded-lg text-white">Send</button>
        </div>
      </div>
      <div className="bg-bunker-950 fixed inset-0 opacity-50"></div>
    </div >
  );
}