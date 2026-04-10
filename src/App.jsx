import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const getZodiacSign = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  return '';
};

const getRoleByGoal = (goal) => {
  switch (goal) {
    case 'Study': return 'Lead Researcher & Academic';
    case 'Career': return 'Chief Executive & Industry Leader';
    case 'Business': return 'Master Architect & Founder';
    case 'Fitness': return 'Elite Athlete & Wellness Guru';
    case 'Relationships': return 'Community Leader & Mentor';
    default: return `Master of ${goal || 'Your Path'}`;
  }
};

const getAdviceList = (goal, futureYear) => {
  const list = {
    Study: [
      `I know burning the midnight oil seems necessary now, but believe me, sleep is your greatest mental asset. By ${futureYear}, you'll truly understand that rest builds the mind.`,
      `That curiosity you have about adjacent fields? Keep pursuing it. Cross-disciplinary knowledge is what will set you apart.`
    ],
    Career: [
       `It might feel like you're stuck in a loop right now. Patience. Your consistency is being noticed even when you think it isn't.`,
       `Don't be afraid to take on that project nobody else wants. It's going to be the stepping stone you need.`
    ],
    Business: [
      `Stop trading your sleep for progress. In ${futureYear}, you'll realize rest was your actual engine for sustainable growth.`,
      `That small side project you're thinking about? Don't let it go. It becomes your primary asset very soon.`
    ],
    Fitness: [
       `Consistency over intensity, always. The days you don't feel like showing up are the ones that matter the most.`,
       `Listen to your body. Overtraining is a setback in disguise. By ${futureYear}, your mobility and recovery will be your pride.`
    ],
    Relationships: [
      `Investing in your loved ones is never wasted time. By ${futureYear}, the depth of your connections will be your greatest joy.`,
      `Learn to communicate your boundaries clearly and with kindness. It transforms every interaction you have.`
    ]
  };
  return list[goal] || [
    `Your unique focus on ${goal} is exactly where your intuition should be drawing you. Trust the process.`,
    `That individual vision you have? Don't let it go. It is quietly becoming your defining asset.`
  ];
};

// Simple Settings/Mock Modal
function ActionModal({ isOpen, onClose, title }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, w: '100vw', h: '100vh',
      width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', width: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>
          This feature is currently locked. Connect to the Neural Network first.
        </p>
        <button className="btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function Header({ onConsult, onOpenModal }) {
  return (
    <header className="header">
      <div className="header-logo">Future-Self Mentor</div>
      <nav className="header-nav">
        <a href="#timeline">Timeline</a>
        <a href="#oracle">Oracle</a>
        <a href="#growth">Growth</a>
        <a href="#legacy">Legacy</a>
      </nav>
      <div className="header-actions">
        <span className="material-symbols-outlined header-icon" onClick={() => onOpenModal('Chat Matrix')}>chat_bubble</span>
        <span className="material-symbols-outlined header-icon" onClick={() => onOpenModal('User Settings')}>account_circle</span>
        <button className="btn-primary" onClick={onConsult}>Consult Mentor</button>
      </div>
    </header>
  );
}

function Landing({ onStart }) {
  return (
    <section className="landing">
      <div className="landing-glow-1"></div>
      <div className="landing-glow-2"></div>
      <h1 className="landing-title">
        Meet Your <span>Future Self</span>
      </h1>
      <p className="landing-subtitle">
        Get guided by the version of you 5-10 years ahead. An ethereal interface designed to illuminate your path from the future back to today.
      </p>
      <button className="btn-primary landing-btn" onClick={onStart}>
        Start Your Journey
      </button>
    </section>
  );
}

