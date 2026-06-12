"use client";
import { useState, useEffect } from "react";
import {
  collection, query, where, orderBy, onSnapshot,
  addDoc, updateDoc, doc, serverTimestamp, getDocs, limit, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project, Meeting, Ticket, Notification } from "@/types";

// ── Projects ──────────────────────────────────────────────
export function useProjects(clientId?: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!clientId) { setLoading(false); return; }
    const q = clientId === "admin"
      ? query(collection(db, "projects"), orderBy("createdAt", "desc"))
      : query(collection(db, "projects"), where("clientId", "==", clientId), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [clientId]);
  return { projects, loading };
}

// ── Meetings ─────────────────────────────────────────────
export function useMeetings(clientId?: string) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!clientId) { setLoading(false); return; }
    const q = clientId === "admin"
      ? query(collection(db, "meetings"), orderBy("date", "desc"))
      : query(collection(db, "meetings"), where("clientId", "==", clientId), orderBy("date", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setMeetings(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Meeting)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [clientId]);
  return { meetings, loading };
}

// ── Tickets ───────────────────────────────────────────────
export function useTickets(clientId?: string) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!clientId) { setLoading(false); return; }
    const q = clientId === "admin"
      ? query(collection(db, "tickets"), orderBy("updatedAt", "desc"))
      : query(collection(db, "tickets"), where("clientId", "==", clientId), orderBy("updatedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Ticket)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [clientId]);
  return { tickets, loading };
}

// ── Notifications ─────────────────────────────────────────
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    const q = query(collection(db, "notifications"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(30));
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notification)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [userId]);
  return { notifications, loading };
}

// ── Messages (participants array-contains) ─────────────────
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverId: string;
  receiverName: string;
  content: string;
  read: boolean;
  createdAt: Timestamp | null;
  participants: string[];
}

export function useMessages(userId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", userId),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatMessage)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [userId]);
  return { messages, loading };
}

export async function sendMessage(params: {
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverId: string;
  receiverName: string;
  content: string;
}) {
  await addDoc(collection(db, "messages"), {
    senderId: params.senderId,
    senderName: params.senderName,
    senderRole: params.senderRole,
    receiverId: params.receiverId,
    receiverName: params.receiverName,
    content: params.content,
    participants: [params.senderId, params.receiverId],
    read: false,
    createdAt: serverTimestamp(),
  });
}

// ── Admin: all users/clients ───────────────────────────────
export function useAllUsers() {
  const [users, setUsers] = useState<import("@/types").User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => ({ uid: d.id, ...d.data() } as import("@/types").User)));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);
  return { users, loading };
}

// ── Project CRUD ──────────────────────────────────────────
export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt" | "files">) {
  return addDoc(collection(db, "projects"), {
    ...data,
    files: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, data: Partial<Project>) {
  await updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
}

// ── Meeting CRUD ──────────────────────────────────────────
export async function createMeeting(data: Omit<Meeting, "id" | "createdAt">) {
  return addDoc(collection(db, "meetings"), { ...data, createdAt: serverTimestamp() });
}

export async function updateMeeting(id: string, data: Partial<Meeting>) {
  await updateDoc(doc(db, "meetings", id), data);
}
