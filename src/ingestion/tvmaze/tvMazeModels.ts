export interface TvMazeShow {
  readonly id: number;
  readonly name: string;
  readonly updated: number;
  [other: string]: any;
}

export interface TvMazeCast {
  readonly person: {
    readonly id: number;
    readonly name: string;
    readonly birthday: Date;
  };

  [other: string]: any;
}
