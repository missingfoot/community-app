"use client";

import { useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { BottomNav, TabNav, PostComposer } from "@/components";
import { Group } from "@/types";
import { IconHeartOutline24, IconMessageOutline24 } from "nucleo-core-outline-24";
import { IconHeartFill24 } from "nucleo-core-fill-24";

// Sample groups data (would come from API/state in real app)
const groupsData: Record<string, Group & {
  rules?: string[];
  createdAt?: string;
}> = {
  "847291": {
    id: "847291",
    name: "Rooftop BBQ Crew",
    description: "Monthly rooftop gatherings and grilling sessions. We meet on the last Saturday of every month to enjoy great food, good company, and amazing city views. All skill levels welcome - from grill masters to complete beginners!",
    category: "social",
    memberCount: 47,
    isPrivate: false,
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    rules: [
      "Be respectful to all members",
      "Clean up after yourself",
      "No outside alcohol - we provide drinks",
      "RSVP at least 2 days in advance",
    ],
    createdAt: "January 2024",
  },
  "582916": {
    id: "582916",
    name: "Remote Workers Network",
    description: "Coworking meetups and productivity tips for remote professionals. Share your home office setup, discuss productivity hacks, and join our weekly virtual coffee chats.",
    category: "professional",
    memberCount: 89,
    isPrivate: false,
    coverImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=400&fit=crop",
    rules: [
      "Keep discussions professional",
      "No solicitation or spam",
      "Respect working hours when messaging",
    ],
    createdAt: "February 2024",
  },
};

// Sample members
const sampleMembers = [
  { id: "1", name: "Sarah Chen", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", role: "admin" },
  { id: "2", name: "Mike Johnson", title: "Software Engineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", role: "manager" },
  { id: "3", name: "Emily Davis", title: "Marketing Manager", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", role: "member" },
  { id: "4", name: "Alex Kim", title: "Graduate Student", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", role: "member" },
  { id: "5", name: "Jordan Lee", title: "Freelance Writer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", role: "member" },
  { id: "6", name: "Taylor Swift", title: "Data Analyst", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", role: "member" },
];

// Sample events
const sampleEvents = [
  {
    id: "1",
    title: "Monthly BBQ Meetup",
    date: "Sat, Feb 15",
    time: "4:00 PM",
    location: "Rooftop Terrace",
    attendees: 23,
  },
  {
    id: "2",
    title: "Grill Master Workshop",
    date: "Sun, Feb 23",
    time: "2:00 PM",
    location: "Community Kitchen",
    attendees: 12,
  },
];

// Sample discussion posts
const samplePosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Hey everyone! Excited for next week's BBQ. I'm bringing my famous ribs recipe. Who else is bringing something?",
    time: "2h ago",
    likes: 8,
    comments: 5,
  },
  {
    id: 2,
    author: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Just picked up a new smoker! Can't wait to test it out at the next meetup.",
    time: "5h ago",
    likes: 12,
    comments: 3,
  },
  {
    id: 3,
    author: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Does anyone have a good vegetarian option they'd recommend for grilling? Looking to expand my repertoire!",
    time: "1d ago",
    likes: 6,
    comments: 8,
  },
  {
    id: 4,
    author: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "Last week's BBQ was amazing! Thanks to everyone who came out. Already looking forward to the next one",
    time: "2d ago",
    likes: 24,
    comments: 7,
  },
  {
    id: 5,
    author: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "Pro tip: marinate your chicken overnight in buttermilk before grilling. Game changer!",
    time: "3d ago",
    likes: 18,
    comments: 4,
  },
  {
    id: 6,
    author: "Taylor Swift",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    content: "Anyone interested in doing a Korean BBQ theme for March? I can bring the banchan!",
    time: "4d ago",
    likes: 31,
    comments: 12,
  },
  {
    id: 7,
    author: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Weather forecast looks perfect for Saturday. Clear skies and 72°F. BBQ gods are smiling on us!",
    time: "5d ago",
    likes: 15,
    comments: 6,
  },
];

const tabs = [
  { id: "discussion", label: "Discussion" },
  { id: "events", label: "Events" },
  { id: "members", label: "Members" },
  { id: "info", label: "Info" },
];

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const paramsArray = params.params as string[];
  const groupId = paramsArray[0];
  const activeTab = paramsArray[1] || "discussion";
  const [isJoined, setIsJoined] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(samplePosts.map((p) => [p.id, p.likes]))
  );
  const mainRef = useRef<HTMLElement>(null);
  const coverHeight = 192; // h-48 = 192px

  const group = groupsData[groupId] || groupsData["847291"];

  const handleTabChange = useCallback((newTab: string) => {
    // Get current scroll, capped at cover height
    const currentScroll = mainRef.current
      ? Math.min(mainRef.current.scrollTop, coverHeight)
      : 0;

    // Update URL with new tab
    router.push(`/groups/${groupId}/${newTab}`, { scroll: false });

    // Keep the same scroll position (capped)
    requestAnimationFrame(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = currentScroll;
      }
    });
  }, [router, groupId]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setLikeCounts((c) => ({ ...c, [postId]: c[postId] - 1 }));
      } else {
        newSet.add(postId);
        setLikeCounts((c) => ({ ...c, [postId]: c[postId] + 1 }));
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Scrollable Content */}
      <main ref={mainRef} className="flex-1 overflow-auto pb-4">
        {/* Cover Image Header */}
        <div className="h-48">
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sticky Header - Group Name Bar + Tabs */}
        <div className="sticky top-0 z-10 bg-background">
          {/* Group Name Bar */}
          <div className="flex items-center gap-3 px-4 pt-3">
            <button
              onClick={() => router.push("/community/my-groups")}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{group.name}</h1>
              <p className="text-sm text-muted-foreground">{group.memberCount} members</p>
            </div>
          </div>

          {/* Tabs */}
          <TabNav tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Tab Content */}
        <div>
        {activeTab === "discussion" && (
          <>
            <PostComposer placeholder="Write something..." />

            <div className="divide-y divide-border">
              {samplePosts.map((post) => (
              <article key={post.id} className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{post.author}</span>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="mt-1 text-foreground">{post.content}</p>
                    <div className="flex items-center gap-6 mt-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          likedPosts.has(post.id)
                            ? "text-red-500"
                            : "text-muted-foreground hover:text-red-500"
                        }`}
                      >
                        {likedPosts.has(post.id) ? (
                          <IconHeartFill24 className="w-5 h-5" />
                        ) : (
                          <IconHeartOutline24 className="w-5 h-5" />
                        )}
                        <span className="text-sm">{likeCounts[post.id]}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                        <IconMessageOutline24 className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </>
        )}

        {activeTab === "events" && (
          <div className="p-4 space-y-4">
            {sampleEvents.map((event) => (
              <div
                key={event.id}
                className="bg-secondary rounded-xl p-4"
              >
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>{event.date} at {event.time}</p>
                  <p>{event.location}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{event.attendees} going</span>
                  <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "members" && (
          <div className="p-4 space-y-2">
            {sampleMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground">{member.name}</span>
                  <p className="text-sm text-muted-foreground">{member.title}</p>
                </div>
                {(member.role === "admin" || member.role === "manager") && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                    {member.role === "admin" ? "Admin" : "Mod"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "info" && (
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">About</h3>
              <p className="text-muted-foreground">{group.description}</p>
            </div>

            {group.rules && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Group Rules</h3>
                <div className="bg-secondary rounded-xl divide-y divide-border text-base overflow-hidden">
                  {group.rules.map((rule, index) => (
                    <div key={index} className="px-4 py-3 text-foreground">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-foreground mb-2">Details</h3>
              <div className="bg-secondary rounded-xl divide-y divide-border text-base overflow-hidden">
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground capitalize">{group.category}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">Members</span>
                  <span className="text-foreground">{group.memberCount}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">{group.createdAt}</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">Visibility</span>
                  <span className="text-foreground">{group.isPrivate ? "Private" : "Public"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsJoined(false)}
              className="w-full py-3 text-red-500 font-medium rounded-full bg-secondary"
            >
              Leave Group
            </button>
          </div>
        )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
