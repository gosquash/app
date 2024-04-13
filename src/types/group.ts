import type { User } from "./user";

export interface Group {
	id: string;
	name: string;
	creator: User;

	createdAt: string;
	updatedAt: string;
}

export interface GroupWithMembers extends Group {
	members: GroupMember[];
}

export interface GroupMember {
	user: User;
}
