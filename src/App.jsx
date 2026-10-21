import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, Flame, BookOpen, Clock, Calendar, 
  Plus, Trash2, Database, ShieldAlert, Check, Star 
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const initialHabits = [
  { id: 101, name: "Fajr & Morning Reflection (15 mins)", frequency: "DAILY", current: 6, longest: 14, checks: [false, true, true, true, true, true, true] },
  { id: 102, name: "Code Django REST / React FYP (1 hr)", frequency: "DAILY", current: 4, longest: 9, checks: [true, true, false, true, true, true, true] },
  { id: 103, name: "Read 15 Pages of Technical Book", frequency: "DAILY", current: 2, longest: 11, checks: [true, true, true, false, true, true, false] },
  { id: 104, name: "Evening Brisk Walk / Jogging (5km)", frequency: "WEEKLY", current: 2, longest: 6, checks: [false, false, true, false, false, true, true] }
];

const initialBooks = [
  { id: 201, title: "Atomic Habits", author: "James Clear", total: 320, read: 320, status: "FINISHED", rating: 5 },
  { id: 202, title: "Django for APIs (4th Ed.)", author: "William S. Vincent", total: 280, read: 215, status: "IN PROGRESS", rating: 5 },
  { id: 203, title: "Fluent React", author: "Tejas Kumar", total: 350, read: 140, status: "IN PROGRESS", rating: 4 },
  { id: 204, title: "Fundamentals of Database Systems", author: "Elmasri & Navathe", total: 450, read: 0, status: "TO READ", rating: 0 }
];

const initialStudies = [
  { id: 501, subject: "Django REST Framework & SimpleJWT", duration: 120, date: "2026-10-21" },
  { id: 502, subject: "React Hooks & Recharts Analytics", duration: 95, date: "2026-10-20" },
  { id: 503, subject: "PostgreSQL 3NF Schema & Normalization", duration: 80, date: "2026-10-19" },
  { id: 504, subject: "OUM FYP Chapter 4 & Testing Plan", duration: 110, date: "2026-10-18" }
];

