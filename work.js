
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
                    let n= f(result,6,6,6); // Inicialização do HashMap
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
    let h=file[0];
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
        j.rehash(nDic*2); // Duplicamos o tamanho do Dicionario
           file.push('¨',lengmax,index,hash);
           for (let k = 0; k <lengmax ; k++) {
               j.move_Index(result[i + j.nHash+1]);
               i++;
           }
    }else {
        if (j.Index===undefined){
            file.push('¨');
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

console.log(j);
return j;
}


function file_write(result,ran) {
    let foo = "71%73%70%56%57%97%50%0%50%0%247%0%0%150%140%115%102%94%69%198%187%159%123%114%90%71%71%71%138%129%101%202%193%166%201%193%172%238%234%221%200%197%188%140$";
    let bytes = foo.split("%");

    let b = new Buffer(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        b[i] = bytes[i];
    }

    fs.writeFile("test.txt", b,  "binary",function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

}
let n= f(result,6,6,6);
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
        this.nHash = hash; // nDic
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
                    let k=n[j]; // K tem a capacidade do dicionario
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
                    if (l===k.length){ // O L está no fim do dicionario
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
        const newMap = new HashMap(newCapacity);

        this.keys.forEach(key => {
            if(key) {
                newMap.set(key.content, this.get(key.content));
            }
        });

        this.Look_Up = newMap.look_Up;
        this.nHash = newMap.hash; // nDic
        this.nLook = newMap.nLook;
        this.Index = newMap.index;
        this.Hashweight=newMap.hashweight;
    }

}