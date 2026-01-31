export type MembershipRole = "member" | "manager" | "admin";

export type GroupCategory =
  | "social"
  | "fitness"
  | "professional"
  | "hobbies"
  | "food"
  | "wellness";

export interface Group {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  memberCount: number;
  isPrivate: boolean;
}

export interface MyGroup extends Group {
  role: MembershipRole;
  joinedAt: string;
  hasUnread: boolean;
}
