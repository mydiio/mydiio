import React, { useState } from 'react';
import { Reveal } from '../motion';

type Plan = 'roamer' | 'voyager' | 'pioneer' | 'horizon';
type TimeSlot = 'off-peak' | 'standard' | 'peak';

const PLAN_PRICES = {
  roamer: 25000,
  voyager: 38000,
  pioneer: 25000,
  horizon: 0,
};

const TIME_MULTIPLIERS = {
  'off-peak': 0.8,
  'standard': 1,
  'peak': 1.3,
};

export function CampaignBuilder() {
  const [plan, setPlan] = useState<Plan>('roamer');
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('standard');
  const [topUpMinutes, setTopUpMinutes] = useState(0);

  const basePrice = PLAN_PRICES[plan];
  const multiplier = TIME_MULTIPLIERS[timeSlot];
  const topUpRate = plan === 'pioneer' ? 25000 / 60 : basePrice / 60;
  const totalPrice = (basePrice * multiplier) + (topUpMinutes * topUpRate);

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl text-center text-ink mb-4">
            Build your campaign
          </h2>
          <p className="text-center text-ink/60 font-body max-w-lg mx-auto mb-12">
            Estimate your campaign cost. Confirmed at signup.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <label className="font-mono text-sm text-ink/60 block mb-3">Select plan</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['roamer', 'voyager', 'pioneer', 'horizon'] as Plan[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                    plan === p 
                      ? 'bg-amber text-ink font-medium' 
                      : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                  {p === 'pioneer' && (
                    <span className="block text-[10px] text-amber font-mono">10 spots ever</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="font-mono text-sm text-ink/60 block mb-3">Time slot</label>
            <div className="grid grid-cols-3 gap-3">
              {(['off-peak', 'standard', 'peak'] as TimeSlot[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeSlot(t)}
                  className={`px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                    timeSlot === t 
                      ? 'bg-amber text-ink font-medium' 
                      : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                  }`}
                >
                  {t.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  {t === 'peak' && <span className="block text-[10px] text-amber font-mono">+30%</span>}
                  {t === 'off-peak' && <span className="block text-[10px] text-forest font-mono">-20%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="font-mono text-sm text-ink/60 block mb-3">
              Top-up minutes: {topUpMinutes}
            </label>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={topUpMinutes}
              onChange={(e) => setTopUpMinutes(Number(e.target.value))}
              className="w-full accent-amber"
            />
          </div>

          <div className="border-t border-ink/10 pt-6">
            <div className="flex justify-between text-sm font-mono text-ink/60 mb-2">
              <span>Base price</span>
              <span>LKR {basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-mono text-ink/60 mb-2">
              <span>Time multiplier</span>
              <span>× {multiplier}</span>
            </div>
            {topUpMinutes > 0 && (
              <div className="flex justify-between text-sm font-mono text-ink/60 mb-4">
                <span>Top-up ({topUpMinutes} min)</span>
                <span>LKR {(topUpMinutes * topUpRate).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-display text-ink pt-4 border-t border-ink/10">
              <span>Total estimate</span>
              <span className="text-amber">LKR {totalPrice.toLocaleString()}</span>
            </div>
            <button className="w-full mt-6 px-8 py-3 bg-amber text-ink font-medium rounded-lg hover:bg-deep-amber transition-colors">
              Claim this spot
            </button>
            <p className="text-center text-xs text-ink/40 font-mono mt-3">
              Estimate confirmed at signup
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
