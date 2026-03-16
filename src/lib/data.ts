import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// ── Types ──────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorClass: string;
  date: string;
  tags: string[];
  image: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageFile?: string;
}

export interface RecruitApplication {
  id: string;
  characterName: string;
  realm: string;
  faction: "Alliance" | "Horde";
  characterClass: string;
  spec: string;
  ilvl: string;
  raiderio?: string;
  warcraftlogs?: string;
  experience: string;
  availability: string;
  aboutYou: string;
  referral?: string;
  status: "pending" | "reviewed" | "accepted" | "declined";
  submittedAt: string;
}

export type ScheduleEventType = "raid" | "mythicplus" | "pvp" | "social";

export interface ScheduleEvent {
  id: string;
  title: string;
  type: ScheduleEventType;
  raidInstance: string | null;
  difficulty: string | null;
  leader: string;
  leaderClass: string;
  description: string;
  startTime: string;
  endTime: string;
  date?: string;
  recurring: string | null;
  color: string;
  signups: number;
  rosterSize: number | null;
}

// ── Helpers ────────────────────────────────────────────────

function readJson<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

function writeJson<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ── Blog ───────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = readJson<BlogPost>("blog.json");
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createBlogPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  const posts = readJson<BlogPost>("blog.json");
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
  };
  posts.push(newPost);
  writeJson("blog.json", posts);
  return newPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = readJson<BlogPost>("blog.json");
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  writeJson("blog.json", filtered);
  return true;
}

// ── Gallery ────────────────────────────────────────────────

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = readJson<GalleryItem>("gallery.json");
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function createGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem> {
  const items = readJson<GalleryItem>("gallery.json");
  const newItem: GalleryItem = { ...item, id: Date.now().toString() };
  items.push(newItem);
  writeJson("gallery.json", items);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = readJson<GalleryItem>("gallery.json");
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeJson("gallery.json", filtered);
  return true;
}

// ── Recruits ───────────────────────────────────────────────

export async function getRecruitApplications(): Promise<RecruitApplication[]> {
  const apps = readJson<RecruitApplication>("recruits.json");
  return apps.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function createRecruitApplication(
  app: Omit<RecruitApplication, "id" | "status" | "submittedAt">
): Promise<RecruitApplication> {
  const apps = readJson<RecruitApplication>("recruits.json");
  const newApp: RecruitApplication = {
    ...app,
    id: Date.now().toString(),
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  apps.push(newApp);
  writeJson("recruits.json", apps);
  return newApp;
}

export async function updateApplicationStatus(
  id: string,
  status: RecruitApplication["status"]
): Promise<boolean> {
  const apps = readJson<RecruitApplication>("recruits.json");
  const app = apps.find((a) => a.id === id);
  if (!app) return false;
  app.status = status;
  writeJson("recruits.json", apps);
  return true;
}

// ── Schedule ──────────────────────────────────────────────

export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  return readJson<ScheduleEvent>("schedule.json");
}

export async function createScheduleEvent(
  event: Omit<ScheduleEvent, "id">
): Promise<ScheduleEvent> {
  const events = readJson<ScheduleEvent>("schedule.json");
  const newEvent: ScheduleEvent = { ...event, id: Date.now().toString() };
  events.push(newEvent);
  writeJson("schedule.json", events);
  return newEvent;
}

export async function deleteScheduleEvent(id: string): Promise<boolean> {
  const events = readJson<ScheduleEvent>("schedule.json");
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  writeJson("schedule.json", filtered);
  return true;
}
