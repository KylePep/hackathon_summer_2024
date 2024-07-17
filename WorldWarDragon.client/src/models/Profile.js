export class Profile {
  constructor(data) {
    this.id = data._id
    this.name = data.name
    this.picture = data.picture
    this.valor = data.valor
    this.valorSpent = data.valorSpent
    this.gold = data.gold
    this.health = data.health
    this.power = data.power
    this.attack = data.attack
    this.attackAid = data.attackAid
    this.shield = data.shield
    this.shieldAid = data.shieldAid
    this.heal = data.heal
    this.healAid = data.healAid
  }
}