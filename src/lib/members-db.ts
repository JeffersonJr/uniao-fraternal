export interface Member {
  id: string;
  name: string;
  role: string;
  cim: string;
  initiationDate: string;
  email: string;
  photo: string;
  status: "regular" | "irregular" | "inactive";
  joinedAt: string;
}

export const DEFAULT_MEMBERS: Member[] = [
  {
    id: "jefferson-campos-beira-junior",
    name: "Jefferson Campos Beira Junior",
    role: "Mestre Maçom",
    cim: "32071",
    initiationDate: "09 de Agosto de 2020",
    email: "jefferson@arlsuniaofraternal.com.br",
    photo: "https://arlsuniaofraternal.com.br/wp-content/uploads/2025/08/cropped-cropped-Jefferson-Campos-1-128x128.webp",
    status: "regular",
    joinedAt: "2020-08-09T00:00:00.000Z"
  }
];

export function getMembers(): Member[] {
  if (typeof window === "undefined") {
    return DEFAULT_MEMBERS;
  }
  const stored = localStorage.getItem("uniao_fraternal_members");
  if (!stored) {
    return DEFAULT_MEMBERS;
  }
  try {
    const parsed = JSON.parse(stored) as Member[];
    // Merge defaults with stored, ensuring no duplicate IDs
    const merged = [...DEFAULT_MEMBERS];
    for (const m of parsed) {
      if (!merged.some((x) => x.id === m.id)) {
        merged.push(m);
      }
    }
    return merged;
  } catch (e) {
    return DEFAULT_MEMBERS;
  }
}

export function getMemberById(id: string): Member | undefined {
  return getMembers().find((m) => m.id === id);
}

export function saveMember(member: Omit<Member, "id" | "status" | "joinedAt">): Member {
  const cleanName = member.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]/g, "-") // replace non-alphanumeric with hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, ""); // trim hyphens

  const newMember: Member = {
    ...member,
    id: `${cleanName}-${Date.now()}`,
    status: "regular",
    joinedAt: new Date().toISOString()
  };

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("uniao_fraternal_members");
    let members: Member[] = [];
    if (stored) {
      try {
        members = JSON.parse(stored) as Member[];
      } catch (e) {
        members = [];
      }
    }
    members.push(newMember);
    localStorage.setItem("uniao_fraternal_members", JSON.stringify(members));
  }
  return newMember;
}
