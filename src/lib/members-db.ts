import guntherPhoto from "./members/gunther.png";
import jeffersonPhoto from "./members/jefferson.png";
import marcosPhoto from "./members/marcos.png";
import norisPhoto from "./members/noris.png";
import pimentelPhoto from "./members/pimentel.png";
import raphaelPhoto from "./members/raphael.png";
import souzaPhoto from "./members/souza.png";

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
  office?: string;
}

export const DEFAULT_MEMBERS: Member[] = [
  {
    id: "gunther-patrick-vargas-hager",
    name: "Gunther Patrick Vargas Hager",
    role: "Mestre Instalado",
    cim: "Não informada",
    initiationDate: "Não informada",
    email: "gunther@arlsuniaofraternal.com.br",
    photo: guntherPhoto,
    status: "regular",
    joinedAt: new Date().toISOString(),
    office: "Venerável Mestre"
  },
  {
    id: "jefferson-campos-beira-junior",
    name: "Jefferson Campos Beira Junior",
    role: "Mestre Maçom",
    cim: "32071",
    initiationDate: "09 de Agosto de 2020",
    email: "jefferson@arlsuniaofraternal.com.br",
    photo: jeffersonPhoto,
    status: "regular",
    joinedAt: "2020-08-09T00:00:00.000Z",
    office: "Secretário"
  },
  {
    id: "jose-aldeci-de-souza",
    name: "Jose Aldeci de Souza",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "09 de Setembro de 2023",
    email: "souza@arlsuniaofraternal.com.br",
    photo: souzaPhoto,
    status: "regular",
    joinedAt: new Date("2023-09-09").toISOString()
  },
  {
    id: "marcos-winicios",
    name: "Marcos Winicios",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "23 de Setembro de 2023",
    email: "marcos@arlsuniaofraternal.com.br",
    photo: marcosPhoto,
    status: "regular",
    joinedAt: new Date("2023-09-23").toISOString(),
    office: "Primeiro Vigilante"
  },
  {
    id: "mariano",
    name: "Mariano",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "Não informada",
    email: "mariano@arlsuniaofraternal.com.br",
    photo: "",
    status: "regular",
    joinedAt: new Date().toISOString()
  },
  {
    id: "noris-eduardo",
    name: "Noris Eduardo",
    role: "Não informado",
    cim: "Não informada",
    initiationDate: "Não informada",
    email: "noris@arlsuniaofraternal.com.br",
    photo: norisPhoto,
    status: "regular",
    joinedAt: new Date().toISOString()
  },
  {
    id: "pimentel",
    name: "Pimentel",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "10 de Julho de 2021",
    email: "pimentel@arlsuniaofraternal.com.br",
    photo: pimentelPhoto,
    status: "regular",
    joinedAt: new Date("2021-07-10").toISOString(),
    office: "Segundo Vigilante"
  },
  {
    id: "raffael-leite",
    name: "Raffael Leite",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "Não informada",
    email: "raffael@arlsuniaofraternal.com.br",
    photo: "",
    status: "regular",
    joinedAt: new Date().toISOString()
  },
  {
    id: "raphael-sanches",
    name: "Raphael Sanches",
    role: "Mestre Maçom",
    cim: "Não informada",
    initiationDate: "Não informada",
    email: "Raphael@arlsuniaofraternal.com.br",
    photo: raphaelPhoto,
    status: "regular",
    joinedAt: new Date().toISOString()
  }
];

export function getMembers(): Member[] {
  if (typeof window === "undefined") {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
  }
  const stored = localStorage.getItem("uniao_fraternal_members");
  if (!stored) {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
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
    return merged.sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    return DEFAULT_MEMBERS.sort((a, b) => a.name.localeCompare(b.name));
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
