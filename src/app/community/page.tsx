"use client";

import { useState, useRef } from "react";
import { TopBar, BottomNav, TabNav, GroupCard, MyGroupCard } from "@/components";
import { Group, MyGroup } from "@/types";
import {
  IconHeartOutline24,
  IconMessageOutline24,
  IconPhotosOutline24,
  IconBallotRectOutline24,
  IconCalendarPlusOutline24,
} from "nucleo-core-outline-24";
import { IconHeartFill24 } from "nucleo-core-fill-24";

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

// Sample groups data
const sampleGroups: Group[] = [
  {
    id: "1",
    name: "Rooftop BBQ Crew",
    description: "Monthly rooftop gatherings and grilling sessions",
    category: "social",
    memberCount: 47,
    isPrivate: false,
  },
  {
    id: "2",
    name: "Morning Yoga",
    description: "Daily 6AM yoga sessions in the wellness room",
    category: "fitness",
    memberCount: 23,
    isPrivate: false,
  },
  {
    id: "3",
    name: "Remote Workers Network",
    description: "Coworking meetups and productivity tips",
    category: "professional",
    memberCount: 89,
    isPrivate: false,
  },
  {
    id: "4",
    name: "Board Game Nights",
    description: "Weekly game nights every Thursday",
    category: "hobbies",
    memberCount: 31,
    isPrivate: false,
  },
  {
    id: "5",
    name: "Community Kitchen Club",
    description: "Share recipes and host communal dinners",
    category: "food",
    memberCount: 56,
    isPrivate: false,
  },
  {
    id: "6",
    name: "Meditation & Mindfulness",
    description: "Weekly guided meditation sessions",
    category: "wellness",
    memberCount: 18,
    isPrivate: false,
  },
];

// Sample user's groups
const sampleMyGroups: MyGroup[] = [
  {
    id: "1",
    name: "Rooftop BBQ Crew",
    description: "Monthly rooftop gatherings and grilling sessions",
    category: "social",
    memberCount: 47,
    isPrivate: false,
    role: "manager",
    joinedAt: "2024-01-15",
    hasUnread: true,
  },
  {
    id: "3",
    name: "Remote Workers Network",
    description: "Coworking meetups and productivity tips",
    category: "professional",
    memberCount: 89,
    isPrivate: false,
    role: "member",
    joinedAt: "2024-02-10",
    hasUnread: false,
  },
];

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
}

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

interface FeedItem {
  id: number;
  author: string;
  avatarUrl?: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  groupName?: string;
  images?: string[];
  poll?: Poll;
  event?: Event;
}

