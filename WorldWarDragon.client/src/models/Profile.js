export class Profile {
  constructor(data) {
    this.id = data._id
    this.name = data.name
    this.picture = data.picture
    this.valor = data.valor
    this.gold = data.gold
    this.health = data.health
    this.power = data.power
    this.attack = data.attack
    this.shield = data.shield
    this.heal = data.heal
  }
}