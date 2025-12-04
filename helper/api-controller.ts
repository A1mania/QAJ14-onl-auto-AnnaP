import superagent from "superagent";

export class RestfulController {
  private restfulUrl: string;

  constructor(apiUrl: string) {
    this.restfulUrl = apiUrl;
  }

  async getObjects() {
    const url = this.restfulUrl + "objects";
    return superagent.get(url);
  }
  postObject() {
    const url = this.restfulUrl + "objects";
    return superagent.post(url);
  }

  putObject(param: number) {
    const url = this.restfulUrl + "objects";
    return superagent.put(url+ "/" + param);
    
  }

  patchObject(param: number) {
    const url = this.restfulUrl + "objects";
    return superagent.patch(url+ "/" + param);
    
  }

  async getListObjects(...args: Array<number>) {
    const url = this.restfulUrl + "objects?";
    let urlParams: string = 'id=' + args[args.length-1];
    for (let i=0; i<args.length-1; i++){
      urlParams += `&id=${args[i]}`  
      }
    return superagent.get(url+urlParams);
  }
  // async getOneObject(param: string) {
  //   const url = this.restfulUrl + "objects";
  //   return superagent.get(url+"?"+param);
  // }
  async getSingleObject(param: number) {
    const url = this.restfulUrl + "objects";
    return superagent.get(url+ "/" + param);
  }

  async deleteObject(id: number) {
    const url = this.restfulUrl + "objects";
    return superagent.delete(url+"/" +id);
  }
}
