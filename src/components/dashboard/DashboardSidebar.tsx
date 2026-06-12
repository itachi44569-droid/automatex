"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, Ticket, Calendar, MessageSquare,
  Bell, Settings, LogOut, Zap, ChevronLeft, ChevronRight, Users,
  BarChart3, Briefcase, UserCircle, FileText, TrendingUp, Shield,
  Menu, X, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const clientNav: NavItem[] = [
  { href: "/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/ai-assistant", label: "AI Assistant", icon: Sparkles },
  { href: "/client/projects", label: "My Projects", icon: FolderKanban },
  { href: "/client/tickets", label: "Support", icon: Ticket },
  { href: "/client/meetings", label: "Meetings", icon: Calendar },
  { href: "/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/client/notifications", label: "Notifications", icon: Bell },
  { href: "/client/settings", label: "Settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/leads", label: "CRM / Leads", icon: TrendingUp },
  { href: "/admin/tickets", label: "Support Tickets", icon: Ticket },
  { href: "/admin/meetings", label: "Meetings", icon: Calendar },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { href: "/admin/team", label: "Team", icon: Briefcase },
  { href: "/admin/revenue", label: "Revenue", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: UserCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface Props {
  role: "client" | "admin";
}

export function DashboardSidebar({ role }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, logout } = useAuth();

  const nav = role === "admin" ? adminNav : clientNav;

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-2 px-4 py-5 border-b border-border/50", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold font-display gradient-text text-sm">AutomateX</span>
            <span className="font-bold text-sm"> AI</span>
            {role === "admin" && (
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-2.5 h-2.5 text-blue-500" />
                <span className="text-[10px] text-blue-500 font-medium">Admin</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/client" && item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-foreground border border-blue-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("w-4 h-4 shrink-0", isActive && "text-blue-500")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge ? (
                <Badge variant="secondary" className="ml-auto text-xs h-4 px-1.5 bg-blue-500/20 text-blue-400 border-0">
                  {item.badge}
                </Badge>
              ) : null}
              {isActive && (
                <motion.div
                  layoutId={`sidebar-active-${role}`}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className={cn("p-3 border-t border-border/50 space-y-2")}>
        <div className={cn("flex items-center gap-2.5 px-2 py-2 rounded-xl glass-card border border-border/50", collapsed && "justify-center px-1")}>
          <Avatar className="w-7 h-7 shrink-0">
            <AvatarImage src={user?.photoURL || ""} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs font-bold">
              {userProfile?.displayName?.slice(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate">{userProfile?.displayName || "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 overflow-hidden"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-border/80 flex items-center justify-center shadow-sm hover:bg-accent transition-colors z-50"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-background/90 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold font-display gradient-text text-sm">AutomateX AI</span>
        </Link>
        <button onClick={() => setMobileOpen(true)} className="p-2 text-muted-foreground hover:text-foreground">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop */}
      <motion.div
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:block shrink-0"
      />
    </>
  );
}
