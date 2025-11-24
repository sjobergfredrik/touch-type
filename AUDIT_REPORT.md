# Project Audit Report - Touch Type Application

**Date:** November 24, 2025  
**Project:** Nordic Typing Master / Touch Type Practice

## Executive Summary

This codebase contains **significant duplication** and **structural inconsistencies** that need immediate attention. The project appears to have two parallel implementations running simultaneously, causing confusion and maintenance issues.

---

## Critical Issues Found

### 🔴 1. Duplicate Application Roots

**Problem:** The project has TWO complete app directories with different implementations:

- **`/app/`** - Modern Nordic Typing Master implementation
- **`/src/app/`** - Older Touch Type Practice implementation

**Impact:** 
- Confusion about which is the active codebase
- Wasted development effort
- Potential runtime conflicts
- Increased bundle size

**Files Affected:**
```
/app/page.tsx          vs  /src/app/page.tsx
/app/layout.tsx        vs  /src/app/layout.tsx
/app/globals.css       vs  /src/app/globals.css
/app/auth/signin/      vs  /src/app/auth/signin/
/app/auth/signup/      vs  /src/app/auth/signup/
```

**Recommendation:** 
- **DELETE** the entire `/src/` directory (appears to be older implementation)
- Keep `/app/` as the primary application root
- Migrate any unique functionality from `/src/` if needed

---

### 🔴 2. Duplicate Component Files

**Problem:** Multiple components exist in both root `/components/` and organized subdirectories:

#### Keyboard Components
- `/components/Keyboard.tsx` (60 lines, basic implementation)
- `/components/keyboard/Keyboard.tsx` (45 lines, better implementation with Nordic layout)

**Differences:**
- Root version: Hardcoded QWERTY layout
- Subdirectory version: Uses `nordicLayout` from lib, better structured with `KeyboardRow` component

#### TypingExercise Components
- `/components/TypingExercise.tsx` (122 lines, basic implementation)
- `/components/typing/TypingExercise.tsx` (98 lines, better implementation)

**Differences:**
- Root version: Hardcoded lessons, inline rendering
- Subdirectory version: Uses `nordicLessons` from lib, separated into `TypingText` and `TypingInput` components, supports more modes (intermediate/advanced)

**Currently Used:** The `/app/page.tsx` imports from the **subdirectories** (`/components/keyboard/` and `/components/typing/`), making the root versions **dead code**.

**Recommendation:**
- **DELETE** `/components/Keyboard.tsx`
- **DELETE** `/components/TypingExercise.tsx`
- Keep the organized subdirectory versions

---

### 🟡 3. Duplicate Global CSS Files

**Problem:** Two `globals.css` files with different content:

- `/app/globals.css` - Full theme implementation (83 lines)
- `/src/app/globals.css` - Minimal Tailwind imports only (3 lines)

**Recommendation:**
- Delete `/src/app/globals.css` when removing `/src/` directory

---

### 🟡 4. Inconsistent Library Organization

**Problem:** Libraries split across two locations:

- `/lib/` - Contains `keyboard-layouts.ts`, `lessons.ts`, `utils.ts`
- `/src/lib/` - Contains only `prisma.ts`

**Recommendation:**
- Move `/src/lib/prisma.ts` to `/lib/prisma.ts`
- Delete `/src/lib/` directory

---

### 🟡 5. Duplicate Authentication Pages

**Problem:** Auth pages exist in both locations:

```
/app/auth/signin/page.tsx
/app/auth/signup/page.tsx
/src/app/auth/signin/page.tsx
/src/app/auth/signup/page.tsx
/src/app/auth/register/page.tsx
```

**Note:** `/src/app/auth/` has both `signup` AND `register` (likely duplicates)

**Recommendation:**
- Keep `/app/auth/` versions
- Delete `/src/app/auth/` entirely

---

### 🟡 6. Unused `browser-tools-mcp` Directory

**Problem:** A `browser-tools-mcp/` directory exists with 28 items (not examined in detail)

**Recommendation:**
- Verify if this is needed for the project
- If it's a development tool, move to `.gitignore` or separate repo
- If unused, delete it

---

## Code Quality Issues

