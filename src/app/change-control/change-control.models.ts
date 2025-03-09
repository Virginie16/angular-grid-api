export interface ChangeControl {
  id: string; // UUID sous forme de string
  avancement: string;
  dateLancement: string; // Stocké en string pour correspondre au format JSON
  reference: string;
  titre: string;
  site: string;
  produit: string;
  typeCc: string;
  classification: string;
  dateCloture: string; // Stocké en string pour éviter les problèmes de parsing
}
