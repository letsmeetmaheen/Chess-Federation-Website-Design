import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import About from './components/About';
import Committee from './components/Committee';
import Events from './components/Events';
import Rankings from './components/Rankings';
import Gallery from './components/Gallery';
import Practice from './components/Practice';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <StatsCounter />
        <About />
        <Committee />
        <Events />
        <Rankings />
        <Gallery />
        <Practice />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