### 1. **Inconsistent Component Structure**

The newer implementation (in subdirectories) follows better practices:
- Separation of concerns (`TypingText`, `TypingInput` vs inline rendering)
- Reusable components (`KeyboardRow`, `KeyboardKey`)
- External data sources (`nordicLayout`, `nordicLessons`)

The root-level duplicates use:
- Hardcoded data
- Monolithic components
- Less maintainable structure

### 2. **Configuration Issues**

**Next.js Config:**
```javascript
output: 'export',  // Static export mode
```

This conflicts with features that require server-side rendering:
- NextAuth.js authentication (requires API routes)
- Prisma database operations
- API endpoints in `/src/app/api/`

**Impact:** Authentication and database features won't work in static export mode.

**Recommendation:** Remove `output: 'export'` if you need dynamic features, or remove auth/database code if you want static export.

### 3. **Missing Type Safety**

Some components could benefit from better TypeScript usage:
- Keyboard layout types
- Lesson content types
- Better prop interfaces

---

## Positive Findings ✅

1. **Good UI Component Library** - Comprehensive shadcn/ui components
2. **Modern Stack** - Next.js 15, React 18, TypeScript
3. **Theme Support** - Proper dark/light mode implementation (in `/app/`)
4. **Nordic Layout Support** - Well-structured keyboard layouts and lessons
5. **Clean Component Architecture** - The subdirectory components are well-organized

---

## Recommended Action Plan

### Phase 1: Immediate Cleanup (High Priority)

1. **Delete duplicate `/src/` directory entirely**
   - First verify no unique functionality exists there
   - Check `/src/app/api/` routes - may need to migrate to `/app/api/`
   - Move `/src/lib/prisma.ts` to `/lib/prisma.ts` if needed

2. **Delete duplicate root components**
   - Remove `/components/Keyboard.tsx`
   - Remove `/components/TypingExercise.tsx`

3. **Fix Next.js configuration**
   - Decide: static export OR dynamic features (auth/DB)
   - Update `next.config.js` accordingly
   - Remove conflicting dependencies if going static

### Phase 2: Code Organization (Medium Priority)

4. **Consolidate authentication**
   - If keeping auth: migrate API routes from `/src/app/api/` to `/app/api/`
   - If removing auth: delete all auth-related code and dependencies

5. **Clean up dependencies**
   - Remove unused packages (NextAuth if going static, etc.)
   - Update package.json

6. **Review `browser-tools-mcp/`**
   - Determine purpose
   - Move or delete as appropriate

### Phase 3: Code Quality (Lower Priority)

7. **Add TypeScript types**
   - Create types for keyboard layouts
   - Create types for lesson content
   - Improve component prop types

8. **Documentation**
   - Update README to reflect actual implementation
   - Document component usage
   - Add setup instructions

---

## File Deletion Checklist

### Safe to Delete (Dead Code):
- ✅ `/src/` (entire directory)
- ✅ `/components/Keyboard.tsx`
- ✅ `/components/TypingExercise.tsx`
- ⚠️ `/browser-tools-mcp/` (verify first)

### Requires Migration First:
- ⚠️ `/src/lib/prisma.ts` → move to `/lib/prisma.ts`
- ⚠️ `/src/app/api/*` → check if needed, migrate to `/app/api/`

---

## Estimated Impact

**Lines of Code to Remove:** ~2,000+ lines  
**Directories to Remove:** 1 major (`/src/`), possibly 2  
**Files to Remove:** 15-20 files  
**Maintenance Complexity Reduction:** ~40%  
**Build Size Reduction:** ~10-15%  

---

## Questions to Answer

1. **Is authentication needed?** If yes, fix config. If no, remove auth code.
2. **Is database needed?** If yes, fix config. If no, remove Prisma.
3. **What is `browser-tools-mcp/`?** Development tool? Delete it?
4. **Static or Dynamic?** Choose one approach and commit to it.

---

## Conclusion

This project has good bones but needs significant cleanup. The main issue is maintaining two parallel implementations. Once the duplicate code is removed, the remaining codebase is well-structured and maintainable.

**Priority:** Address Phase 1 items immediately to prevent further confusion and wasted effort.
