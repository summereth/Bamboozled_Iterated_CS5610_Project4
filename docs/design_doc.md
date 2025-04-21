# Design Document

## Project Description

Bamboozled is an interactive quiz platform similar to Quizlet that allows users to test their knowledge through multiple-choice questions. The platform offers predefined quizzes on technical topics (AWS, React) and entertainment (FRIENDS TV show), while also enabling users to create custom quizzes by uploading files. Bamboozled tracks user progress and high scores using browser localStorage (eliminating the need for user accounts), creating an engaging learning environment accessible to users of all backgrounds.

## Core Features

### 1. Interactive Quiz Experience

- Multiple-choice question format with immediate feedback
- Score tracking and results display
- Simple, intuitive quiz interface

### 2. User Progress Tracking

- Local storage-based user data persistence (no account required)
- Quiz history and highest scores saved on user's device
- Optional: Account system for cross-device synchronization (future enhancement)

### 3. Predefined Quiz Library

- AWS certification preparation quizzes
- React development concept quizzes
- FRIENDS TV show trivia at various difficulty levels

### 4. Custom Quiz Creation

- File upload functionality (CSV, TXT, XLSX)
- Simple template system for quiz creation
- Options to keep quizzes private or share publicly

## User Personas

### 1. Alex - The Technology Professional

**Demographics**: 28-year-old software developer preparing for AWS certification

**Goals**:

- Study efficiently for certification exams
- Track progress to identify knowledge gaps

**Pain Points**:

- Limited time for study between work commitments
- Difficulty finding quality practice tests
- Needs focused content relevant to certification requirements

### 2. Sarah - The Entertainment Fan

**Demographics**: 24-year-old marketing coordinator and FRIENDS enthusiast

**Goals**:

- Test knowledge about favorite TV show
- Compete with friends for highest scores

**Pain Points**:

- Bored with static trivia websites
- Wants fresh content regularly
- Prefers mobile-friendly platforms for commute entertainment

### 3. Professor Rodriguez - The Educator

**Demographics**: 45-year-old Computer Science professor teaching React

**Goals**:

- Create custom quizzes for students
- Monitor student performance

**Pain Points**:

- Limited time to create assessment materials
- Needs easy-to-use tools that don't require technical setup
- Wants to provide students with self-assessment options

## User Stories

### For Alex (Technology Professional)

1. **Quiz Selection**: As Alex, I want to browse AWS certification quizzes by certification level (Associate, Professional, Specialty) so I can focus on relevant material.
2. **Progress Tracking**: As Alex, I want to see my performance history on previous quiz attempts so I can track my improvement over time.
3. **Knowledge Gap Identification**: As Alex, I want to review my incorrect answers after completing a quiz so I can focus my studies on weak areas.
4. **Study Time Management**: As Alex, I want to select quizzes of varying lengths (5, 10, or 20 questions) so I can fit study sessions into my busy schedule.
5. **Mobile Access**: As Alex, I want to access quizzes on my mobile device so I can study during my commute.

### For Sarah (Entertainment Fan)

1. **Difficulty Levels**: As Sarah, I want to select FRIENDS trivia quizzes by difficulty level so I can challenge myself as my knowledge improves.
2. **Social Sharing**: As Sarah, I want to share my quiz results on social media so I can challenge my friends.
3. **New Content**: As Sarah, I want to see newly added quizzes highlighted so I can find fresh content easily.
4. **Themed Quizzes**: As Sarah, I want to access season-specific or character-specific FRIENDS quizzes so I can test specialized knowledge.
5. **Leaderboard**: As Sarah, I want to see a local leaderboard of my previous attempts so I can try to beat my own records.

### For Professor Rodriguez (Educator)

1. **Custom Quiz Creation**: As Professor Rodriguez, I want to create custom React quizzes by uploading questions in a CSV file so I can provide tailored assessments.
2. **Quiz Templates**: As Professor Rodriguez, I want to use quiz templates so I can quickly create well-structured assessments.
3. **Quiz Sharing**: As Professor Rodriguez, I want to generate shareable links for my quizzes so students can access them easily.
4. **Question Bank**: As Professor Rodriguez, I want to maintain a personal question bank so I can reuse and remix questions for different classes.
5. **Quiz Analytics**: As Professor Rodriguez, I want to see aggregated quiz results if students share them so I can identify topics that need more classroom attention.

## Design Mockup

The complete design mockup is available in [Figma](https://www.figma.com/design/hZOJtxIxFm480Q9flBV4eZ/CS5610_Project_Design?node-id=16-2).
