"use strict";
exports.__esModule = true;
var Transaction = /** @class */ (function () {
    function Transaction(montant, solde) {
        var date_du_jour = new Date();
        this.date = date_du_jour.toUTCString();
        this.montant = montant;
        this.solde = solde;
        console.log(this.date);
    }
    return Transaction;
}());
exports.Transaction = Transaction;
var Compte = /** @class */ (function () {
    function Compte(solde_initial) {
        if (solde_initial === void 0) { solde_initial = 0; }
        this.solde = solde_initial;
        this.historique = [];
    }
    Compte.prototype.depot = function (montant) {
        if (montant < 0)
            return "Montant invalide";
        this.solde += montant;
        var transaction = new Transaction(montant, this.solde);
        this.historique.push(transaction);
    };
    Compte.prototype.retrait = function (montant) {
        if (montant < 0)
            return "Montant invalide";
        if (this.solde - montant < -100)
            return "Vous êtes à découvert";
        this.solde -= montant;
        var transaction = new Transaction(-montant, this.solde);
        this.historique.push(transaction);
    };
    return Compte;
}());
exports["default"] = Compte;
/* export type ActionBancaire = "solde" | "dépot" | "retrait" | "historique";

export class ApplicationBancaire {
    message: string
    page: string

    constructor() {
      this.message = "Bienvenue sur votre application bancaire."
      this.page = "acceuil"
    }

    choisirAction(action: ActionBancaire){
      return null;
    }


} */ 