function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    goal: 'Business',
    vision: ''
  });
  const [dobStr, setDobStr] = useState('');
  const dobRef = useRef(null);

  const predefinedGoals = ['Study', 'Career', 'Business', 'Fitness', 'Relationships'];
  const [isCustomGoal, setIsCustomGoal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dob) {
      const birthDate = new Date(formData.dob);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const computedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      const computedZodiac = getZodiacSign(formData.dob);
      onComplete({ ...formData, age: computedAge, zodiac: computedZodiac });
    } else {
      alert("Oops! Please ensure you have typed your exact Date of Birth properly. (DD/MM/YYYY)");
    }
  };

  return (
    <section className="onboarding max-w-4xl" id="onboarding">
      <div className="glass onboarding-card">
        <span className="material-symbols-outlined onboarding-icon">auto_awesome</span>
        <div className="onboarding-header">
          <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '2rem', marginBottom: '0.5rem' }}>Initialize Your Identity</h2>
          <p style={{ color: 'var(--on-surface-variant)' }}>Tell us where you are, so your future self can find you.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Current Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Alex Rivera"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <div className="form-input" style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                <input 
                  type="text" 
                  value={dobStr}
                  onChange={e => {
                    let val = e.target.value.replace(/\D/g, ''); 
                    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                    if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5, 9);
                    
                    setDobStr(val);
                    
                    if (val.length === 10) {
                      const parts = val.split('/');
                      const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                      if (!isNaN(d.getTime())) {
                        setFormData({...formData, dob: `${parts[2]}-${parts[1]}-${parts[0]}`});
                      }
                    } else {
                      setFormData({...formData, dob: ''});
                    }
                  }}
                  placeholder="DD/MM/YYYY"
                  pattern="\d{2}/\d{2}/\d{4}"
                  title="Please match DD/MM/YYYY exactly."
                  style={{ background: 'transparent', border: 'none', color: 'var(--on-surface)', flex: 1, outline: 'none', padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                  required
                />
                <span 
                  className="material-symbols-outlined" 
                  onClick={() => { try { dobRef.current?.showPicker() } catch(e){} }}
                  style={{ color: 'var(--primary)', marginRight: '1rem', cursor: 'pointer', textShadow: '0 0 8px var(--primary-glow)' }}
                >
                  calendar_month
                </span>
                <input 
                  type="date" 
                  ref={dobRef}
                  onChange={e => {
                    setFormData({...formData, dob: e.target.value});
                    const [y, m, d] = e.target.value.split('-');
                    if(y && m && d) setDobStr(`${d}/${m}/${y}`);
                  }}
                  style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, border: 0, opacity: 0, pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Gender Identity</label>
            <div className="chip-group">
              {['Male', 'Female', 'Other'].map(gender => (
                <label key={gender} className="chip-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                    className="chip-input" 
                  />
                  <div className="glass chip">{gender}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary North Star Goal</label>
            <div className="chip-group">
              {predefinedGoals.map(goal => (
                <label key={goal} className="chip-label">
                  <input 
                    type="radio" 
                    name="goal" 
                    value={goal}
                    checked={!isCustomGoal && formData.goal === goal}
                    onChange={e => {
                      setIsCustomGoal(false);
                      setFormData({...formData, goal: e.target.value});
                    }}
                    className="chip-input" 
                  />
                  <div className="glass chip">{goal}</div>
                </label>
              ))}
              <label key="Other" className="chip-label">
                  <input 
                    type="radio" 
                    name="goal" 
                    value="Other"
                    checked={isCustomGoal}
                    onChange={() => {
                      setIsCustomGoal(true);
                      setFormData({...formData, goal: ''});
                    }}
                    className="chip-input" 
                  />
                  <div className="glass chip">Other Specify...</div>
              </label>
            </div>
          </div>

          {isCustomGoal && (
            <div className="form-group" style={{ marginTop: '-1rem' }}>
              <input 
                type="text" 
                className="form-input glass" 
                placeholder="Type your unique aspiration..."
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
                required
                style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem', background: 'var(--surface-high)' }}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">What do you want your life to look like?</label>
            <textarea 
              className="form-textarea glass" 
              placeholder="Describe your ideal Tuesday in 10 years..."
              value={formData.vision}
              onChange={e => setFormData({...formData, vision: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn">
            Create My Future Self
          </button>
        </form>
      </div>
    </section>
  );
}

function OracleProfile({ user, activeYearOffset }) {
  const futureAge = parseInt(user.age) + activeYearOffset;
  const futureYear = new Date().getFullYear() + activeYearOffset;
  
  const hash = (user.name ? user.name.length : 0) + (user.goal ? user.goal.charCodeAt(0) : 0);
  const baseConf = 50 + (hash % 20); // 50 to 70 range based on user identity
  const baseNw = 1.0 + (hash % 5) * 0.2; 
  
  let confidenceInfo = baseConf;
  let nwInfo = baseNw;
  let filePrefix = user.gender === "Female" ? "avatar_female_" : "avatar_";
  let avatarImage = `/${filePrefix}0.png`;

  if (activeYearOffset === 2) {
    confidenceInfo = baseConf + 15;
    nwInfo = baseNw + 1.4;
    avatarImage = `/${filePrefix}2.png`;
  } else if (activeYearOffset === 5) {
    confidenceInfo = baseConf + 28;
    nwInfo = baseNw + 7.2;
    avatarImage = `/${filePrefix}5.png`;
  } else if (activeYearOffset === 10) {
    confidenceInfo = baseConf + 35;
    if (confidenceInfo > 99) confidenceInfo = 99;
    nwInfo = baseNw + 13.2;
    avatarImage = user.gender === "Female" ? `/${filePrefix}10.png` : "/future_self_avatar.png";
  }
  
  const nwDisplay = `+${nwInfo.toFixed(1)}x`;
  const confDisplay = `${confidenceInfo}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass profile-card">
        <div className="profile-avatar-container">
          <img 
            src={avatarImage} 
            alt="Future Self" 
            className="profile-avatar"
            key={avatarImage}
          />
          <div className="profile-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>verified</span>
          </div>
        </div>
        
        <h3 className="profile-name">
          {user.name} <span style={{ marginLeft: "6px" }}>{futureYear}</span>
        </h3>
        <p className="profile-role">{getRoleByGoal(user.goal)}</p>
        
        <div className="profile-tags">
          <span className="profile-tag">Age {futureAge}</span>
          <span className="profile-tag">{user.zodiac || 'Aries'}</span>
        </div>
        
        <div className="profile-divider"></div>
        
        <div className="profile-stats">
          <div>
            <p className="stat-label">Confidence</p>
            <p className="stat-value primary">{confDisplay}%</p>
          </div>
          <div>
            <p className="stat-label">Net Worth Delta</p>
            <p className="stat-value secondary">{nwDisplay}</p>
          </div>
        </div>
      </div>

      <div className="glass advice-card">
        <h4 className="advice-title">Core Advice</h4>
        <ul className="advice-list">
          {getAdviceList(user.goal, futureYear).map((adviceText, index) => (
            <li className="advice-item" key={index}>
              <span className="material-symbols-outlined advice-icon">
                {index === 0 ? 'lightbulb' : 'trending_up'}
              </span>
              <p className="advice-text">{adviceText}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OracleChat({ user, onOpenModal }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `I see your path clearly, ${user.name}. Trust your instincts, they are sharper than you think. What's on your mind?` }
  ]);
  const [input, setInput] = useState('');
  const [chatContext, setChatContext] = useState({ topic: 'general', interactionCount: 0 });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setChatContext(prev => ({...prev, interactionCount: prev.interactionCount + 1}));

    setTimeout(() => {
      const lInput = input.toLowerCase();
      let botResponse = '';
      
      const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      const isQuestion = input.includes('?');
      const hasHow = lInput.match(/\b(how)\b/);
      const hasWhy = lInput.match(/\b(why)\b/);
      const hasWhat = lInput.match(/\b(what)\b/);
      const hasWhen = lInput.match(/\b(when)\b/);
      
      if (lInput.match(/\b(hi|hello|hey|yo|greetings|howdy)\b/)) {
        botResponse = getRandom([
          `Hey! Always good connecting with my past self. What's going on right now?`,
          `Hi ${user.name}. Honestly it feels great talking to you. What's on your mind?`,
          `Hello! Ready to figure some things out together?`
        ]);
        setChatContext(p => ({...p, topic: 'greeting'}));
      } else if (lInput.match(/\b(tired|exhausted|burnout|quit|give up|hard|lazy|procrastinat|sleep)\b/)) {
        botResponse = getRandom([
          `It's completely okay to be exhausted. In fact, if you aren't resting enough, you're slowing us down. Take a break!`,
          `I know it feels impossibly hard right now. But looking back from my perspective, this exact phase is what forms our success.`,
          `You're not lazy, you're just running low on bandwidth. Go grab some rest. ${user.goal} can absolutely wait until tomorrow.`
        ]);
        setChatContext(p => ({...p, topic: 'motivation'}));
      } else if (lInput.match(/\b(fraud|fake|imposter|dumb|stupid|not good enough|fail|lose|scared)\b/)) {
        botResponse = getRandom([
          `Hey, totally get why you're worried. But honestly, messing up is just how we learn. Don't let the fear stop you! You've got this.`,
          `Everyone crashes and burns in the beginning. It's seriously no big deal. Think of it as a detour, not a dead end.`,
          `You can't play it safe and expect to grow. Take the risk! If you stumble, I'm right here cheering you on.`
        ]);
        setChatContext(p => ({...p, topic: 'imposter'}));
      } else if (lInput.match(/\b(meaning|purpose|lost|confused|future|idk|stuck)\b/)) {
        botResponse = getRandom([
          `Feeling lost is part of the algorithm. We all wander before we lock into our purpose. Your current focus on ${user.goal} is leading somewhere amazing, even if it feels blurry.`,
          `The future isn't a destination, it's something you're building right now. Don't stress too much about the 10-year master plan. Just win today.`,
          `It's totally fine to not have it all figured out, ${user.name}. Keep leaning into the things that spark your curiosity and ignore the rest.`
        ]);
        setChatContext(p => ({...p, topic: 'existential'}));
      } else if (lInput.match(/\b(friend|people|lonely|alone|partner|network|relationship|guy|girl)\b/)) {
        botResponse = getRandom([
          `Your circle is going to evolve. The people who belong in your future will catch up to you. Don't force connections that don't fit.`,
          `It can get lonely focusing heavily on ${user.goal}. But trust me, you are going to meet brilliant minds who understand you completely, very soon.`,
          `Protect your energy. The network you build today becomes your safety net tomorrow. Invest time strictly in people who inspire you.`
        ]);
        setChatContext(p => ({...p, topic: 'relationships'}));
      } else if (lInput.match(/\b(money|rich|invest|finance|cash|broke|pay)\b/)) {
         botResponse = getRandom([
             `Don't stress too much about the money right now. If you focus on getting un-ignorable at ${user.goal}, the cash flows in eventually. Promise!`,
             `Keep leveling up your skills first. The money is just a side effect of you being awesome at what you do.`,
             `Financial peace will totally come. Just keep grinding where it matters and the rest falls into place naturally.`
         ]);
        setChatContext(p => ({...p, topic: 'finance'}));
      } else if (lInput.match(/\b(job|work|boss|career|company)\b/)) {
         botResponse = getRandom([
             `If you're feeling stuck at work, use it as a stepping stone. Learn everything you can and plot your next cool move!`,
             `It's totally fine to outgrow your current spot. Just gather the skills you need and look for the next awesome adventure.`,
             `Don't let a boring day job drain your spark. Keep your eyes on the horizon. Things are going to look way different in a couple of years!`
         ]);
        setChatContext(p => ({...p, topic: 'career'}));
      } else if (isQuestion) {
        if (hasHow) {
          botResponse = getRandom([
            `Don't get paralyzed by the 'how'. Just break it down into the smallest possible step and tackle that in the next 24 hours.`,
            `The 'how' gets revealed as you walk the path. Start executing on the obvious tasks. The complicated strategies will naturally unfold.`,
            `Whenever you feel stuck, just pick the tiniest, easiest task to move forward. Momentum builds so fast!`
          ]);
        } else if (hasWhy) {
          botResponse = getRandom([
            `It sucks now, but it makes total sense looking backward from my timeline. It's meant to teach you resilience.`,
            `Some 'whys' don't have immediate answers. For now, accept the data point, pivot if needed, and keep moving forward.`,
            `It's happening this way to push you closer to leveling up in ${user.goal}. You'll thank yourself for going through this friction later.`
          ]);
        } else if (hasWhen) {
          botResponse = getRandom([
            `Sooner than you think, but later than you want. Stop watching the clock and get back to executing!`,
            `Patience! It happens exactly when you have built the infrastructure to sustain it. Focus purely on building the foundation.`,
            `The exact timeline is out of your hands. The only thing you can actually control is your effort today.`
          ]);
        } else if (hasWhat) {
          botResponse = getRandom([
            `That's a fantastic question. Honestly, I recommend you step away from the screen, take a walk without your phone, and let the answer find you.`,
            `You already know what to do. Look closely at your instincts around ${user.goal}. What is your gut genuinely telling you?`,
            `I don't have all the answers—even 10 years out. But taking decisive action on whatever you're pondering right now is the best move.`
          ]);
        } else {
          botResponse = getRandom([
            `Hmm. Try writing that down in a journal to untangle it. Sometimes the best answers come when we map it out on paper.`,
            `That's totally valid. But how does that align deeply with your core goals right now?`,
            `I think you're overthinking it. Keep it as simple as humanly possible.`
          ]);
        }
        setChatContext(p => ({...p, topic: 'question'}));
      } else {
         botResponse = getRandom([
             `I love the energy you bring to ${user.goal}. Honestly, just keep doing your thing—it’s totally working!`,
             `You've got really great instincts. Keep trusting yourself on this journey!`,
             `I'm super proud of where you're heading! Let's keep exploring what's possible.`
         ]);
      }
      
      if (Math.random() < 0.25 && chatContext.interactionCount > 2 && !isQuestion) {
        botResponse += getRandom([
          " By the way, are you remembering to actually drink water and rest?",
          ` Honestly, you're doing much better than you credit yourself for.`,
          " Let me ask you this though: what is your absolute biggest bottleneck today?"
        ]);
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, Math.random() * 800 + 700);
  };

  return (
    <div className="glass chat-container">
      <div className="chat-header">
        <div className="chat-status">
          <div className="status-dot"></div>
          <span>Neural Oracle Active</span>
        </div>
        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', cursor: 'pointer' }} onClick={() => onOpenModal('Oracle Settings')}>settings</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
             <div className="message-avatar">
               <span className="material-symbols-outlined">
                 {msg.sender === 'bot' ? 'psychology' : 'person'}
               </span>
             </div>
             <div className="message-bubble">
               {msg.text}
             </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Ask your future self a question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send" onClick={handleSend}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Timeline({ activeYearOffset, onSelectYear }) {
  const steps = [
    { year: 0, title: 'Now', heading: 'The Catalyst', desc: 'Initial realization and the first step toward the pivot. High uncertainty, high potential.' },
    { year: 2, title: 'Year +2', heading: 'The Deep Work', desc: 'Foundational growth. The results aren\'t visible to the world yet, but the roots are deep.' },
    { year: 5, title: 'Year +5', heading: 'Acceleration', desc: 'Exponential expansion. You reach a point of "unreasonable success" as your skills compound.' },
    { year: 10, title: 'Year +10', heading: 'The Legacy', desc: 'Mentorship and mastery. You are the version of yourself currently speaking to the past.' },
  ];

  return (
    <section className="timeline-section max-w-7xl" id="timeline">
      <h2 className="timeline-title">Your Projected <span>Timeline</span></h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-grid">
          
          {steps.map((step) => {
             const isActive = activeYearOffset === step.year;
             return (
              <div 
                key={step.year} 
                className="timeline-item" 
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectYear(step.year)}
              >
                <div className={`timeline-node ${isActive ? 'active' : ''}`} style={isActive ? {transform: 'scale(1.25)', borderColor: 'var(--primary)'} : {}}></div>
                <div className="glass timeline-card" style={isActive ? {backgroundColor: 'var(--surface-high)'} : {}}>
                  <p className={`timeline-year ${step.year % 2 !== 0 ? 'alt' : ''}`}>{step.title}</p>
                  <p className="timeline-heading">{step.heading}</p>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </div>
             );
          })}

        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content max-w-7xl">
        <div className="footer-logo">Future-Self Mentor</div>
        <p className="footer-text">© {new Date().getFullYear()} Future-Self Mentor. Guided by Light.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Existence</a>
          <a href="#">Neural Support</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [appState, setAppState] = useState('landing'); // landing, onboarding, dashboard
  const [userData, setUserData] = useState(null);
  const [activeYearOffset, setActiveYearOffset] = useState(10);
  const [modalState, setModalState] = useState({ isOpen: false, title: '' });

  const handleStart = () => {
    setAppState('onboarding');
    setTimeout(() => {
      document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOnboardingComplete = (data) => {
    setUserData(data);
    setAppState('dashboard');
  };

  const openModal = (title) => {
    setModalState({ isOpen: true, title });
  };

  return (
    <div className="app-container">
      <Header onConsult={() => setAppState(userData ? 'dashboard' : 'onboarding')} onOpenModal={openModal} />
      
      <main>
        {appState === 'landing' && <Landing onStart={handleStart} />}
        {appState === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
        
        {appState === 'dashboard' && userData && (
          <>
            <section className="dashboard max-w-7xl" id="oracle">
              <OracleProfile user={userData} activeYearOffset={activeYearOffset} />
              <OracleChat user={userData} onOpenModal={openModal} />
            </section>
            <Timeline activeYearOffset={activeYearOffset} onSelectYear={(year) => setActiveYearOffset(year)} />
          </>
        )}
      </main>

      <Footer />
      
      <ActionModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ isOpen: false, title: '' })} 
        title={modalState.title} 
      />
    </div>
  );
}
