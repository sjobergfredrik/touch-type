# Touch Typing App Enhancement Project

## Project Overview
Enhance the existing Next.js touch typing application by adding user authentication, lesson progression tracking, and an expanded lesson system.

## Phase 1: Database Setup & Authentication

### 1.1 Database Implementation
- Set up PostgreSQL database using Prisma as ORM
- Create initial schema for:
  ```prisma
  model User {
    id            String    @id @default(cuid())
    email         String    @unique
    name          String?
    password      String    // Hashed
    interests     Json      // Stores UserInterests object
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt
    progress      Progress[]
    statistics    Statistics[]
    contentHistory ContentHistory[]
  }

  model ContentHistory {
    id            String    @id @default(cuid())
    userId        String
    contentId     String    // Original content identifier (e.g., song ID, article ID)
    contentType   String    // e.g., "lyrics", "game_guide", "sports_news"
    usedInLesson  DateTime
    performance   Json      // Stores performance data for this content
    user          User      @relation(fields: [userId], references: [id])
  }

  model Lesson {
    id            String    @id @default(cuid())
    title         String
    description   String
    difficulty    String
    content       Json      // Lesson content structure
    order         Int       // For sequence
    category      String    // e.g., "basics", "advanced"
    progress      Progress[]
  }

  model Progress {
    id            String    @id @default(cuid())
    userId        String
    lessonId      String
    completed     Boolean   @default(false)
    accuracy      Float
    wpm           Float
    attempts      Int       @default(0)
    lastAttempt   DateTime  @default(now())
    user          User      @relation(fields: [userId], references: [id])
    lesson        Lesson    @relation(fields: [lessonId], references: [id])
  }

  model Statistics {
    id            String    @id @default(cuid())
    userId        String
    date          DateTime  @default(now())
    averageWPM    Float
    averageAccuracy Float
    totalTime     Int      // in minutes
    user          User     @relation(fields: [userId], references: [id])
  }
  ```

### 1.2 Authentication System
- Implement NextAuth.js for authentication
- Create authentication API routes
- Set up email/password and OAuth providers (Google, GitHub)
- Implement protected routes and middleware
- Create login, register, and password reset pages

## Phase 2: Lesson System Enhancement

### 2.1 Personalized Lesson Content Structure
- Create JSON schema for lesson content and user interests:
  ```typescript
  interface UserInterests {
    primaryInterests: string[];    // e.g., ["Taylor Swift", "Gaming", "Basketball"]
    subCategories: {              // e.g., {"Taylor Swift": ["Midnights", "1989", "Folklore"]}
      [key: string]: string[];
    };
    contentPreferences: {
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      preferredLength: 'short' | 'medium' | 'long';
      includeTheory: boolean;
    };
  }

  interface LessonContent {
    sections: {
      type: 'practice' | 'theory';
      content: string;
      source?: string;           // e.g., "Taylor Swift - Anti-Hero lyrics"
      category: string;          // e.g., "music", "gaming", "sports"
      difficulty: string;
      expectedTime?: number;
      repetitions?: number;
    }[];
    requirements?: {
      minWPM: number;
      minAccuracy: number;
    };
    metadata: {
      interestTag: string[];     // e.g., ["Taylor Swift", "pop music"]
      contentType: string;       // e.g., "lyrics", "game description", "news"
    };
  }
  ```

### 2.2 Interest-Based Content Generation System

#### 2.2.1 Interest Profile Setup
- Create onboarding flow to capture user interests:
  - Primary interests selection (e.g., music, gaming, sports, technology)
  - Specific subcategories (e.g., favorite artists, games, teams)
  - Content preferences (length, difficulty, theory inclusion)

#### 2.2.2 Content Sources Integration
- Implement API integrations for various content sources:
  - Music: Lyrics APIs for different artists/genres
  - Gaming: Game wikis, patch notes, strategy guides
  - Sports: Team statistics, match reports, player bios
  - Movies/TV: Plot summaries, reviews, character descriptions
  - Technology: Tech news, product reviews, tutorials
  - Custom content APIs based on user interests

