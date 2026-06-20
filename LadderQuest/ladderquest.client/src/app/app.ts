import { Component, OnInit } from '@angular/core';

interface StatItem {
  label: string;
  value: string;
  icon: string;
  accent: 'amber' | 'cyan' | 'violet' | 'rose';
}

interface StepItem {
  title: string;
  text: string;
  icon: string;
}

interface PlayerItem {
  name: string;
  points: string;
  badge: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = 'LadderQuest';

  showGame = false;

  stats: StatItem[] = [
    { label: 'Current Streak', value: '12', icon: '🔥', accent: 'amber' },
    { label: 'Solved Today', value: '08', icon: '✅', accent: 'cyan' },
    { label: 'Rank', value: '#17', icon: '🏆', accent: 'violet' },
    { label: 'Win Rate', value: '91%', icon: '⚡', accent: 'rose' }
  ];

  steps: StepItem[] = [
    {
      title: 'Start from a word',
      text: 'Every challenge begins with a simple word. Change one letter at a time.',
      icon: '🧩'
    },
    {
      title: 'Build your ladder',
      text: 'Each valid move takes you closer to the target word and higher in rank.',
      icon: '🪜'
    },
    {
      title: 'Beat the clock',
      text: 'Solve faster, keep your streak alive, and unlock new rewards.',
      icon: '⏱️'
    }
  ];

  players: PlayerItem[] = [
    { name: 'NovaFox', points: '2,840', badge: '#1' },
    { name: 'Cipher', points: '2,610', badge: '#2' },
    { name: 'WordDrift', points: '2,390', badge: '#3' },
    { name: 'You', points: '1,120', badge: '#17' }
  ];

  activity: string[] = [
    'Solved “COLD → WARM” in 6 moves',
    'Unlocked streak bonus x2',
    'Climbed 4 positions on leaderboard'
  ];

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'cyber';
    document.body.className = savedTheme;
  }

  changeTheme(theme: string): void {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  startChallenge(): void {
    this.showGame = true;
  }
}
