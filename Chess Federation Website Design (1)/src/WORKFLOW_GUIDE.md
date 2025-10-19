# 🎯 Admin Registration Management Workflow

## Complete Step-by-Step Guide

### 📋 **How The System Works**

#### **Step 1: Player Registers (Public Website)**
1. Player visits the public website
2. Clicks on any tournament in the **Events** section
3. Clicks **"Register Now"** button
4. Fills out registration form:
   - Full Name
   - Email
   - Phone Number
   - Player Category (Open/Women/Junior/Senior)
   - Chess Rating (optional)
5. Submits registration
6. Gets confirmation: "Registration submitted! Awaiting admin approval."
7. Registration is saved with **"Pending"** status

---

#### **Step 2: Admin Login**
1. Click **"Admin Login"** button (bottom-left of homepage)
2. Enter credentials:
   - Email: `admin@dinajpurchess.org`
   - Password: `maheen1234`
3. Click **"Sign In"**
4. Redirected to **Admin Dashboard**

---

#### **Step 3: View Registrations**
1. In the admin sidebar, click **"Registrations"**
   - Badge shows pending count (e.g., "Registrations (5)")
2. You'll see the **Tournament Registrations** page with:

   **📊 Statistics Cards:**
   - ⏰ **Pending Review** (amber) - needs action
   - ✅ **Approved** (green) - accepted players
   - ❌ **Rejected** (red) - declined registrations

   **🔍 Filter Options:**
   - Search by player name, email, or phone
   - Filter by tournament
   - Filter by status (All/Pending/Approved/Rejected)

   **📑 Tabs:**
   - **All** - Shows all registrations
   - **Pending** - Only registrations needing review
   - **Approved** - Only approved players

---

#### **Step 4: Review Player Registration**
Each registration shows:
- ✅ **Player Name**
- 📧 **Email**
- 📱 **Phone**
- 🏆 **Tournament Name**
- 🎯 **Category** (Blitz/Rapid/Classical)
- ⭐ **Chess Rating**
- 🟡 **Status** (Pending/Approved/Rejected)
- 📅 **Registration Date**

---

#### **Step 5: Admin Actions**

**For Pending Registrations:**

✅ **APPROVE the Player:**
1. Click the green **"Approve"** button
2. Player status changes to **"Approved"**
3. Player is now registered for the tournament
4. Approved count increases automatically
5. Success notification appears

❌ **REJECT the Player:**
1. Click the red **"Reject"** button
2. Player status changes to **"Rejected"**
3. Player will not be allowed in the tournament
4. Success notification appears

🗑️ **DELETE the Registration:**
1. Click the trash icon
2. Confirmation dialog appears
3. Click **"Delete"** to confirm
4. Registration is permanently removed

---

### 🎯 **Two Ways to Manage Registrations**

#### **Option 1: Global Registrations Page** (Main Method)
- Click **"Registrations"** in sidebar
- See ALL registrations from ALL tournaments
- Manage everything in one place
- Best for: Reviewing all pending registrations at once

#### **Option 2: Event-Specific Management**
- Click **"Events"** in sidebar
- Click **"Manage"** on any specific event
- See only registrations for that tournament
- Edit event details (date, location, max participants)
- See capacity tracking and progress bar
- Best for: Managing a specific tournament

---

### 🔄 **Automatic Features**

1. **Badge Counter:**
   - Sidebar shows pending count: "Registrations (5)"
   - Updates in real-time

2. **Dashboard Stats:**
   - "Pending Registrations" card shows count
   - Highlights if > 0 registrations pending

3. **Capacity Tracking:**
   - Event Detail page shows: Approved/Maximum
   - Progress bar shows capacity percentage
   - Can't approve if event is full

4. **Real-Time Updates:**
   - Approve → Status updates immediately
   - Counts update automatically
   - Toast notifications confirm actions

---

### 📊 **Example Workflow**

```
Player "Rakibul Islam" registers for "Dinajpur Championship 2025"
                    ↓
            Status: PENDING
                    ↓
Admin logs in → Clicks "Registrations (1)"
                    ↓
Sees: Rakibul Islam | rakibul@email.com | +880 1XXX | Open | 1850
                    ↓
Admin clicks "Approve" ✅
                    ↓
Status: APPROVED | Success toast appears
                    ↓
Approved count: 45/128 | Progress bar updates
                    ↓
Player is now officially registered!
```

---

### ✅ **Admin Capabilities**

**What Admin Can Do:**
- ✅ View all player registrations
- ✅ Approve suitable players
- ✅ Reject unsuitable players
- ✅ Delete any registration
- ✅ Search and filter registrations
- ✅ Edit event details (date, location, capacity)
- ✅ Monitor tournament capacity
- ✅ Track approved vs. pending counts

**Automatic Safety Features:**
- 🛡️ Can't approve beyond maximum capacity
- 🛡️ Confirmation dialog before deletion
- 🛡️ Real-time capacity tracking
- 🛡️ Visual warnings when near capacity

---

### 🎨 **Visual Indicators**

**Status Colors:**
- 🟡 **Pending** - Amber (needs review)
- 🟢 **Approved** - Green (accepted)
- 🔴 **Rejected** - Red (declined)

**Category Badges:**
- 🟣 **Blitz** - Purple
- 🔵 **Rapid** - Blue
- 🟠 **Classical** - Amber

**Capacity Levels:**
- 🟢 **< 80% full** - Green progress bar
- 🟠 **80-99% full** - Amber progress bar
- 🔴 **100% full** - Red progress bar

---

### 🚀 **Quick Actions**

**From Dashboard:**
1. Click **"Review Registrations"** quick action
2. Goes directly to Registrations page

**From Events:**
1. Click **"Manage"** on any event
2. See event-specific registrations
3. Approve/reject directly from event page

---

### 📝 **Summary**

The complete registration system is **fully functional**:

1. ✅ Players can register from public website
2. ✅ Admin sees all registrations in one place
3. ✅ Admin can approve/reject/delete
4. ✅ Automatic counting and tracking
5. ✅ Real-time updates everywhere
6. ✅ Capacity enforcement
7. ✅ Beautiful visual feedback

**Everything is working perfectly!** 🎉

---

## 🔐 Default Admin Credentials

```
Email: admin@dinajpurchess.org
Password: maheen1234
```

---

*Last Updated: October 18, 2025*
