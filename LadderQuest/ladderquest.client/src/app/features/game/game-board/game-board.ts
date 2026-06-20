import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.html',
  styleUrl: './game-board.css'
})
export class GameBoard {
  startWord = 'COLD';
  targetWord = 'WARM';

  currentWord = 'COLD';
  enteredWord = '';

  moves = 0;
  score = 100;
  gameCompleted = false;

  ladder: string[] = ['COLD'];

  validWords: string[] = [
    'COLD',
    'CORD',
    'CARD',
    'WARD',
    'WARM'
  ];

  submitMove(): void {
    if (this.gameCompleted) {
      return;
    }

    const word = this.enteredWord.toUpperCase().trim();

    if (!word) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter a word',
        text: 'Please type the next word in the ladder.',
        background: '#0f172a',
        color: '#ffffff',
        confirmButtonColor: '#67e8f9'
      });
      return;
    }

    if (word.length !== this.currentWord.length) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong length',
        text: 'Word length must be 4 letters.',
        background: '#0f172a',
        color: '#ffffff',
        confirmButtonColor: '#67e8f9'
      });
      return;
    }

    if (!this.validWords.includes(word)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid word',
        text: 'That word is not in the allowed ladder.',
        background: '#0f172a',
        color: '#ffffff',
        confirmButtonColor: '#67e8f9'
      });
      return;
    }

    const difference = this.getLetterDifference(this.currentWord, word);

    if (difference !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'One letter only',
        text: 'Change only one letter at a time.',
        background: '#0f172a',
        color: '#ffffff',
        confirmButtonColor: '#67e8f9'
      });
      return;
    }

    this.currentWord = word;
    this.ladder.push(word);
    this.moves++;

    this.score = Math.max(100 - (this.moves * 5), 10);
    this.enteredWord = '';

    if (word === this.targetWord) {
      this.gameCompleted = true;
      this.launchConfetti();

      Swal.fire({
        title: '🏆 Puzzle Solved!',
        html: `
          <div style="font-size:18px; line-height:1.8">
            <p><b>Moves:</b> ${this.moves}</p>
            <p><b>Score:</b> ${this.score}</p>
          </div>
        `,
        icon: 'success',
        background: '#0f172a',
        color: '#ffffff',
        confirmButtonText: 'Play Again',
        confirmButtonColor: '#67e8f9',
        showClass: {
          popup: 'swal2-show'
        },
        hideClass: {
          popup: 'swal2-hide'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame();
        }
      });
    }
  }

  launchConfetti(): void {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 }
      });
    }, 300);
  }

  resetGame(): void {
    this.currentWord = this.startWord;
    this.enteredWord = '';
    this.moves = 0;
    this.score = 100;
    this.gameCompleted = false;
    this.ladder = [this.startWord];
  }

  private getLetterDifference(word1: string, word2: string): number {
    let count = 0;

    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        count++;
      }
    }

    return count;
  }
}
