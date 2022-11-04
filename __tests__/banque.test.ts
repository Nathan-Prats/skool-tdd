import 'jest';
import Compte, { Horloge, Transaction } from '../src/banque'

class HorlogeTest implements Horloge {
  dates: Date[] = [new Date()];
  index: number = 0;

  définirDate(nouvelleDate: Date){
    this.dates.push(nouvelleDate);
  }

  récupérerDate(): Date {
    if (this.index < this.dates.length - 1) return new Date(this.dates[this.index++]);
    return new Date(this.dates[this.index]);
  }
  
}

describe('Ma Banque', () => {

  const horloge = new HorlogeTest();

    test("Mon compte contient 0€ quand je le créé", () => {
    //Given
    const compte = new Compte(horloge);
    //When
    const solde = compte.solde;
    //Then
    const solde_ouvertude = 0;
    expect(solde).toBe(solde_ouvertude)
    })

    test("Mon compte contient 1500€ quand je dépose 1500€ sur mon compte vide, et la transaction est historisée", () => {
    //Given
    const compte = new Compte(horloge);
    const montant_transaction = 1500;
    const solde_attendu = 1500;
    const transaction = new Transaction(montant_transaction, solde_attendu, horloge);
    //When
    compte.depot(1500);
    const solde = compte.solde;
    const historique = compte.historique;
    //Then
    expect(solde).toBe(montant_transaction)
    expect(historique).toEqual([transaction])
    })

    test("Je ne peux pas déposer sur mon compte un montant négatif", () => {
    //Given
    const compte = new Compte(horloge, 100);
    //When
    compte.depot(-10);
    const solde = compte.solde;
    //Then
    const solde_final = 100;
    expect(solde).toBe(solde_final)
    })

    test("Je retire 500€ sur mon compte contenant 1500€, il me reste 1000€ et la transaction est historisée au format ISO", () => {
    //Given
    
    const compte = new Compte(horloge, 1500);
    const montant_transaction = -500;
    const solde_attendu = 1000;
    const transaction = new Transaction(montant_transaction, solde_attendu, horloge);
    //When
    compte.retrait(500);
    const solde = compte.solde;
    const historique = compte.historique;
    //Then
    expect(historique).toEqual([transaction])
    expect(solde).toBe(solde_attendu)
    const dateAttendue = new Date(horloge.dates[horloge.index]);
    expect(historique[0].date).toEqual(dateAttendue);
    })

    test("Je ne peux pas retirer à mon compte un montant négatif", () => {
    //Given
    const compte = new Compte(horloge, 1500);
    //When
    compte.retrait(-500);
    const solde = compte.solde;
    //Then
    const solde_final = 1500;
    expect(solde).toBe(solde_final)
    })

    test("Le découvert maximum est de -100€, je ne peux pas retirer 101€ à mon compte vide", () => {
    //Given
    const compte = new Compte(horloge);
    //When
    compte.retrait(101);
    const solde = compte.solde;
    //Then
    const solde_final = 0;
    expect(solde).toBe(solde_final)
    })
    
    test("Mon historique de transactions est vide lorsque je créé un nouveau compte", () => {
    //Given
    const compte = new Compte(horloge);
    //When
    const historique = compte.historique;
    //Then
    expect(historique).toEqual([])
    })

    test("Je fais deux dépôts successifs et les dates sont différentes", () => {
      //Given
      const compte = new Compte(horloge);
      const date_transaction_1 = new Date();
      horloge.définirDate(date_transaction_1)
      const date_transaction_2 = new Date();
      horloge.définirDate(date_transaction_2)
      //When
      compte.depot(100);
      compte.depot(250);
      //Then
      expect(compte.historique[0].date).not.toBe(compte.historique[1].date)
    })

  })
  
  

/*
Vérifier que la personne me dise bonjour
Vérifier que la personne me donne le choix de mes actions
Vérifier que la personne me laisse choisir une action
Vérifier que la personne à compris ma demande
Vérifier que la personne me demande le montant de mon retrait ou dépôt
Vérifier que la personne me donne le résultat de mon action
*/