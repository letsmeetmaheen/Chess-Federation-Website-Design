# Association of Chess Player Bangladesh - Dinajpur Branch

## 🎯 Dynamic Admin-Controlled Website

A fully editable, real-time chess federation website with comprehensive admin panel.

### ✨ Key Features

- **🔐 Secure Admin Panel** - Login with `admin@dinajpurchess.org` / `maheen1234`
- **⚡ Real-Time Updates** - All admin changes instantly reflect on the public website
- **🎨 Royal Design** - Purple, blue, and gold color scheme with glassmorphism effects
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **🌐 Bengali Support** - Full support for Bengali language content
- **🎭 Smooth Animations** - Liquid glass transitions and royal glow effects

### 🏗️ Architecture

#### Public Website
- **Home** - Hero with live announcements, floating chess pieces
- **About** - Mission, vision, and journey timeline
- **Committee** - Dynamic member grid (controlled from admin)
- **Events** - Tournament listings with countdown timers
- **Rankings** - Player leaderboard with ratings
- **Gallery** - Masonry image grid
- **Practice** - Chess puzzles and training
- **Contact** - Contact form with live settings

#### Admin Panel
1. **Dashboard** - Stats, charts, and quick actions
2. **Committee Members** - Add/edit/delete members with Bengali names
3. **Events** - Full tournament management (Blitz/Rapid/Classical)
4. **Players** - Ranking management with drag-and-drop
5. **Gallery** - Media upload with visibility controls
6. **Announcements** - News ticker management
7. **Puzzles** - Practice zone content
8. **Settings** - Site configuration (name, contact, social links)

### 🔄 Data Flow

All data is managed through React Context:
```
Admin Panel → DataContext → Public Website
```

- **Live Updates**: Changes in admin instantly update the public site
- **No Page Refresh**: Real-time synchronization
- **Persistent State**: Data maintained in browser session

### 🎨 Design System

**Colors:**
- Royal Purple: #6B46C1, #8B5CF6
- Royal Blue: #1E3A8A, #3B82F6  
- Royal Gold: #D4AF37, #F59E0B
- Royal Burgundy: #7C2D12, #991B1B

**Effects:**
- Glassmorphism (backdrop blur)
- Liquid morph animations
- Royal glow pulses
- Gel transitions
- Elastic bounces

### 🚀 Quick Start

1. Click "Admin Login" button (bottom-left on homepage)
2. Login with default credentials
3. Navigate to any admin section
4. Add/edit content - changes appear immediately
5. Click "View Website" to see live results

### 📝 Default Admin Credentials

```
Email: admin@dinajpurchess.org
Password: maheen1234
```

### 🌍 Sections Managed from Admin

- ✅ Committee members (name, role, photo, bio)
- ✅ Events & tournaments (title, date, location, category)
- ✅ Player rankings (name, rating, photo, trend)
- ✅ Gallery images (upload, caption, visibility)
- ✅ News announcements (pinned to homepage ticker)
- ✅ Practice puzzles (difficulty, FEN notation)
- ✅ Site settings (contact info, social links)

### 🎯 Live Preview

Each admin page includes:
- **Real-time preview indicators**
- **Success toast notifications**
- **Confirmation dialogs**
- **Data validation**
- **Auto-save functionality**

### 🔒 Security

- Authentication required for admin access
- Protected routes
- Secure logout
- No direct data manipulation from public site

### 📱 Responsive Design

- Desktop-first design
- Tablet-optimized layouts
- Mobile-friendly navigation
- Touch-optimized interactions

### 🎭 Animations

- Floating chess pieces on hero
- Parallax scrolling effects
- Hover state transitions
- Loading animations
- Microinteractions throughout

---

**Built with:** React, TypeScript, Tailwind CSS, Motion (Framer Motion), ShadCN UI
**Design System:** Royal chess theme with glassmorphism and liquid transitions
