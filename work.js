

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
        if (j.Index===undefined){
            for (let k = 0; k <j.Look_Up.length && j.Look_Up[k]!==undefined ; k++) {
                file.push(  j.Look_Up[k]);
            }
            break;
        }
let sa=j.Hash_lookup();
   let array= j.check_legth(sa);
   let lengmax=0,index=0,hash=0;


            lengmax=array[0];
            index=array[1];
            hash=array[2];

    if (lengmax>=3){
           file.push('¨',lengmax,index,hash);
            j.move_Index(result,i,lengmax);
            i=i+lengmax-1;


    }else {

            j.Place_hash(sa,j.Look_Up);
          file.push( j.move_Index(result,i,1));

    }


    }


return [file,j];
}


function file_write(result,j) {

    let array=[];
    let array2=[];

    for (let i = 0; i <result.length ; i++) {
if (array2.length===0 && result[i]==='¨'){
    let hash=result[i+3];
    let b=ABC.toBinary(hash,0);
    const chars = b.split('');
    let offset=chars[7];
    hash=hash>>1;
    let k=128+hash;
    array.push(k);
array2.push(offset);

        for (let k = i+3; k <result.length-1 ; k++) {
            result[k]=result[k+1];
        }
        result.pop();

}else{
    let hash = 0;
    let boo=false;
    if (result[i]==='¨') {
        hash = result[i + 3];
        boo=true;
    }else{
        hash=result[i];
    }
        let b=ABC.toBinary(hash,0);
        const chars = b.split('');
        let num=0;
        for (let k = 0; k <array2.length ; k++) {
            if (array2[k]!=='0') {
                num += Math.pow(2,7 -k);
            }
        }
        for (let k = 0 ; k<chars.length-array2.length; k++) {
            if (chars[k]!=='0') {
                num += Math.pow(2,7 - k-array2.length);
            }

        }
      let size=array2.length;
        array2.length=0;
        for (let k = chars.length-size-1; k <chars.length ; k++) {
            array2.push(chars[k]);
        }
        array.push(num);
        if (array2.length===8){
            for (let k = 8-array2.length; k >0; k++) {
                array2.push(chars[k]);
            }
        }
        if (boo){
            for (let k = i+3; k <result.length-1 ; k++) {
                result[k]=result[k+1];
            }
            result.pop();
        }


}
    }
    let hello = new Uint8Array(array);
    var blob = new Blob([hello], {type: "text/plain;charset=utf-8"});
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

    check_legth(hasvalue){

        let arr=[];
        arr.push(0);
        for (let i = hasvalue; i <hasvalue+this.nHash ; i++) {
            let n=this.Dic_[i%this.nHash];

                for (let j = 0; j < n.length; j++) {
                    let k=n[j];
                    let l=0;
                    for ( l = 0; l <k.length ; l++) {
                        let aux =k[l];
                        let aux2=this.Look_Up[l];
                        if (aux!==aux2 ){
                            break;
                        }
                    }

                    if (l===this.Hashweight ||(l>arr[0])) {
                        arr.length = 0;
                        arr.push(l, j, i%this.nHash );
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
    move_Index(nex,i,len){
        let n=this.Look_Up[0];
        let j;
        for (j = 0; j <this.nLook ; j++) {
            this.Look_Up[j]=nex[i+len+j];

        }
        this.Index=nex[i+len+j];
        return n;
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