// Sample community feed
const initialFeedItems: FeedItem[] = [
  {
    id: 1,
    author: "Rachel Torres",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "1h ago",
    content: "Hey everyone! Reminder that our monthly rooftop BBQ is this Saturday at 5pm. We'll have the grill going and drinks provided. Bring a side dish to share if you can!",
    likes: 34,
    comments: 12,
    groupName: "Rooftop BBQ Crew",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 2,
    author: "David Chen",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "2h ago",
    content: "What time works best for everyone for next week's yoga sessions?",
    likes: 18,
    comments: 5,
    groupName: "Morning Yoga",
    poll: {
      question: "Preferred yoga time",
      options: [
        { id: "a", text: "6:00 AM", votes: 12 },
        { id: "b", text: "7:00 AM", votes: 8 },
        { id: "c", text: "8:00 AM", votes: 5 },
      ],
      totalVotes: 25,
    },
  },
  {
    id: 3,
    author: "Lisa Park",
    time: "4h ago",
    content: "Anyone interested in a coworking session at the lounge tomorrow? Planning to be there from 10am-2pm. Coffee's on me!",
    likes: 22,
    comments: 8,
    groupName: "Remote Workers Network",
  },
  {
    id: 4,
    author: "Marcus Johnson",
    time: "6h ago",
    content: "Board game night recap: Settlers of Catan got intense! Congrats to Sarah for the win. What should we play next week?",
    likes: 15,
    comments: 6,
    groupName: "Board Game Nights",
    poll: {
      question: "Next week's game",
      options: [
        { id: "a", text: "Wingspan", votes: 14 },
        { id: "b", text: "Ticket to Ride", votes: 9 },
        { id: "c", text: "Codenames", votes: 7 },
        { id: "d", text: "Azul", votes: 4 },
      ],
      totalVotes: 34,
    },
  },
  {
    id: 5,
    author: "Emma Wilson",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    time: "8h ago",
    content: "Made some amazing dishes at the community kitchen today! Here's what we cooked up together.",
    likes: 42,
    comments: 11,
    groupName: "Community Kitchen Club",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
    ],
  },
  {
    id: 6,
    author: "Rachel Torres",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "1d ago",
    content: "Join us for our biggest BBQ of the summer! We'll have live music, games, and plenty of food. Don't miss it!",
    likes: 67,
    comments: 23,
    groupName: "Rooftop BBQ Crew",
    event: {
      title: "Summer Rooftop BBQ Party",
      date: "Sat, Feb 15",
      time: "5:00 PM",
      location: "Rooftop Terrace",
      attendees: 34,
    },
  },
  {
    id: 7,
    author: "Sam Martinez",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    time: "1d ago",
    content: "Just wanted to say how much I love this community! Everyone's been so welcoming since I moved in last month.",
    likes: 89,
    comments: 31,
  },
  {
    id: 8,
    author: "David Chen",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "2d ago",
    content: "Special sunrise yoga session to kick off the new month. Beginners welcome!",
    likes: 28,
    comments: 9,
    groupName: "Morning Yoga",
    event: {
      title: "Sunrise Yoga Session",
      date: "Sat, Feb 1",
      time: "6:00 AM",
      location: "Wellness Room",
      attendees: 12,
    },
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState(initialFeedItems);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(initialFeedItems.map((item) => [item.id, item.likes]))
  );
  const [votedPolls, setVotedPolls] = useState<Record<number, string>>({});
  const [rsvpedEvents, setRsvpedEvents] = useState<Set<number>>(new Set());
  const [composerFocused, setComposerFocused] = useState(false);
  const [composerMode, setComposerMode] = useState<"text" | "poll" | "event">("text");
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const toggleRsvp = (postId: number) => {
    const isRsvped = rsvpedEvents.has(postId);
    setRsvpedEvents((prev) => {
      const newSet = new Set(prev);
      if (isRsvped) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.event) {
          return {
            ...post,
            event: {
              ...post.event,
              attendees: isRsvped ? post.event.attendees - 1 : post.event.attendees + 1,
            },
          };
        }
        return post;
      })
    );
  };

  const handleVote = (postId: number, optionId: string) => {
    const previousVote = votedPolls[postId];
    if (previousVote === optionId) return; // Already voted for this option

    setVotedPolls((prev) => ({ ...prev, [postId]: optionId }));
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.poll) {
          return {
            ...post,
            poll: {
              ...post.poll,
              totalVotes: previousVote ? post.poll.totalVotes : post.poll.totalVotes + 1,
              options: post.poll.options.map((opt) => {
                if (opt.id === optionId) {
                  return { ...opt, votes: opt.votes + 1 };
                }
                if (opt.id === previousVote) {
                  return { ...opt, votes: opt.votes - 1 };
                }
                return opt;
              }),
            },
          };
        }
        return post;
      })
    );
  };

  const handlePost = () => {
    const content = textareaRef.current?.value.trim();
    if (!content) return;

    const newPost: FeedItem = {
      id: Date.now(),
      author: "James Sparkes",
      time: "Just now",
      content,
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setLikeCounts((counts) => ({ ...counts, [newPost.id]: 0 }));
    if (textareaRef.current) textareaRef.current.value = "";
    setHasText(false);
    setComposerFocused(false);
    setComposerMode("text");
  };

  const managedGroups = sampleMyGroups.filter(
    (g) => g.role === "manager" || g.role === "admin"
  );
  const memberGroups = sampleMyGroups.filter((g) => g.role === "member");

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar title="Community" />

      <TabNav
        tabs={[
          { id: "feed", label: "Feed" },
          { id: "groups", label: "Groups" },
          { id: "my-groups", label: "My Groups", count: sampleMyGroups.length },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 overflow-auto pb-4">
        {activeTab === "feed" && (
          <>
            {/* Post composer */}
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
                    placeholder="Share with the community..."
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
                      onClick={() => {
                        if (textareaRef.current) textareaRef.current.value = "";
                        setHasText(false);
                        setComposerFocused(false);
                        setComposerMode("text");
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
                    {item.avatarUrl ? (
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
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-foreground">
                            {item.author}
                          </span>
                          {item.groupName && (
                            <p className="text-sm text-muted-foreground">
                              in {item.groupName}
                            </p>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{item.time}</span>
                      </div>
                      <p className="mt-0.5 text-foreground leading-relaxed">
                        {item.content}
                      </p>

                      {/* Images */}
                      {item.images && item.images.length > 0 && (
                        <div className={`mt-3 grid gap-2 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                          {item.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt=""
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      {/* Poll */}
                      {item.poll && (
                        <div className="mt-3 space-y-2">
                          {item.poll.options.map((option) => {
                            const hasVoted = votedPolls[item.id] !== undefined;
                            const isSelected = votedPolls[item.id] === option.id;
                            const percentage = hasVoted
                              ? Math.round((option.votes / item.poll!.totalVotes) * 100)
                              : 0;
                            return (
                              <button
                                key={option.id}
                                onClick={() => handleVote(item.id, option.id)}
                                className={`w-full text-left rounded-lg border transition-colors overflow-hidden relative ${
                                  isSelected
                                    ? "border-primary ring-1 ring-primary"
                                    : "border-border hover:border-muted-foreground"
                                }`}
                              >
                                <div
                                  className="absolute inset-0 bg-secondary transition-all duration-500 ease-out"
                                  style={{ width: hasVoted ? `${percentage}%` : '0%' }}
                                />
                                <div className="relative px-4 py-2.5 flex items-center justify-between">
                                  <span className={`text-sm ${isSelected ? "font-medium" : ""}`}>
                                    {option.text}
                                  </span>
                                  {hasVoted && (
                                    <span className="text-sm text-muted-foreground">
                                      {percentage}%
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                          <p className="text-xs text-muted-foreground">
                            {item.poll.totalVotes} votes
                          </p>
                        </div>
                      )}

                      {/* Event */}
                      {item.event && (
                        <div className="mt-3 border border-border rounded-lg overflow-hidden">
                          <div className="bg-secondary px-4 py-3">
                            <h3 className="font-semibold text-foreground">{item.event.title}</h3>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{item.event.date} at {item.event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{item.event.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{item.event.attendees} going</span>
                            <button
                              onClick={() => toggleRsvp(item.id)}
                              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                rsvpedEvents.has(item.id)
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {rsvpedEvents.has(item.id) ? "Going ✓" : "RSVP"}
                            </button>
                          </div>
                        </div>
                      )}

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
          </>
        )}

        {activeTab === "groups" && (
          <div>
            {sampleGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onJoin={(id) => console.log("Join group:", id)}
              />
            ))}
          </div>
        )}

        {activeTab === "my-groups" && (
          <div>
            {managedGroups.length > 0 && (
              <>
                <div className="px-4 py-3">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Managing
                  </h2>
                </div>
                {managedGroups.map((group) => (
                  <MyGroupCard
                    key={group.id}
                    group={group}
                    onClick={(id) => console.log("Open group:", id)}
                  />
                ))}
              </>
            )}
            {memberGroups.length > 0 && (
              <>
                <div className="px-4 py-3">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Member
                  </h2>
                </div>
                {memberGroups.map((group) => (
                  <MyGroupCard
                    key={group.id}
                    group={group}
                    onClick={(id) => console.log("Open group:", id)}
                  />
                ))}
              </>
            )}
            {sampleMyGroups.length === 0 && (
              <div className="px-4 py-12 text-center">
                <p className="text-muted-foreground">You haven&apos;t joined any groups yet.</p>
                <button
                  onClick={() => setActiveTab("groups")}
                  className="mt-2 text-accent hover:underline"
                >
                  Browse groups to join
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
