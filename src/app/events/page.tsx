"use client";

import { TopBar, BottomNav } from "@/components";

export default function EventsPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar title="Events" />

      <main className="flex-1 overflow-auto pb-4">
        <div className="p-4 space-y-4">
          <div className="bg-secondary rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=300&fit=crop"
              alt="Rooftop BBQ"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">Monthly Rooftop BBQ</h3>
              <p className="text-sm text-muted-foreground mt-1">Sat, Feb 15 · 4:00 PM</p>
              <p className="text-sm text-muted-foreground">Rooftop Terrace</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">23 going</span>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                  RSVP
                </button>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=300&fit=crop"
              alt="Morning Yoga"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">Sunrise Yoga Session</h3>
              <p className="text-sm text-muted-foreground mt-1">Sun, Feb 16 · 6:00 AM</p>
              <p className="text-sm text-muted-foreground">Wellness Room</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">12 going</span>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                  RSVP
                </button>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=300&fit=crop"
              alt="Cooking Class"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">Community Cooking Night</h3>
              <p className="text-sm text-muted-foreground mt-1">Fri, Feb 21 · 6:30 PM</p>
              <p className="text-sm text-muted-foreground">Community Kitchen</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">18 going</span>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                  RSVP
                </button>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=800&h=300&fit=crop"
              alt="Game Night"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">Board Game Tournament</h3>
              <p className="text-sm text-muted-foreground mt-1">Thu, Feb 27 · 7:00 PM</p>
              <p className="text-sm text-muted-foreground">Lounge Area</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">31 going</span>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
