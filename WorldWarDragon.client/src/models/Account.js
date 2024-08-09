import { Profile } from "./Profile.js"
export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
    this.newAccount = data.newAccount
    // TODO add additional properties if needed
  }
}
