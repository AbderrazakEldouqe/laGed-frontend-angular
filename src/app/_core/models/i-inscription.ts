import { IEtudiant } from './i-etudiant';

export interface IInscription {
  id?: string;
  anne?: string;
  inscription?: string;
  etudiant?: IEtudiant;
}
