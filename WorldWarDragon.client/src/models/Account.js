export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.valor = data.valor
    this.gold = data.gold
    this.health = data.health
    this.power = data.power
  }
}
