import { Component, OnInit } from '@angular/core';

interface Stat {
  question: string;
  correct: number;
  total: number;
  percentage: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  displayedColumns: string[] = ['question', 'correct', 'total', 'percentage'];
  stats: Stat[] = [
    { question: 'Quelle est la couleur de la robe de Belle ?', correct: 7, total: 10, percentage: 70 },
    { question: 'Qui est le méchant dans Le Roi Lion ?', correct: 8, total: 10, percentage: 80 },
    { question: 'Combien d\'amis a Dingo ?', correct: 5, total: 10, percentage: 50 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
