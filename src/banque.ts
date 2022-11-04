export interface Horloge {
  récupérerDate(): Date;
}

export class Transaction {
    date: Date;
    montant: number;
    solde: number;
    horloge: Horloge

    constructor(montant: number, solde: number, horloge: Horloge) {
        this.date = horloge.récupérerDate();
        this.montant = montant;
        this.solde = solde;
    }
}

export default class Compte {
    solde: number;
    historique: Transaction[];
    horloge: Horloge

    constructor(horloge: Horloge = null, solde_initial = 0) {
        this.solde = solde_initial;
        this.historique = [];
        this.horloge = horloge;
    }

    depot(montant: number) {
        if (montant < 0)
          return "Montant invalide"
        this.solde += montant;
        const transaction = new Transaction (montant, this.solde, this.horloge)
        this.historique.push(transaction)
    }

    retrait(montant: number){
        if (montant < 0)
          return "Montant invalide"
        if (this.solde - montant < -100)
          return "Vous êtes à découvert"
        this.solde -= montant;
        const transaction = new Transaction (-montant, this.solde, this.horloge)
        this.historique.push(transaction)
    }
}