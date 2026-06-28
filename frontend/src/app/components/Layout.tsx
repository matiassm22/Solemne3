import { Outlet, Link } from "react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { MenuNav } from "./MenuNav";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Inicio", path: "/" },
    { label: "Plantas", path: "/plantas" },
    { label: "Chatbot", path: "/chatbot" },
    { label: "Contacto", path: "/contacto" },
    { label: "Admin", path: "/login" },
  ];

  return (
    <div className="layout-principal">
      <header className="layout-header header">
        <div className="header__container">
          <div className="header__row">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <Leaf className="header__logo-icon" />
                <span className="header__logo-text">Huerto CESFAM</span>
              </Link>
            </div>
            
            <nav aria-label="Menú principal" className="header__nav">
               <MenuNav links={links} />
            </nav>

            <div className="header__mobile-toggle">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="header__mobile-btn"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <nav id="mobile-nav" aria-label="Menú móvil" className="header__mobile-nav">
            <MenuNav links={links} />
          </nav>
        )}
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <aside className="layout-sidebar">
        <div className="sticky top-24 space-y-4">
        
          <div className="sidebar-widget">
            <div className="sidebar-widget__header">
              <div className="sidebar-widget__icon-wrapper">
                <Leaf className="h-4 w-4" />
              </div>
              <h3 className="sidebar-widget__title">Huerto Comunitario</h3>
            </div>
            <p className="sidebar-widget__desc">
              Mantenido por voluntarios y profesionales del CESFAM Las Condes para la comunidad.
            </p>
            <div className="sidebar-widget__info-box">
              <p className="title">Horario de atención</p>
              <p>Lun – Vie: 08:00 – 17:00 hrs.</p>
            </div>
          </div>

          <div className="sidebar-widget">
            <h3 className="sidebar-widget__title" style={{ marginBottom: '0.75rem' }}>Accesos rápidos</h3>
            <nav aria-label="Accesos rápidos" className="sidebar-widget__nav">
              <Link to="/plantas" className="sidebar-widget__link">
                <span>🌿</span> Catálogo de plantas
              </Link>
              <Link to="/contacto" className="sidebar-widget__link">
                <span>✉</span> Formulario de contacto
              </Link>
              <Link to="/chatbot" className="sidebar-widget__link">
                <span>💬</span> Asistente virtual
              </Link>
              <Link to="/login" className="sidebar-widget__link">
                <span>🔒</span> Acceso administrador
              </Link>
            </nav>
          </div>

          <div className="sidebar-widget sidebar-widget--highlight">
            <p className="subtitle">Sabías que</p>
            <p className="text">
              La manzanilla es una de las plantas medicinales más antiguas del mundo, usada por más de 2.000 años.
            </p>
          </div>
        </div>
      </aside>

      <footer className="layout-footer footer">
        <div className="footer__container">
          <div className="footer__brand">
            <Leaf className="footer__icon" />
            <span>Huerto Comunitario CESFAM Las Condes</span>
          </div>
          <p className="footer__copy">© {new Date().getFullYear()} Todos los derechos reservados. Proyecto Educativo.</p>
        </div>
      </footer>
    </div>
  );
}