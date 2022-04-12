class Dic {
    Dic_ = [] ;
    Look_Up = [];
    nHash;
    nLook;
    Index;
    Hashweight;
    constructor(dic_, look_Up, hash, nLook, index,hashweight) {
        this.Dic_ = dic_;
        this.Look_Up = look_Up;
        this.nHash = hash;
        this.nLook = nLook;
        this.Index = index;
        this.Hashweight=hashweight;
    }
 inicial_lookup(result){

     for (let i = 0; i <this.nLook ; i++) {
         this.Look_Up[i]=result[i];
     }
     this.Index=result[this.nLook];
 }

 check_legth(result){
        let hasvalue=this.Hash_lookup();
        let arr=[];
     for (let i = hasvalue; i <hasvalue+this.nHash ; i++) {
      let n=this.Dic_[i];
      if (n!=null ) {
          for (let j = 0; j < n.length; j++) {
          let k=n[j];
          let l;
              for ( l = 0; l <k.length ; l++) {
                  if (k[l]!== result[l]){
                arr.push(l,j,i);
                  }
                  if (l===k.length){
                      arr.push(k.length,j,i);
                  }

              }

          }
      }

     }
     return arr;


 }
 Hash_lookup(){
        let soma=0;
     for (let i = 0; i <this.nLook ; i++) {
         soma+=this.Look_Up[i].charCodeAt(0);
     }
return soma %this.nHash;
 }

}


