"use client";

import { useState, useRef } from "react";
import {
  IconPhotosOutline24,
  IconBallotRectOutline24,
  IconCalendarPlusOutline24,
} from "nucleo-core-outline-24";

interface PostComposerProps {
  placeholder?: string;
  onPost?: (content: string) => void;
  avatar?: string;
  initials?: string;
}

export function PostComposer({
  placeholder = "Share with the community...",
  onPost,
  avatar,
  initials = "JS"
}: PostComposerProps) {
  const [composerFocused, setComposerFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [composerMode, setComposerMode] = useState<"text" | "poll" | "event">("text");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePost = () => {
    const content = textareaRef.current?.value.trim();
    if (content && onPost) {
      onPost(content);
    }
    if (textareaRef.current) textareaRef.current.value = "";
    setHasText(false);
    setComposerFocused(false);
    setComposerMode("text");
  };

  const handleCancel = () => {
    if (textareaRef.current) textareaRef.current.value = "";
    setHasText(false);
    setComposerFocused(false);
    setComposerMode("text");
  };

  return (
    <div className="px-4 py-3 border-b border-border">
      {/* Row 1: Avatar and Text */}
      <div className="flex gap-3">
        {/* Col 1: Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt="You"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-medium flex-shrink-0">
            {initials}
          </div>
        )}

        {/* Col 2: Text with top padding to center first line with avatar */}
        <div className="flex-1 pt-2 min-w-0">
          <textarea
            ref={textareaRef}
            onFocus={() => setComposerFocused(true)}
            onChange={(e) => {
              const newHasText = e.target.value.trim().length > 0;
              if (newHasText !== hasText) setHasText(newHasText);
            }}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none focus:outline-none focus:ring-0 border-none leading-6"
            style={{ fieldSizing: "content", maxWidth: "100%" } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Row 2: Action buttons (left) and Cancel/Post (right) */}
      {(composerFocused || hasText) && (
        <div className="flex items-center justify-between mt-3 ml-[52px]">
          <div className="flex gap-2">
            {/* Image button */}
            <button
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Add image"
            >
              <IconPhotosOutline24 className="w-5 h-5" />
            </button>

            {/* Poll button */}
            <button
              onClick={() => setComposerMode(composerMode === "poll" ? "text" : "poll")}
              className={`p-2 rounded-full transition-colors ${
                composerMode === "poll"
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              title="Add poll"
            >
              <IconBallotRectOutline24 className="w-5 h-5" />
            </button>

            {/* Event button */}
            <button
              onClick={() => setComposerMode(composerMode === "event" ? "text" : "event")}
              className={`p-2 rounded-full transition-colors ${
                composerMode === "event"
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              title="Create event"
            >
              <IconCalendarPlusOutline24 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {/* Cancel button */}
            <button
              onClick={handleCancel}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Post button */}
            <button
              onClick={handlePost}
              disabled={!hasText}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