#### 2.2.3 Dynamic Lesson Generation
- Create lesson generation engine that:
  - Pulls content from relevant APIs based on user interests
  - Formats content into appropriate typing exercises
  - Maintains difficulty progression
  - Ensures content variety
  - Includes relevant vocabulary and terms from interest areas

#### 2.2.4 Base Lesson Categories
Still maintain core typing fundamentals:
  - Basics (home row, upper row, lower row)
  - Common Words
  - Numbers and Symbols
  - Speed Training
  - Accuracy Focus
But integrate interest-based content within each category

### 2.3 Progress Tracking
- Create progress tracking system
- Implement analytics dashboard for users
- Add achievement/badge system

## Phase 3: User Interface Enhancements

### 3.1 Dashboard Implementation
- Create user dashboard with:
  - Progress overview
  - Recent activity
  - Achievement badges
  - Personal statistics
  - Recommended next lessons

### 3.2 Enhanced Practice Interface
- Real-time WPM calculation
- Accuracy tracking
- Error highlighting
- Progress indicators
- Heat map for problem keys

### 3.3 Analytics and Statistics
- Implement detailed statistics tracking:
  - WPM over time
  - Accuracy trends
  - Problem characters
  - Practice time
  - Completion rates

## Phase 4: API Implementation

### 4.1 Content Generation System
- Implement content fetching and processing:
  ```typescript
  interface ContentProvider {
    fetchContent(interest: string, params: ContentParams): Promise<RawContent[]>;
    processContent(content: RawContent): LessonContent;
    validateContent(content: LessonContent): boolean;
  }
  
  interface ContentParams {
    difficulty: string;
    length: number;
    type: string[];
    excludeExisting: string[]; // Already used content IDs
  }
  ```

- Create content providers for different interests:
  - MusicContentProvider (lyrics, artist bios, album reviews)
  - GamingContentProvider (game guides, patch notes, lore)
  - SportsContentProvider (match reports, player stats)
  - CustomContentProvider (for specialized interests)

### 4.2 Core API Endpoints
```typescript
// Required API routes
POST   /api/auth/*            // Authentication routes
GET    /api/lessons          // Get available lessons
GET    /api/lessons/:id      // Get specific lesson
POST   /api/progress         // Update lesson progress
GET    /api/progress/:userId // Get user progress
GET    /api/stats/:userId    // Get user statistics
POST   /api/stats            // Update user statistics
```

### 4.2 API Security
- Implement rate limiting
- Add request validation
- Set up CORS configuration
- Add API authentication middleware

## Phase 5: Testing & Deployment

### 5.1 Testing Requirements
- Unit tests for:
  - Authentication flow
  - Progress tracking
  - Statistics calculations
  - Lesson completion logic
- Integration tests for:
  - API endpoints
  - Database operations
  - User flows

### 5.2 Deployment Checklist
- Database migration strategy
- Environment configuration
- Build optimization
- CI/CD pipeline setup
- Monitoring implementation

## Technical Requirements

### Development Stack
- Next.js 15.1.0
- React 18.2.0
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Existing UI components (Radix UI)

### Security Requirements
- Password hashing with bcrypt
- JWT token implementation
- CSRF protection
- XSS prevention
- Rate limiting
- Input sanitization

### Performance Targets
- Page load time < 2s
- Time to Interactive < 3s
- First Input Delay < 100ms
- Core Web Vitals optimization

## Implementation Notes
1. Maintain existing component structure
2. Follow established coding patterns
3. Document all new components and APIs
4. Implement proper error handling
5. Add logging for critical operations
6. Consider accessibility throughout implementation

## Future Considerations
- Multiplayer typing races
- Custom lesson creation
- Social features (friends, leaderboards)
- Integration with external typing platforms
- Mobile app development

Remember to maintain the existing project structure and coding standards while implementing these new features.