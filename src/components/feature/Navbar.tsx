import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notificacoesMock } from "@/mocks/notificacoes";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Vagas", href: "/vagas" },
  { label: "Empresas", href: "/empresas" },
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Sobre", href: "/sobre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const recentNotifs = notifications.slice(0, 5);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) setNotifications(data);
    };

    fetchNotifications();

    // Subscribe to real-time notifications
    const channel = supabase
      .channel(`user-notifs-${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        setNotifications(prev => [payload.new, ...prev].slice(0, 10));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleLogout = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isLight = scrolled || location.pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E8501A] to-[#C73E0C]">
            <i className="ri-briefcase-4-fill text-white text-lg"></i>
          </div>
          <span
            className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
              isLight ? "text-[#1A1A2E]" : "text-white"
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Estagia<span className="text-[#E8501A]">Angola</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                location.pathname === link.href
                  ? "text-[#E8501A]"
                  : isLight
                  ? "text-[#374151] hover:text-[#E8501A]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3" ref={userMenuRef}>
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                isLight
                  ? "hover:bg-gray-100 text-[#374151]"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <i className="ri-notification-3-line text-lg"></i>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center bg-[#E8501A] text-white text-xs font-bold rounded-full leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-gray-100 overflow-hidden z-50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1A1A2E] text-sm">Notificações</span>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-[#E8501A] text-white font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                    )}
                  </div>
                  <Link
                    to="/notificacoes"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline whitespace-nowrap"
                  >
                    Ver painel
                  </Link>
                </div>
                {recentNotifs.length > 0 ? recentNotifs.map((n) => {
                  const cfg = { icon: "ri-bell-line", bg: "bg-orange-50" };
                  if (n.type === "candidatura") { cfg.icon = "ri-send-plane-line"; cfg.bg = "bg-orange-50"; }
                  else if (n.type === "vaga") { cfg.icon = "ri-briefcase-line"; cfg.bg = "bg-violet-50"; }
                  else if (n.type === "entrevista") { cfg.icon = "ri-calendar-check-line"; cfg.bg = "bg-emerald-50"; }
                  else if (n.type === "perfil") { cfg.icon = "ri-user-line"; cfg.bg = "bg-amber-50"; }
                  else if (n.type === "sistema") { cfg.icon = "ri-settings-3-line"; cfg.bg = "bg-gray-100"; }
                  
                  const timeStr = new Date(n.created_at).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div
                      key={n.id}
                      onClick={() => { markAsRead(n.id); setNotifOpen(false); }}
                      className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors block ${
                        !n.is_read ? "bg-orange-50/40" : ""
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${cfg.bg} flex-shrink-0`}>
                        <i className={`${cfg.icon} text-[#E8501A] text-sm`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1A1A2E] leading-snug truncate">{n.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{n.content}</p>
                        <p className="text-[9px] text-gray-300 mt-1">{timeStr}</p>
                      </div>
                      {!n.is_read && <div className="w-2 h-2 bg-[#E8501A] rounded-full mt-1.5 flex-shrink-0"></div>}
                    </div>
                  );
                }) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-xs text-gray-400">Nenhuma notificação</p>
                  </div>
                )}
                <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                  <Link
                    to="/notificacoes"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-[#E8501A] font-medium cursor-pointer hover:underline"
                  >
                    Ver todas as notificações →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  isLight ? "border-gray-200 hover:border-[#E8501A]" : "border-white/30 hover:border-white"
                }`}
              >
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#E8501A] flex-shrink-0 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.nome} className="w-full h-full object-cover" />
                  ) : (
                    <i className="ri-user-line text-white text-xs"></i>
                  )}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap max-w-[120px] truncate ${isLight ? "text-[#1A1A2E]" : "text-white"}`}>
                  {user.nome.split(" ")[0]}
                </span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`ri-arrow-down-s-line text-sm ${isLight ? "text-gray-400" : "text-white/70"}`}></i>
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl border border-gray-100 overflow-hidden z-50" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-[#1A1A2E] truncate">{user.nome}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-orange-50 text-[#E8501A] px-2 py-0.5 rounded-full font-medium">
                      <i className={user.role === "estudante" ? "ri-graduation-cap-line" : "ri-building-2-line"}></i>
                      {user.role === "estudante" ? "Estudante" : "Empresa"}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link to="/perfil" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-user-line text-gray-400"></i></div>
                      O meu perfil
                    </Link>
                    {user.role === "empresa" && (
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-4 h-4 flex items-center justify-center"><i className="ri-dashboard-line text-gray-400"></i></div>
                        Dashboard
                      </Link>
                    )}
                    <Link to="/notificacoes" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#374151] hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-notification-3-line text-gray-400"></i></div>
                      Notificações
                      {unreadCount > 0 && <span className="ml-auto text-xs bg-[#E8501A] text-white font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors">
                      <div className="w-4 h-4 flex items-center justify-center"><i className="ri-logout-box-line"></i></div>
                      Terminar sessão
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isLight
                    ? "border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#1A1A2E]"
                }`}
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-sm font-medium px-5 py-2.5 rounded-lg bg-[#E8501A] text-white hover:bg-[#C73E0C] transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>

        {/* Mobile: sino + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <Link
            to="/notificacoes"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              isLight ? "text-[#374151] hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            <i className="ri-notification-3-line text-lg"></i>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center bg-[#E8501A] text-white text-xs font-bold rounded-full leading-none">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <button
            className={`w-10 h-10 flex items-center justify-center cursor-pointer ${
              isLight ? "text-[#1A1A2E]" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-[#374151] hover:text-[#E8501A] py-2.5 px-3 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Notificações recentes no mobile */}
          <div className="mt-3 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notificações</span>
                {unreadCount > 0 && (
                  <span className="text-xs bg-[#E8501A] text-white font-bold px-1.5 py-0.5 rounded-full leading-none">{unreadCount}</span>
                )}
              </div>
              <Link
                to="/notificacoes"
                onClick={() => setMenuOpen(false)}
                className="text-xs text-[#E8501A] font-medium cursor-pointer"
              >
                Ver todas →
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              {recentNotifs.map((n) => {
                const cfg = { icon: "ri-bell-line", bg: "bg-orange-50" };
                if (n.categoria === "candidatura") { cfg.icon = "ri-send-plane-line"; cfg.bg = "bg-orange-50"; }
                else if (n.categoria === "vaga") { cfg.icon = "ri-briefcase-line"; cfg.bg = "bg-violet-50"; }
                else if (n.categoria === "entrevista") { cfg.icon = "ri-calendar-check-line"; cfg.bg = "bg-emerald-50"; }
                else if (n.categoria === "perfil") { cfg.icon = "ri-user-line"; cfg.bg = "bg-amber-50"; }
                else if (n.categoria === "sistema") { cfg.icon = "ri-settings-3-line"; cfg.bg = "bg-gray-100"; }
                return (
                  <Link
                    key={n.id}
                    to="/notificacoes"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                      !n.lida ? "bg-orange-50/60" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${cfg.bg} flex-shrink-0 mt-0.5`}>
                      <i className={`${cfg.icon} text-[#E8501A] text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A2E] leading-snug line-clamp-1">{n.titulo}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.tempo}</p>
                    </div>
                    {!n.lida && <div className="w-2 h-2 bg-[#E8501A] rounded-full mt-2 flex-shrink-0"></div>}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 mt-3">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 bg-orange-50 rounded-xl">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E8501A] flex-shrink-0">
                    <i className="ri-user-line text-white text-sm"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A2E] truncate">{user.nome}</p>
                    <p className="text-xs text-gray-400 truncate">{user.role === "estudante" ? "Estudante" : "Empresa"}</p>
                  </div>
                </div>
                <Link to="/perfil" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-center py-2.5 rounded-lg border border-gray-200 text-[#374151] hover:border-[#E8501A] hover:text-[#E8501A] transition-all whitespace-nowrap cursor-pointer">
                  O meu perfil
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-sm font-medium text-center py-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all whitespace-nowrap cursor-pointer">
                  Terminar sessão
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-center py-2.5 rounded-lg border border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white transition-all whitespace-nowrap cursor-pointer"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="text-sm font-medium text-center py-2.5 rounded-lg bg-[#E8501A] text-white hover:bg-[#C73E0C] transition-all whitespace-nowrap cursor-pointer"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
