import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import {
  notificacoesMock,
  categoriaConfig,
  type Notificacao,
  type NotifCategoria,
  type NotifRole,
} from "@/mocks/notificacoes";

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
  notif: Notificacao;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const cfg = categoriaConfig[notif.categoria];

  return (
    <div
      className={`relative rounded-2xl border transition-all group ${
        notif.lida
          ? "bg-white border-gray-100"
          : "bg-orange-50/30 border-orange-200/60"
      }`}
    >
      {/* Unread dot */}
      {!notif.lida && (
        <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-[#E8501A] rounded-full flex-shrink-0"></div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon / Avatar */}
          <div className="relative flex-shrink-0">
            {notif.avatar ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100">
                <img src={notif.avatar} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ) : (
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${cfg.bg}`}>
                <i className={`${cfg.icon} ${cfg.color} text-xl`}></i>
              </div>
            )}
            {/* Category badge over avatar */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full ${cfg.bg} border-2 border-white`}>
              <i className={`${cfg.icon} ${cfg.color} text-xs`}></i>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="text-xs text-gray-400">{notif.tempo}</span>
            </div>
            <h3 className={`font-semibold text-sm leading-snug mb-1 ${notif.lida ? "text-[#374151]" : "text-[#1A1A2E]"}`}>
              {notif.titulo}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{notif.descricao}</p>

            {/* Actions */}
            {notif.acoes && notif.acoes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {notif.acoes.map((acao) => (
                  <Link
                    key={acao.label}
                    to={acao.href}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      acao.primary
                        ? "bg-[#E8501A] text-white hover:bg-[#C73E0C]"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {acao.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/80">
          <div className="flex items-center gap-1">
            {!notif.lida && (
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
            {notif.lida && (
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
  const [activeRole, setActiveRole] = useState<NotifRole>("estudante");
  const [activeCategoria, setActiveCategoria] = useState<string>("todas");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [notifs, setNotifs] = useState<Notificacao[]>(notificacoesMock);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  };

  const markAllRead = () => {
    setNotifs((prev) =>
      prev.map((n) => (n.role === activeRole ? { ...n, lida: true } : n))
    );
    showToast("Todas as notificações marcadas como lidas");
  };

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    showToast("Notificação removida");
  };

  const clearAll = () => {
    setNotifs((prev) => prev.filter((n) => n.role !== activeRole));
    showToast("Todas as notificações removidas");
  };

  const filtered = notifs.filter((n) => {
    const roleMatch = n.role === activeRole;
    const catMatch = activeCategoria === "todas" || n.categoria === activeCategoria;
    const readMatch = !showOnlyUnread || !n.lida;
    return roleMatch && catMatch && readMatch;
  });

  const unreadCount = notifs.filter((n) => n.role === activeRole && !n.lida).length;
  const totalByRole = notifs.filter((n) => n.role === activeRole).length;

  // Group by time
  const hoje = filtered.filter((n) => n.tempoMs < 86400000);
  const ontem = filtered.filter((n) => n.tempoMs >= 86400000 && n.tempoMs < 172800000);
  const anterior = filtered.filter((n) => n.tempoMs >= 172800000);

  const groups: { label: string; items: Notificacao[] }[] = [
    { label: "Hoje", items: hoje },
    { label: "Ontem", items: ontem },
    { label: "Anteriores", items: anterior },
  ].filter((g) => g.items.length > 0);

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
              <p className="text-sm text-white/50 mt-1">{totalByRole} notificações no total</p>
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

            {/* Role switcher */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Vista</p>
              <div className="flex flex-col gap-2">
                {(["estudante", "empresa"] as NotifRole[]).map((role) => {
                  const count = notifs.filter((n) => n.role === role && !n.lida).length;
                  return (
                    <button
                      key={role}
                      onClick={() => { setActiveRole(role); setActiveCategoria("todas"); }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        activeRole === role
                          ? "bg-orange-50 text-[#E8501A]"
                          : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A2E]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <i className={role === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"}></i>
                        </div>
                        {roleLabels[role]}
                      </div>
                      {count > 0 && (
                        <span className="text-xs font-bold bg-[#E8501A] text-white w-5 h-5 flex items-center justify-center rounded-full">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categoria</p>
              <div className="flex flex-col gap-1">
                {categorias.map((cat) => {
                  const count = notifs.filter(
                    (n) =>
                      n.role === activeRole &&
                      (cat.value === "todas" || n.categoria === (cat.value as NotifCategoria))
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
                { label: "Total", value: notifs.filter((n) => n.role === activeRole).length, color: "text-[#1A1A2E]", bg: "bg-white", border: "border-gray-100" },
                { label: "Não lidas", value: unreadCount, color: "text-[#E8501A]", bg: "bg-orange-50", border: "border-orange-100" },
                { label: "Candidaturas", value: notifs.filter((n) => n.role === activeRole && n.categoria === "candidatura").length, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                { label: "Vagas novas", value: notifs.filter((n) => n.role === activeRole && n.categoria === "vaga").length, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Notifications grouped */}
            {groups.length === 0 ? (
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
                {showOnlyUnread && (
                  <button
                    onClick={() => setShowOnlyUnread(false)}
                    className="mt-4 text-sm text-[#E8501A] font-medium hover:underline cursor-pointer"
                  >
                    Ver todas
                  </button>
                )}
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{group.label}</h4>
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-xs text-gray-400">{group.items.length}</span>
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
