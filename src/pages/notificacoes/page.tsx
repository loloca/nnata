import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import {
  categoriaConfig,
  type NotifCategoria,
  type NotifRole,
} from "@/mocks/notificacoes";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: string;
  is_read: boolean;
  created_at: string;
  metadata?: any;
}

const roleLabels: Record<NotifRole, string> = {
  estudante: "Estudante",
  empresa: "Empresa",
};

const categorias: { value: string; label: string; icon: string }[] = [
  { value: "todas", label: "Todas", icon: "ri-apps-line" },
  { value: "candidatura", label: "Candidaturas", icon: "ri-send-plane-line" },
  { value: "vaga", label: "Vagas", icon: "ri-briefcase-line" },
  { value: "entrevista", label: "Entrevistas", icon: "ri-calendar-check-line" },
  { value: "perfil", label: "Perfil", icon: "ri-user-line" },
  { value: "sistema", label: "Sistema", icon: "ri-settings-3-line" },
];

function NotifCard({
  notif,
  onMarkRead,
  onDelete,
}: {
  notif: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const cat = notif.type as NotifCategoria;
  const cfg = categoriaConfig[cat] || categoriaConfig["sistema"];

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Agora mesmo";
    if (diffMins < 60) return `há ${diffMins} min`;
    if (diffHours < 24) return `há ${diffHours} h`;
    if (diffDays === 1) return "Ontem";
    return `há ${diffDays} dias`;
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all group ${
        notif.is_read
          ? "bg-white border-gray-100"
          : "bg-orange-50/30 border-orange-200/60"
      }`}
    >
      {!notif.is_read && (
        <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-[#E8501A] rounded-full flex-shrink-0"></div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${cfg.bg}`}>
              <i className={`${cfg.icon} ${cfg.color} text-xl`}></i>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full ${cfg.bg} border-2 border-white`}>
              <i className={`${cfg.icon} ${cfg.color} text-xs`}></i>
            </div>
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="text-xs text-gray-400">{formatRelativeTime(notif.created_at)}</span>
            </div>
            <h3 className={`font-semibold text-sm leading-snug mb-1 ${notif.is_read ? "text-[#374151]" : "text-[#1A1A2E]"}`}>
              {notif.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{notif.content}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/80">
          <div className="flex items-center gap-1">
            {!notif.is_read && (
              <button
                onClick={() => onMarkRead(notif.id)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-emerald-50"
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-check-double-line"></i>
                </div>
                Marcar como lida
              </button>
            )}
            {notif.is_read && (
              <span className="flex items-center gap-1.5 text-xs text-gray-300">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-check-double-line"></i>
                </div>
                Lida
              </span>
            )}
          </div>
          <button
            onClick={() => onDelete(notif.id)}
            className="flex items-center gap-1 text-xs text-gray-300 hover:text-red-400 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-red-50"
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-delete-bin-line"></i>
            </div>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificacoesPage() {
  const { user } = useAuth();
  const [activeCategoria, setActiveCategoria] = useState<string>("todas");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchNotifications = async (isRefresh = false) => {
    if (!user) return;
    if (!isRefresh) setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user?.id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const markRead = async (id: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    }
  };

  const markAllRead = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      showToast("Todas as notificações marcadas como lidas");
    }
  };

  const deleteNotif = async (id: string) => {
    const { error } = await supabase.from("notifications").delete().eq("id", id);
    if (!error) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      showToast("Notificação removida");
    }
  };

  const clearAll = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", user.id);

    if (!error) {
      setNotifications([]);
      showToast("Todas as notificações removidas");
    }
  };

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const catMatch = activeCategoria === "todas" || n.type === activeCategoria;
      const readMatch = !showOnlyUnread || !n.is_read;
      return catMatch && readMatch;
    });
  }, [notifications, activeCategoria, showOnlyUnread]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const totalCount = notifications.length;

  // Grouping logic
  const groups = useMemo(() => {
    const g: { label: string; items: Notification[] }[] = [
      { label: "Hoje", items: [] },
      { label: "Ontem", items: [] },
      { label: "Anteriores", items: [] },
    ];

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    filtered.forEach((n) => {
      const d = new Date(n.created_at);
      d.setHours(0, 0, 0, 0);

      if (d.getTime() === now.getTime()) g[0].items.push(n);
      else if (d.getTime() === yesterday.getTime()) g[1].items.push(n);
      else g[2].items.push(n);
    });

    return g.filter((group) => group.items.length > 0);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      {/* Page header */}
      <div className="pt-20 bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Link to="/" className="hover:text-white/80 transition-colors cursor-pointer">Início</Link>
            <i className="ri-arrow-right-s-line text-white/30"></i>
            <span className="text-white/70">Notificações</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                Notificações
                {unreadCount > 0 && (
                  <span className="text-sm font-bold bg-[#E8501A] text-white px-2.5 py-1 rounded-full">
                    {unreadCount} novas
                  </span>
                )}
              </h1>
              <p className="text-sm text-white/50 mt-1">{totalCount} notificações no total</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/20 px-4 py-2 rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-check-double-line"></i>
                </div>
                Marcar todas
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-red-400 border border-white/20 px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-delete-bin-line"></i>
                </div>
                Limpar tudo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">

            {/* User Profile Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sessão Activa</p>
              <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E8501A] text-white">
                  <i className={user?.role === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1A1A2E] truncate">{user?.nome}</p>
                  <p className="text-[10px] text-[#E8501A] font-bold uppercase tracking-tight">
                    {user?.role === "estudante" ? "Estudante" : "Empresa"}
                  </p>
                </div>
              </div>
            </div>

            {/* Category filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categoria</p>
              <div className="flex flex-col gap-1">
                {categorias.map((cat) => {
                  const count = notifications.filter(
                    (n) =>
                      cat.value === "todas" || n.type === cat.value
                  ).length;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategoria(cat.value)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        activeCategoria === cat.value
                          ? "bg-orange-50 text-[#E8501A] font-medium"
                          : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A2E]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className={cat.icon}></i>
                        </div>
                        {cat.label}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        activeCategoria === cat.value ? "bg-[#E8501A]/10 text-[#E8501A]" : "bg-gray-100 text-gray-400"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unread only toggle */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <label className="flex items-center justify-between cursor-pointer gap-3">
                <span className="text-sm font-medium text-[#1A1A2E]">Só não lidas</span>
                <div
                  onClick={() => setShowOnlyUnread((v) => !v)}
                  className={`w-10 h-6 rounded-full transition-all flex items-center px-1 cursor-pointer flex-shrink-0 ${
                    showOnlyUnread ? "bg-[#E8501A]" : "bg-gray-200"
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${showOnlyUnread ? "translate-x-4" : "translate-x-0"}`}></div>
                </div>
              </label>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Atalhos</p>
              <div className="flex flex-col gap-1">
                {[
                  { label: "As minhas candidaturas", icon: "ri-send-plane-line", href: "/perfil" },
                  { label: "Explorar vagas", icon: "ri-briefcase-line", href: "/vagas" },
                  { label: "O meu perfil", icon: "ri-user-line", href: "/perfil" },
                  { label: "Dashboard empresa", icon: "ri-dashboard-line", href: "/dashboard" },
                ].map((link) => (
                  <Link
                    key={link.href + link.label}
                    to={link.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-[#1A1A2E] transition-colors cursor-pointer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={link.icon}></i>
                    </div>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0 space-y-6">

            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total", value: totalCount, color: "text-[#1A1A2E]", bg: "bg-white", border: "border-gray-100" },
                { label: "Não lidas", value: unreadCount, color: "text-[#E8501A]", bg: "bg-orange-50", border: "border-orange-100" },
                { label: "Candidaturas", value: notifications.filter((n) => n.type === "candidatura").length, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                { label: "Vagas novas", value: notifications.filter((n) => n.type === "vaga").length, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Notifications grouped */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : groups.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-20 text-center px-6">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <i className="ri-notification-off-line text-gray-400 text-2xl"></i>
                </div>
                <h3 className="font-semibold text-[#1A1A2E] text-base">Nenhuma notificação</h3>
                <p className="text-sm text-gray-400 mt-1.5 max-w-xs">
                  {showOnlyUnread
                    ? "Não tens notificações por ler nesta categoria."
                    : "Ainda não tens notificações nesta categoria."}
                </p>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.label} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{group.label}</h4>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {group.items.map((notif) => (
                      <NotifCard
                        key={notif.id}
                        notif={notif}
                        onMarkRead={markRead}
                        onDelete={deleteNotif}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A2E] text-white text-sm px-5 py-3 rounded-xl z-50 flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-check-line text-emerald-400"></i>
          </div>
          {toastMsg}
        </div>
      )}

      <Footer />
    </div>
  );
}
