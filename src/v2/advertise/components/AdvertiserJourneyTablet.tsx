import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { JourneyTablet } from "@/v2/journeyStoryboard/tablet/JourneyTablet";

const QR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXAQAAAABZs+TBAAABJklEQVR4nK2TsUoEMRCG/5iFveqChcVBjluws7NTONjtfAkrn2BXsd3s+gL3PNetIKwvIQRvwfb2qhwmN1YiChMRnGqKP39mvj8RhM+iI3zVX3t4QFe02AI1rzckm+fQkmd9EoyTk/nZZvd4fRO7V951w6+zlekyrlEuKBGa3EY0rUDVg0TC705EtCJJRAfWJ9wiGUUwxbxhNdIUVjn7sH+KcDa9PORWdZrlDGqdrWGn4OeBn6Ya8GXu+bzk9tyq/q3BwPMJx11W7jOxXkb4jL2tU9TReYSDcRrphmcoD6kHYLoZyzAJCfSus/c/z37rDcl2PUxje2GcgCZoC94nAQDRy9XF6XvsHYbtPqPLFz53KCfF1ew1XbAaeEArpyvH5yX+6S9/AICaeA0Zv+6NAAAAAElFTkSuQmCC";
const scenes = ["Advert", "Report", "Passenger utility"] as const;

export function AdvertiserJourneyTablet() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (manual || reducedMotion) return;
    const delay = active === 0 ? 6000 : active === 1 ? 5000 : 4000;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % 3), delay);
    return () => window.clearTimeout(timer);
  }, [active, manual, reducedMotion]);

  return (
    <div className="advertiser-demo">
      <div className="advertiser-journey-tablet" aria-label="Interactive demonstration of a mydiio passenger screen">
        <JourneyTablet screenContent={
          <div className="advertiser-demo-screen">
            <div className={`advertiser-demo-scene advertiser-demo-ad ${active === 0 ? "is-active" : ""}`} aria-hidden={active !== 0}>
              <div className="advertiser-demo-ad-copy">
                <span className="advertiser-demo-brand">COLOMBO COFFEE CLUB <span>• CONCEPT AD</span></span>
                <strong>GOOD DAYS<br/>START <em>HERE.</em></strong>
                <span className="advertiser-demo-ad-sub">Your next coffee stop is calling.</span>
                <span className="advertiser-demo-ad-footer">COFFEE · CONVERSATION · COLOMBO</span>
              </div>
              <div className="advertiser-demo-ad-art">
                <div className="advertiser-demo-coffee"><div className="advertiser-demo-coffee-top"/><div className="advertiser-demo-coffee-straw"/></div>
                <div className="advertiser-demo-qr"><img src={QR} alt=""/><span>SCAN TO EXPLORE<br/>MYDIIO DEMO</span></div>
              </div>
            </div>
            <div className={`advertiser-demo-scene advertiser-demo-report ${active === 1 ? "is-active" : ""}`} aria-hidden={active !== 1}>
              <header><span>mydiio <b> / MONDAY REPORT</b></span><span className="advertiser-demo-pill">ILLUSTRATIVE DATA</span></header>
              <div className="advertiser-demo-report-title">Your campaign, accounted for.<small>Example weekly delivery summary · Colombo</small></div>
              <div className="advertiser-demo-metrics"><div><small>VERIFIED PLAYS</small><strong>1,284</strong><span>GPS-confirmed</span></div><div><small>DELIVERY RATE</small><strong>96%</strong><span>Of eligible plays</span></div><div><small>ACTIVE VEHICLES</small><strong>05</strong><span>Example coverage</span></div></div>
              <div className="advertiser-demo-bars"><span>MON</span><i style={{height:"42%"}}/><i style={{height:"68%"}}/><i style={{height:"54%"}}/><i style={{height:"83%"}}/><i style={{height:"100%"}}/><i style={{height:"74%"}}/><i style={{height:"61%"}}/><span>SUN</span></div>
              <footer>VERIFIED <b>96%</b> <span>PARTIAL <b>3%</b></span> <span>UNVERIFIED <b>1%</b></span></footer>
            </div>
            <div className={`advertiser-demo-scene advertiser-demo-utility ${active === 2 ? "is-active" : ""}`} aria-hidden={active !== 2}>
              <header><span>mydiio <b> / YOUR JOURNEY</b></span><span>COLOMBO · DEMO</span></header>
              <div className="advertiser-demo-utility-main"><div><small>GOOD AFTERNOON</small><strong>Enjoy the<br/>ride.</strong><p>Useful information, right where you need it.</p></div><div className="advertiser-demo-weather"><span>☀</span><strong>29°</strong><small>COLOMBO · EXAMPLE</small></div></div>
              <div className="advertiser-demo-utility-bottom"><div><small>YOUR JOURNEY</small><strong>Colombo city</strong><span>Local information on the move</span></div><div><small>SHARE YOUR JOURNEY</small><img src={QR} alt=""/><span>Demo QR · mydiio.com</span></div></div>
            </div>
          </div>
        } />
      </div>
      <div className="advertiser-demo-controls" aria-label="Tablet demonstration scenes">
        {scenes.map((scene, index) => <button key={scene} type="button" className={active === index ? "is-active" : ""} aria-pressed={active === index} onClick={() => {setActive(index);setManual(true);}}><span>{String(index + 1).padStart(2,"0")}</span> {scene}</button>)}
        {manual && <button type="button" className="advertiser-demo-resume" onClick={() => setManual(false)}>▶ Auto</button>}
      </div>
    </div>
  );
}
