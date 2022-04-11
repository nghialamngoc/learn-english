export interface Vocabulary {
  id: string | number;
  text?: string;
  spelling?: string;
  type?: 'adj' | 'noun';
  mean?: string;
  example?: string[];
  createAt?: string;
}
