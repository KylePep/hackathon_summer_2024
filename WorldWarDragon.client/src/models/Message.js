export class Message {
  constructor(data) {
    this.creatorId = data.creatorId
    this.roomId = data.roomId
    this.body = data.body
    this.boon = data.boon
    this.id = data.id
    this.creator = data.creator
  }
}