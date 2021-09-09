import { ICategoryDoc } from './i-category-doc';
import { IEtudiant } from './i-etudiant';

export interface IEtudiantDoc {
  idDocument?: string;
  etudiantDTO?: IEtudiant;
  anneeScolaire?: string;
  categorieDTO?: ICategoryDoc;
  libelleCompl?: string;
  cheminDoc?: string;

  dateCreation?: string;
  createur?: string;
  fileBase64?: string;
}
