interface route{
  path:string;
  fullUrl:string;
}

export const ACCOUNT:route = {
  path:'account',
  get fullUrl():string{
    return `/${this.path}`
  }
}

export const LAYOUT:route = {
  path:'',
  get fullUrl():string{
    return `/${this.path}`
  }
}

export const DASHBOARD:route = {
  path:'dashboard',
  get fullUrl():string{
    return `${LAYOUT.fullUrl}/${this.path}`
  }
}

export const CHAT:route = {
  path:'chat',
  get fullUrl():string{
    return `${LAYOUT.fullUrl}/${this.path}`
  }
}
