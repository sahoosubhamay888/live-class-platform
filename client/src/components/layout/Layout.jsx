import Header from './Header';
import Footer from './Footer';

function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <>
      {showHeader && <Header />}
      <main className={`flex-grow ${showHeader ? 'pt-16' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default Layout;
