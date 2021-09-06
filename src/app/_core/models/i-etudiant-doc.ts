import { ICategoryDoc } from './i-category-doc';
import { IEtudiant } from './i-etudiant';

export interface IEtudiantDoc {
  id?: string;
  etudiant?: IEtudiant;
  annee?: string;
  categoryDoc?: ICategoryDoc;
  libelle_compl?: string;
  doc_url?: string;
}
