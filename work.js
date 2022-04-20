

function hello(){

    const file = document.getElementById('myfile');


    if(file.files.length)
    {
        var reader = new FileReader();
      reader.onload = function(e)
        {
       //     document.getElementById('Result').innerHTML = e.target.result;
            let result = e.target.result;
            switch (document.getElementById('myfile').files[0].type){
                case 'text/plain':
                   let n= f(result,6,6,6);
 file_write(n[0],n[1]);

                    break;



                default:
                    document.getElementById('Result').innerHTML=" <div id='Result_Mi'> File Not Supported</div>";
                    break
            }
        };
     reader.readAsBinaryString(file.files[0]);

    }else {
        document.getElementById('Result').innerHTML=" <div id='Result_Mi'> File Required</div>";
    }




}

function f(result,nDic,nLookup,min) {

    let j = new Dic([],[],nDic,nLookup,' ',min);
    result=['0','0','0','0','0','1','0','0','0','2','4','3','2','1','4','0','5','2','2','2','2','3','2','2','2','3'];
    let file=[];

    j.inicial_Dic();
j.inicial_lookup(result);
    for (let i = 0; i <result.length ; i++) {
let sa=j.Hash_lookup();
   let array= j.check_legth();
   let lengmax=0,index=0,hash=0;

    for (let k = 0; k <array.length ; k=k+3) {
        if (array[k]>lengmax){
            lengmax=array[k];
            index=array[k+1];
            hash=array[k+2];
        }
    }
    if (lengmax>=4){
           file.push('¨',lengmax,index,hash);

        for (let k = 0; k <lengmax ; k++) {
            j.move_Index(result[i + j.nHash+1]);
            i++;
        }
    }else {
        if (j.Index===undefined){
            for (let k = 0; k <j.Look_Up.length ; k++) {
                file.push(  j.Look_Up[k]);
            }
            break;

        }else{
            j.Place_hash(sa,j.Look_Up);
            let b1=j.move_Index(result[i+j.nHash]);
          file.push( b1 );
        }



    }


    }

return [file,j];
}


function file_write(result,j) {

    let array=[];
    let array2=[];
    for (let i = 0; i <result.length ; i++) {


    }
    let hello = new Uint8Array([72, 101, 108, 108, 111]);
    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");


}

class Dic {
    Dic_  ;
    Look_Up ;
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
    inicial_Dic() {
        for (let i = 0; i <this.nHash ; i++) {
            this.Dic_[i]=[];
            let n=this.Dic_[i];
            for (let j = 0; j <this.Hashweight ; j++) {

                n[j]=[];
            }
        }

    }


    inicial_lookup(result){

        for (let i = 0; i <this.nLook ; i++) {
            this.Look_Up[i]=result[i];
        }
        this.Index=result[this.nLook];
    }

    check_legth(){
        let hasvalue=this.Hash_lookup();
        let arr=[];
        for (let i = hasvalue; i <hasvalue+this.nHash ; i++) {
            let n=this.Dic_[i%this.nHash];

                for (let j = 0; j < n.length; j++) {
                    let k=n[j];
                    let l;
                    for ( l = 0; l <k.length ; l++) {
                        if (k[l]!== this.Look_Up[l]){
                            arr.push(l,j,i);
                            break;
                        }
                    }
                    if (l===0){
                        arr.push(0,j,i);
                    }else
                    if (l===k.length){
                        arr.push(k.length,j,i);
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
    move_Index(nex){
       let k=[];
       k.push(this.Look_Up[0]);

            for (let j = 1; j < this.Look_Up.length; j++) {
                this.Look_Up[j - 1] = this.Look_Up[j];
            }
            this.Look_Up[this.nHash-1]=this.Index;
            this.Index=nex;

return k;

    }
    Place_hash(hash,array){
        let l=this.Dic_[hash];
        for (let i = 0; i <l.length ; i++) {
            let n=this.Dic_[hash];
            if (n[this.Hashweight-1].length!==0){
                this.rehash(this.Hashweight*2);

            }
            if (n[i].length===0){
               let n1=[];
                for (let j = 0; j <this.Look_Up.length ; j++) {
                    n1.push(array[j]);
                }


             n[i]=n1;
                return;
            }

        }


    }
    rehash(newCapacity) {
        if (this.nHash>=newCapacity){
            return;
        }
        for (let i = 0; i <this.nHash ; i++) {
            let v=this.Dic_[i];
            for (let j = this.nHash; j <newCapacity ; j++) {
                v.push([]);
            }
        }
this.Hashweight=newCapacity;
    }

}



