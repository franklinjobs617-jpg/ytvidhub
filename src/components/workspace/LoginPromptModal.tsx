"use client";

import { X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Unlock Full Access</h2>
          </div>
          <p className="text-sm text-blue-100">You've used your free trial!</p>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Sign up now to continue downloading subtitles and unlock premium features:
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span className="text-sm text-gray-600">Unlimited subtitle downloads</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span className="text-sm text-gray-600">AI-powered summaries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span className="text-sm text-gray-600">Batch download playlists</span>
            </li>
          </ul>

          <div className="flex gap-3">
            <button
              onClick={() => router.push('/register')}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 font-medium"
            >
              Sign Up Free
            </button>
            <button
              onClick={() => router.push('/login')}
              className="flex-1 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
