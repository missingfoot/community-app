"use client";

import { useState, useRef } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { IconHeartOutline24, IconMessageOutline24 } from "nucleo-core-outline-24";
import { IconHeartFill24, IconPinTackFill24 } from "nucleo-core-fill-24";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  // Generate a hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use hash to generate HSL values
  // Hue: full range (0-360)
  const hue = Math.abs(hash) % 360;
  // Saturation: 25-40% for muted look
  const saturation = 25 + (Math.abs(hash >> 8) % 15);
  // Lightness: 82-90% for light backgrounds
  const lightness = 82 + (Math.abs(hash >> 16) % 8);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 53 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M53 46.666L26.5 62L0 46.666V16.003L26.5 31.333L53 16V26.224L26.5 41.554L10.209 32.128V42.362L26.499 51.771L53 36.44V46.666Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 11.986L26.506 24L46 11.984L26.506 0L20.033 3.983L33.013 11.986L26.5 15.985L13.502 7.983L7 11.986Z" fill="currentColor"/>
    </svg>
  );
}

const initialFeedItems = [
  {
    id: 0,
    author: "Building Announcement",
    time: "30m ago",
    content: "The elevator in the east wing is currently out of service due to a mechanical issue. Engineers have been called and we expect it to be fixed by tomorrow morning. Please use the west wing elevator or stairs in the meantime. We apologize for the inconvenience.",
    likes: 2,
    comments: 4,
    isBuilding: true,
  },
  {
    id: 1,
    author: "Rachel Torres",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "1h ago",
    content: "Hey everyone! Reminder that our monthly rooftop BBQ is this Saturday at 5pm. We'll have the grill going and drinks provided. Bring a side dish to share if you can! 🍔",
    likes: 34,
    comments: 12,
    isStaff: true,
  },
  {
    id: 2,
    author: "Tom Bradley",
    time: "3h ago",
    content: "Anyone up for a coffee run? Heading to Ground Floor in 15 mins. Happy to grab orders for anyone on floors 3-5!",
    likes: 8,
    comments: 6,
  },
  {
    id: 3,
    author: "Maya Patel",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    time: "5h ago",
    content: "The coworking space on 2nd floor is looking great after the refresh! Love the new plants and the standing desks. Thanks to the team for listening to our feedback.",
    likes: 52,
    comments: 8,
  },
  {
    id: 4,
    author: "Alex Kim",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    time: "7h ago",
    content: "Quick heads up - I'm hosting a dinner party in the community kitchen tonight at 7pm. Making Korean BBQ! Drop by if you're around, plenty of food for everyone.",
    likes: 41,
    comments: 15,
  },
  {
    id: 5,
    author: "Jordan Mills",
    time: "9h ago",
    content: "Lost my airpods somewhere between the gym and the 4th floor lounge. Black case with a small scratch. Let me know if anyone finds them! 🙏",
    likes: 5,
    comments: 11,
  },
  {
    id: 6,
    author: "Nina Okonkwo",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    time: "12h ago",
    content: "Just moved into unit 312! Super excited to be part of this community. Would love to meet neighbors - feel free to say hi if you see me around!",
    likes: 67,
    comments: 24,
  },
];

export default function Home() {
  const [posts, setPosts] = useState(initialFeedItems);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(initialFeedItems.map((item) => [item.id, item.likes]))
  );
  const [composerFocused, setComposerFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePost = () => {
    const content = textareaRef.current?.value.trim();
    if (!content) return;

    const newPost = {
      id: Date.now(),
      author: "James Sparkes",
      time: "Just now",
      content,
      likes: 0,
      comments: 0,
    };

    // Insert after pinned posts
    const pinnedPosts = posts.filter((p) => p.isBuilding);
    const unpinnedPosts = posts.filter((p) => !p.isBuilding);
    setPosts([...pinnedPosts, newPost, ...unpinnedPosts]);
    setLikeCounts((counts) => ({ ...counts, [newPost.id]: 0 }));
    if (textareaRef.current) textareaRef.current.value = "";
    setHasText(false);
    setComposerFocused(false);
  };

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setLikeCounts((counts) => ({ ...counts, [postId]: counts[postId] - 1 }));
      } else {
        newSet.add(postId);
        setLikeCounts((counts) => ({ ...counts, [postId]: counts[postId] + 1 }));
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar title="Announcements" />
      <div className="border-b border-border" />

      <main className="flex-1 overflow-auto pb-4">
        {/* Post Something Bar */}
        <div className="px-4 py-3 border-b border-border">
          {/* Row 1: Avatar and Text */}
          <div className="flex gap-3">
            {/* Col 1: Avatar */}
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-medium flex-shrink-0">
              JS
            </div>

            {/* Col 2: Text with top padding to center first line with avatar */}
            <div className="flex-1 pt-2 min-w-0">
              <textarea
                ref={textareaRef}
                onFocus={() => setComposerFocused(true)}
                onChange={(e) => {
                  const newHasText = e.target.value.trim().length > 0;
                  if (newHasText !== hasText) setHasText(newHasText);
                }}
                placeholder="Post an announcement..."
                rows={1}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none focus:outline-none focus:ring-0 border-none leading-6"
                style={{ fieldSizing: "content", maxWidth: "100%" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Row 2: Cancel/Post buttons - aligned right */}
          {(composerFocused || hasText) && (
            <div className="flex items-center justify-end mt-3 ml-[52px]">
              <div className="flex gap-2 items-center">
                {/* Cancel button */}
                <button
                  onClick={() => {
                    if (textareaRef.current) textareaRef.current.value = "";
                    setHasText(false);
                    setComposerFocused(false);
                  }}
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

        {/* Feed */}
        <div className="divide-y divide-border">
          {posts.map((item) => (
            <article key={item.id} className="px-4 py-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                {item.isBuilding ? (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <BrandLogo className="w-6 h-6 text-primary-foreground" />
                  </div>
                ) : item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="flex-shrink-0 w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ backgroundColor: getAvatarColor(item.author), color: '#4a4a4a' }}
                  >
                    {getInitials(item.author)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">
                        {item.author}
                      </span>
                      {item.isStaff && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <BrandLogo className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                      {item.isBuilding && (
                        <IconPinTackFill24 className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>

                  {/* Content */}
                  <p className="mt-0.5 text-foreground leading-relaxed">
                    {item.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-8 mt-3">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        likedPosts.has(item.id)
                          ? "text-red-500"
                          : "text-muted-foreground hover:text-accent"
                      }`}
                    >
                      {likedPosts.has(item.id) ? (
                        <IconHeartFill24 className="w-5 h-5" />
                      ) : (
                        <IconHeartOutline24 className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">{likeCounts[item.id]}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                      <IconMessageOutline24 className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
