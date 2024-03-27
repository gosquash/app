import { hookstate } from "@hookstate/core";

import type { User } from "."
import { fetchAPI } from "@/modules/api";

interface Group {
	id: string;
	name: string;
	creator: User;

	createdAt: string;
	updatedAt: string;
}

interface GroupWithMembers extends Group {
	members: GroupMember[];
}

interface GroupMember {
	user: User;
}

export const groups = hookstate<Group[]>([]);

export async function fetchGroups() {
	console.log("hullu")
	const data = await fetchAPI<{ groups: Group[] }>("/me/groups");

	console.log({ data });

	if (data.error) {
		return;
	}

	groups.set(data.groups ?? []);
}
