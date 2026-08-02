import { Hero } from '../components/Hero';
import { Corridor } from '../components/Corridor';
import { CampaignBuilder } from '../components/CampaignBuilder';
import { FooterGame } from '../components/FooterGame';
import { Reveal } from '../motion';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">
                We show you the map
              </h2>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <div className="font-mono text-4xl text-amber">320K</div>
                  <div className="font-body text-sm text-ink/60">Colombo tuks</div>
                </div>
                <div>
                  <div className="font-mono text-4xl text-forest">1.1M</div>
                  <div className="font-body text-sm text-ink/60">National</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Corridor />
      <CampaignBuilder />

      <footer className="bg-ink py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl text-cream text-center mb-8">
              Take a ride
              <br />
              <span className="text-amber text-lg font-body">Collect verified plays</span>
            </h3>
            <FooterGame />
            
            <div className="mt-12 pt-8 border-t border-cream/10 text-center">
              <p className="font-mono text-xs text-cream/40">
                © mydiio 2026 · GPS-verified advertising
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a href="#" className="font-mono text-xs text-cream/40 hover:text-cream transition-colors">
                  Privacy
                </a>
                <a href="#" className="font-mono text-xs text-cream/40 hover:text-cream transition-colors">
                  Terms
                </a>
                <a href="#" className="font-mono text-xs text-cream/40 hover:text-cream transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
