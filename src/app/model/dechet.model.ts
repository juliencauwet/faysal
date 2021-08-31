export interface IDechet{
  Dechet?: string;
  Quantite?: number;
  Code_client?: string;
  RS_client?: string;
  Site?: string;
  Type_collecte?: string;
  Annee?: string;
  Mois?: string;
  Code_traitement?: string;
  Date_collecte?: string;
  Source?: string;

}

export class Dechet implements IDechet{
  constructor(
      public Dechet?: string,
      public Quantite?: number,
      public Code_client?: string,
      public RS_client?: string,
      public Site?: string,
      public Type_collecte?: string,
      public Annee?: string,
      public Mois?: string,
      public Code_traitement?: string,
      public Date_collecte?: string,
      public Source?: string
  ){}

}