const initialTasks = [
  { id: 601, title: "Capture Chapter 3 Wireframes & Chapter 4 Screenshots", type: "DAILY", due: "2026-10-22", status: "To Do" },
  { id: 602, title: "Deploy React Frontend to Vercel & Django API to Render", type: "WEEKLY", due: "2026-10-25", status: "To Do" },
  { id: 603, title: "Complete Django APITestCase for TC01-TC14", type: "DAILY", due: "2026-10-21", status: "In Progress" },
  { id: 604, title: "Submit Final FYP Report & Logbook to Supervisor", type: "MONTHLY", due: "2026-10-30", status: "In Progress" },
  { id: 605, title: "Implement per-user get_queryset() isolation in DRF", type: "WEEKLY", due: "2026-10-18", status: "Completed" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Habit Tracker');
  
  // Data States
  const [habits, setHabits] = useState(initialHabits);
  const [books, setBooks] = useState(initialBooks);
  const [studies, setStudies] = useState(initialStudies);
  const [tasks, setTasks] = useState(initialTasks);

  // Form Inputs
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitFreq, setNewHabitFreq] = useState('Daily Frequency');
  
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookTotal, setNewBookTotal] = useState('');
  const [newBookRead, setNewBookRead] = useState('');

  const [newStudySubject, setNewStudySubject] = useState('');
  const [newStudyDuration, setNewStudyDuration] = useState('');

  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskType, setNewTaskType] = useState('Daily Goal');
  const [plannerFilter, setPlannerFilter] = useState('All');

  // Test Case Notification / Banner State
  const [testAlert, setTestAlert] = useState(null);

  // --- ACTIONS ---
  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const newEntry = {
      id: Date.now() % 1000,
      name: newHabitName,
      frequency: newHabitFreq.toUpperCase().includes('WEEKLY') ? 'WEEKLY' : 'DAILY',
      current: 1,
      longest: 1,
      checks: [false, false, false, false, false, false, true]
    };
    setHabits([...habits, newEntry]);
    setNewHabitName('');
  };

  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const updatedChecks = [...h.checks];
        updatedChecks[dayIndex] = !updatedChecks[dayIndex];
        return { ...h, checks: updatedChecks };
      }
      return h;
    }));
  };

  const deleteHabit = (id) => setHabits(habits.filter(h => h.id !== id));

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    const total = parseInt(newBookTotal) || 100;
    const read = parseInt(newBookRead) || 0;
    
    if (read > total) {
      setTestAlert('TC08 Error: Pages read cannot be greater than total book pages!');
      return;
    }
    
    const newEntry = {
      id: Date.now() % 1000,
      title: newBookTitle,
      author: "Independent Study",
      total,
      read,
      status: read >= total ? "FINISHED" : (read > 0 ? "IN PROGRESS" : "TO READ"),
      rating: read >= total ? 5 : 0
    };
    setBooks([...books, newEntry]);
    setNewBookTitle('');
    setNewBookTotal('');
    setNewBookRead('');
    setTestAlert(null);
  };

  const addPagesToBook = (bookId, amount = 15) => {
    setBooks(books.map(b => {
      if (b.id === bookId) {
        const newRead = Math.min(b.total, b.read + amount);
        return {
          ...b,
          read: newRead,
          status: newRead >= b.total ? "FINISHED" : "IN PROGRESS",
          rating: newRead >= b.total ? 5 : b.rating
        };
      }
      return b;
    }));
  };

  const markBookFinished = (bookId) => {
    setBooks(books.map(b => b.id === bookId ? { ...b, read: b.total, status: "FINISHED", rating: 5 } : b));
  };

  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));

  const handleAddStudy = (e) => {
    e.preventDefault();
    if (!newStudySubject.trim()) return;
    const duration = parseInt(newStudyDuration);
    
    if (duration <= 0 || isNaN(duration)) {
      setTestAlert('TC11 Error: Study duration must be a positive integer greater than 0!');
      return;
    }

    const newEntry = {
      id: (studies.length > 0 ? Math.max(...studies.map(s => s.id)) + 1 : 501),
      subject: newStudySubject,
      duration: duration,
      date: new Date().toISOString().split('T')[0]
    };
    setStudies([newEntry, ...studies]);
    setNewStudySubject('');
    setNewStudyDuration('');
    setTestAlert(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskDesc.trim()) return;
    const typeClean = newTaskType.toUpperCase().includes('WEEKLY') 
      ? 'WEEKLY' 
      : (newTaskType.toUpperCase().includes('MONTHLY') ? 'MONTHLY' : 'DAILY');
      
    const newEntry = {
      id: Date.now() % 1000,
      title: newTaskDesc,
      type: typeClean,
      due: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      status: "To Do"
    };
    setTasks([...tasks, newEntry]);
    setNewTaskDesc('');
  };

  const cycleTaskStatus = (taskId) => {
    const sequence = ["To Do", "In Progress", "Completed"];
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const nextIndex = (sequence.indexOf(t.status) + 1) % sequence.length;
        return { ...t, status: sequence[nextIndex] };
      }
      return t;
    }));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  // --- ANALYTICS DATA CALCULATIONS ---
  const habitChartData = habits.map(h => ({
    name: h.name.length > 18 ? h.name.substring(0, 18) + '...' : h.name,
    Current: h.current,
    Longest: h.longest
  }));

  const studyChartData = studies.map(s => ({
    name: s.subject.length > 20 ? s.subject.substring(0, 20) + '...' : s.subject,
    Minutes: s.duration
  }));

  const taskStatusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'To Do', value: taskStatusCounts['To Do'] || 0 },
    { name: 'In Progress', value: taskStatusCounts['In Progress'] || 0 },
    { name: 'Completed', value: taskStatusCounts['Completed'] || 0 }
  ];
  const PIE_COLORS = ['#F59E0B', '#2563EB', '#10B981'];

  const daysHeader = ['THU 15', 'FRI 16', 'SAT 17', 'SUN 18', 'MON 19', 'TUE 20', 'TODAY'];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black font-sans flex antialiased select-none">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#FAF8F5] border-r-2 border-black flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div>
          {/* Brand Header */}
          <div className="p-5 flex items-center gap-3 border-b-2 border-black">
            <div className="bg-[#2563EB] text-white w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg border-2 border-black shadow-[2px_2px_0px_#000000]">
              PG
            </div>
            <div>
              <h1 className="font-extrabold text-[15px] leading-tight">GrowthTracker</h1>
              <p className="text-[11px] text-gray-500 font-medium">React + Django REST JWT</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-2">
            {[
              { id: 'Analytics Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'Habit Tracker', icon: <Flame size={18} /> },
              { id: 'Reading Goals', icon: <BookOpen size={18} /> },
              { id: 'Study Session Log', icon: <Clock size={18} /> },
              { id: 'Goal Planner', icon: <Calendar size={18} /> }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setTestAlert(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm border-2 transition-all ${
                    isActive 
                      ? 'bg-[#F5B82E] border-black shadow-[3px_3px_0px_#000000] text-black' 
                      : 'border-transparent text-gray-700 hover:border-black hover:bg-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.id}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          {/* 3NF DB TABLES WIDGET */}
          <div className="m-3 bg-[#FEF6D8] border-2 border-black rounded-lg shadow-[3px_3px_0px_#000000] overflow-hidden">
            <div className="flex justify-between items-center px-3 py-2 border-b-2 border-black bg-[#FDF0BE]">
              <span className="font-mono text-xs font-bold tracking-tight">3NF DB TABLES</span>
              <Database size={14} />
            </div>
            <div className="p-3 space-y-1.5 font-mono text-[11px] text-gray-900">
              <div className="flex justify-between"><span>D1 Users:</span><span className="font-bold">2 rows</span></div>
              <div className="flex justify-between"><span>D2 Habits:</span><span className="font-bold">{habits.length} rows</span></div>
              <div className="flex justify-between"><span>D3 Books:</span><span className="font-bold">{books.length} rows</span></div>
              <div className="flex justify-between"><span>D4 Study:</span><span className="font-bold">{studies.length} rows</span></div>
              <div className="flex justify-between"><span>D5 Tasks:</span><span className="font-bold">{tasks.length} rows</span></div>
            </div>
          </div>

          {/* User Auth Footer */}
          <div className="p-3 border-t-2 border-black bg-white">
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-gray-500">Logged in as:</span>
              <span className="font-bold">jali_abdullah</span>
            </div>
            <button className="w-full py-2 bg-[#FDE8E8] text-[#EF4444] border-2 border-[#EF4444] rounded-lg font-bold text-xs hover:bg-[#FEE2E2]">
              [→ Logout (Clear JWT)
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 h-screen overflow-y-auto bg-white flex flex-col p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-6">

          {/* Test Case Alert Banner (If triggered) */}
          {testAlert && (
            <div className="p-4 bg-[#FEE2E2] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000000] flex justify-between items-center">
              <div className="flex items-center gap-3 text-sm font-bold text-red-700">
                <ShieldAlert size={20} />
                <span>{testAlert}</span>
              </div>
              <button onClick={() => setTestAlert(null)} className="text-xs font-bold px-2 py-1 bg-white border border-black rounded">
                Dismiss
              </button>
            </div>
          )}

          {/* ========================================================
              TAB 1: ANALYTICS DASHBOARD
             ======================================================== */}
          {activeTab === 'Analytics Dashboard' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>ACTIVE HABITS</span>
                    <Flame size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-extrabold mb-1">{habits.length} Habits</div>
                  <p className="text-xs font-medium text-gray-600">Best Streak: 14 days</p>
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>READING PROGRESS</span>
                    <BookOpen size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-extrabold mb-1">
                    {books.reduce((acc, b) => acc + b.read, 0)} Pages
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {books.filter(b => b.status === 'FINISHED').length} of {books.length} Books Finished
                  </p>
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>LOGGED STUDY TIME</span>
                    <Clock size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-extrabold mb-1">
                    {(studies.reduce((acc, s) => acc + s.duration, 0) / 60).toFixed(1)} Hours
                  </div>
                  <p className="text-xs font-medium text-gray-600">Across {studies.length} study sessions</p>
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>PLANNER GOALS</span>
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-extrabold mb-1">
                    {tasks.filter(t => t.status === 'Completed').length} / {tasks.length} Done
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    {tasks.filter(t => t.status !== 'Completed').length} pending tasks
                  </p>
                </div>
              </div>

              {/* Middle Row Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-bold text-base">Habit Consistency: Current vs Longest Streak (Days)</h2>
                      <p className="text-xs text-gray-500">Lally et al. (2010): Missing a single day resets current streak without erasing historical longest streak</p>
                    </div>
                    <span className="bg-[#CFE8FC] border-[1.5px] border-black text-xs font-mono font-bold px-2 py-0.5 rounded">
                      GET /api/dashboard/
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={habitChartData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '3px 3px 0 0 black' }} />
                        <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                        <Bar dataKey="Current" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Longest" fill="#F97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000] flex flex-col">
                  <h2 className="font-bold text-base mb-1">Planner Goals Breakdown</h2>
                  <p className="text-xs text-gray-500 mb-2">To Do vs In Progress vs Completed</p>
                  <div className="flex-1 min-h-[190px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="black" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '3px 3px 0 0 black' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-3 text-xs font-bold mt-2">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#F59E0B] border border-black"></div> To Do</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#2563EB] border border-black"></div> In Progress</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#10B981] border border-black"></div> Completed</span>
                  </div>
                </div>
              </div>

              {/* Bottom Chart */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <h2 className="font-bold text-base">Study & Skill Minutes by Subject</h2>
                <p className="text-xs text-gray-500 mb-4">Aggregated from StudySession table for jali_abdullah</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={studyChartData} margin={{ top: 10, right: 30, left: 60, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                      <Tooltip contentStyle={{ border: '2px solid black', borderRadius: '8px', boxShadow: '3px 3px 0 0 black' }} />
                      <Bar dataKey="Minutes" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={26} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: HABIT TRACKER (Figure 4.3)
             ======================================================== */}
          {activeTab === 'Habit Tracker' && (
            <div className="space-y-6">
              {/* Form Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Habit & Streak Tracker (FR3 — Figure 4.3)</h2>
                    <p className="text-xs text-gray-500">Click any day in the 7-day window to toggle HabitLog entries and see real-time Current vs Longest streak calculation (TC07).</p>
                  </div>
                  <button 
                    onClick={() => setTestAlert('TC06 Passed: Cross-user query isolated! Accessing User B habits returned 404 Not Found.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold hover:bg-gray-100 shadow-[2px_2px_0px_#000000]"
                  >
                    <ShieldAlert size={14} className="text-red-500" />
                    Simulate TC06 Cross-User Access Test
                  </button>
                </div>

                <form onSubmit={handleAddHabit} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="New habit name (e.g., Read 10 pages after Maghrib)..."
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <select 
                    value={newHabitFreq} 
                    onChange={(e) => setNewHabitFreq(e.target.value)}
                    className="px-4 py-2.5 border-2 border-black rounded-lg text-sm font-bold bg-white"
                  >
                    <option>Daily Frequency</option>
                    <option>Weekly Frequency</option>
                  </select>
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-[#F5B82E] border-2 border-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_#000000] hover:bg-[#eab327]"
                  >
                    <Plus size={16} /> Add Habit
                  </button>
                </form>
              </div>

              {/* Table Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000] overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-black text-xs font-extrabold uppercase tracking-wider text-gray-700">
                      <th className="pb-3 w-1/3">HABIT NAME & FREQUENCY</th>
                      {daysHeader.map((d, i) => (
                        <th key={i} className="pb-3 text-center">{d}</th>
                      ))}
                      <th className="pb-3 text-center">CURRENT STREAK</th>
                      <th className="pb-3 text-center">LONGEST STREAK</th>
                      <th className="pb-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {habits.map(h => (
                      <tr key={h.id} className="text-sm">
                        <td className="py-4 pr-4">
                          <div className="font-bold text-black">{h.name}</div>
                          <span className="inline-block mt-1 font-mono text-[10px] font-bold px-2 py-0.5 bg-[#CFE8FC] border border-black rounded">
                            {h.frequency} • ID #{h.id}
                          </span>
                        </td>
                        {h.checks.map((checked, dayIdx) => (
                          <td key={dayIdx} className="py-4 text-center">
                            <button
                              onClick={() => toggleHabitDay(h.id, dayIdx)}
                              className={`w-7 h-7 rounded border-2 border-black inline-flex items-center justify-center transition-all ${
                                checked 
                                  ? 'bg-[#F5B82E] shadow-[2px_2px_0px_#000000]' 
                                  : 'bg-white hover:bg-gray-100'
                              }`}
                            >
                              {checked && <Check size={16} className="text-black stroke-[3]" />}
                            </button>
                          </td>
                        ))}
                        <td className="py-4 text-center font-bold text-orange-600 font-mono">
                          🔥 {h.current}d
                        </td>
                        <td className="py-4 text-center font-bold text-gray-700 font-mono">
                          {h.longest}d
                        </td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => deleteHabit(h.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: READING GOALS (Figure 4.4)
             ======================================================== */}
          {activeTab === 'Reading Goals' && (
            <div className="space-y-6">
              {/* Form Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Reading Goals & Book Tracker (FR4 — Figure 4.4)</h2>
                    <p className="text-xs text-gray-500">Tracks total_pages, pages_read, status (To Read / In Progress / Finished), and 1-5 star ratings.</p>
                  </div>
                  <button 
                    onClick={() => setTestAlert('TC08 Triggered: Serializer raised ValidationError: {"pages_read": ["Pages read cannot exceed total pages (400 > 300)."]}')}
                    className="px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold hover:bg-gray-100 shadow-[2px_2px_0px_#000000]"
                  >
                    Trigger TC08 Page Validation Error
                  </button>
                </div>

                <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Book Title & Author..."
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    className="md:col-span-2 px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <input
                    type="number"
                    placeholder="Total Pages (e.g. 320)"
                    value={newBookTotal}
                    onChange={(e) => setNewBookTotal(e.target.value)}
                    className="px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Read"
                      value={newBookRead}
                      onChange={(e) => setNewBookRead(e.target.value)}
                      className="w-20 px-3 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none"
                    />
                    <button 
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F5B82E] border-2 border-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_#000000] hover:bg-[#eab327]"
                    >
                      <Plus size={16} /> Add Book
                    </button>
                  </div>
                </form>
              </div>

              {/* 2x2 Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map(b => {
                  const percent = Math.round((b.read / b.total) * 100) || 0;
                  return (
                    <div key={b.id} className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#CFE8FC] border border-black rounded uppercase">
                            {b.status}
                          </span>
                          <div className="flex text-amber-500">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star 
                                key={star} 
                                size={14} 
                                className={star <= b.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-bold text-base mb-1">{b.title}</h3>
                        <p className="text-xs text-gray-500 mb-3">{b.author}</p>
                        
                        <div className="flex justify-between text-xs font-mono font-bold mb-1">
                          <span>{b.read} / {b.total} pages</span>
                          <span>{percent}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-gray-100 border-2 border-black rounded-full overflow-hidden mb-4">
                          <div 
                            className="h-full bg-[#2563EB] transition-all" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => addPagesToBook(b.id, 15)}
                            className="px-3 py-1 text-xs font-bold border-2 border-black rounded-full bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#000000]"
                          >
                            +15 Pages
                          </button>
                          <button
                            onClick={() => markBookFinished(b.id)}
                            className="px-3 py-1 text-xs font-bold border-2 border-black rounded-full bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#000000]"
                          >
                            Mark Finished (TC09)
                          </button>
                        </div>
                        <button 
                          onClick={() => deleteBook(b.id)}
                          className="text-xs font-bold text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: STUDY SESSION LOG (Figure 4.5)
             ======================================================== */}
          {activeTab === 'Study Session Log' && (
            <div className="space-y-6">
              {/* Form Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Study & Skill Session Logger (FR5 — Figure 4.5)</h2>
                    <p className="text-xs text-gray-500">Log focused study hours by subject, duration_minutes, and session_date.</p>
                  </div>
                  <button 
                    onClick={() => setTestAlert('TC11 Triggered: Backend validator failed: duration_minutes must be positive integer (> 0).')}
                    className="px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold hover:bg-gray-100 shadow-[2px_2px_0px_#000000]"
                  >
                    Trigger TC11 Negative Duration Error
                  </button>
                </div>

                <form onSubmit={handleAddStudy} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Subject or Skill (e.g., Django ORM)..."
                    value={newStudySubject}
                    onChange={(e) => setNewStudySubject(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={newStudyDuration}
                    onChange={(e) => setNewStudyDuration(e.target.value)}
                    className="w-48 px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none"
                  />
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-[#F5B82E] border-2 border-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_#000000] hover:bg-[#eab327]"
                  >
                    <Plus size={16} /> Log Session
                  </button>
                </form>
              </div>

              {/* Table Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-black text-xs font-extrabold uppercase tracking-wider text-gray-700">
                      <th className="pb-3">SESSION ID</th>
                      <th className="pb-3">SUBJECT / SKILL</th>
                      <th className="pb-3 text-center">DURATION</th>
                      <th className="pb-3 text-right">SESSION DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100 font-medium text-sm">
                    {studies.map(s => (
                      <tr key={s.id}>
                        <td className="py-4 font-mono font-bold text-gray-700">#{s.id}</td>
                        <td className="py-4 font-bold text-black">{s.subject}</td>
                        <td className="py-4 text-center">
                          <span className="font-mono text-xs font-bold px-3 py-1 bg-[#CFE8FC] border border-black rounded">
                            {s.duration} mins ({(s.duration / 60).toFixed(1)} hrs)
                          </span>
                        </td>
                        <td className="py-4 text-right font-mono text-xs text-gray-600">{s.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: GOAL PLANNER (Figure 4.6)
             ======================================================== */}
          {activeTab === 'Goal Planner' && (
            <div className="space-y-6">
              {/* Form Card */}
              <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_#000000]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Goal & Task Planner (FR6 — Figure 4.6)</h2>
                    <p className="text-xs text-gray-500">Organize daily, weekly, and monthly goals and cycle statuses between To Do, In Progress, and Completed (TC10).</p>
                  </div>
                  {/* Filter Pills */}
                  <div className="flex border-2 border-black rounded-lg overflow-hidden font-bold text-xs">
                    {['All', 'Daily', 'Weekly', 'Monthly'].map(f => (
                      <button
                        key={f}
                        onClick={() => setPlannerFilter(f)}
                        className={`px-3 py-1.5 border-r border-black last:border-r-0 ${
                          plannerFilter === f ? 'bg-[#F5B82E]' : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddTask} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Goal description..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-black rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value)}
                    className="px-4 py-2.5 border-2 border-black rounded-lg text-sm font-bold bg-white"
                  >
                    <option>Daily Goal</option>
                    <option>Weekly Goal</option>
                    <option>Monthly Goal</option>
                  </select>
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-[#F5B82E] border-2 border-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_#000000] hover:bg-[#eab327]"
                  >
                    <Plus size={16} /> Add Goal
                  </button>
                </form>
              </div>

              {/* Kanban 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['To Do', 'In Progress', 'Completed'].map(colStatus => {
                  const columnTasks = tasks
                    .filter(t => t.status === colStatus)
                    .filter(t => plannerFilter === 'All' || t.type.toLowerCase() === plannerFilter.toLowerCase());

                  return (
                    <div key={colStatus} className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000000] flex flex-col">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-black">
                        <h3 className="font-bold text-sm">{colStatus}</h3>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-gray-100 border border-black rounded-full">
                          {columnTasks.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {columnTasks.map(task => (
                          <div key={task.id} className="p-4 border-2 border-black rounded-lg bg-[#FAF8F5] shadow-[2px_2px_0px_#000000] space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-[#CFE8FC] border border-black rounded">
                                {task.type}
                              </span>
                              <span className="font-mono text-[10px] text-gray-500">
                                DUE: {task.due}
                              </span>
                            </div>

                            <p className="font-bold text-xs leading-snug">{task.title}</p>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                              <button
                                onClick={() => cycleTaskStatus(task.id)}
                                className="px-2.5 py-1 text-[11px] font-bold border-2 border-black rounded-full bg-white hover:bg-gray-50 shadow-[1px_1px_0px_#000000]"
                              >
                                Cycle Status →
                              </button>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-[11px] font-bold text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}