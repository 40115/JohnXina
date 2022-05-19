
function hello(){

    const file = document.getElementById('myfile');


    if(file.files.length)
    {
      let reader = new FileReader();
      reader.onload = function(e)
        {
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

            document.getElementById('Result').innerHTML = " <div id='Result_Mi'> File Required</div>";
        }

}

let table = null;

function hello2(){

    let filelist = document.getElementById('myfile2').files;
    for(let i=0; i<filelist.length; i++)
    {
        writefiles(filelist[i],i);
    }

}

function writefiles(file,i)
{
    let reader = new FileReader();
    reader.onload = function(e)
    {
switch (i){
    case 0:
     table=descompresion_table(e.target.result);
break;
    case 1:
descompresion_file(e.target.result);
}

    }
    reader.readAsText(file, "UTF-8");
}
function descompresion_file(result){
    if (table==null){
        return;
    }
    let araay=[];
    for (let i = 0; i <result.length ; i++) {

        let h=ABC.toBinary(result[i],0);

        const chars = h.split('');
        if (chars.length!==8){
            let js='11010000';
            for (let j = 0; j < js.length; j++) {
                araay.push(js[j]);
            }
        }else {
            for (let j = 0; j < chars.length; j++) {
                araay.push(chars[j]);
            }
        }
    }
    let arrr=[];
    let arr2=[];
    let num=0;
    for (let i = 0; i <araay.length ; i++) {
        if (i%9===0 && i!==0){
            arrr.push(num);
            num=0;
        }
        if (araay[i]!=='0'){
            num+=Math.pow(2,8-i%9);
        }
    }
    for (let i = 0; i <arrr.length ; i++) {
    }
let n0=0;

}
function descompresion_table(result){
    if (result[0]!=='|'){
        return null;
    }
    let ntable=[];
    let nhash=-1;
    let nweight=0;
    let leight=0;
    for (let i = 0; i <result.length ; i++) {
       if (result[i]==='|'){
           ntable.push([]);
           nhash++;
       }else {
           let newhash=[];
           let th=false;
           while(result[i]!=='|'){
               if (result[i]===',' ){
                   leight=newhash.length;
                   let h=[];
                   for (let j = 0; j <leight ; j++) {
                       h.push(newhash[j]);
                   }
                  ntable[nhash].push(h);
                   newhash.length=0;
                   th=true;
               }else {
                   newhash.push(result[i]);
               }
               i++;

           }
           if (th){
               i--;
           }


       }
    }
return new Dic(ntable,[],ntable.length,0,'-1',leight);
}


function f(result,nDic,nLookup,min) {

    let j = new Dic([],[],nDic,nLookup,' ',min);
   //result=['0','0','0','0','0','1','0','0','0','2','4','3','2','1','4','0','5','2','2','2','2','3','2','2','2','3'];
    let file=[];
    let h=[];

    j.inicial_Dic();
   h.push("<p>Main Dic reserves space for the patterns discorvered</p>");
j.inicial_lookup(result);
    h.push("<p>Inicial lookup->"+j.Look_Up+"<br>"+"Inicial Index->"+j.Index+ "<br></p>");
    for (let i = 0; i <result.length ; i++) {
        if (j.Index===undefined){
            h.push("<p>file compressed put the lookup remaining to the file and finished</p>");
            for (let k = 0; k <j.Look_Up.length && j.Look_Up[k]!==undefined ; k++) {
                file.push(  j.Look_Up[k]);
            }
            break;
        }

let sa=j.Hash_lookup();
        h.push("<p>Hash Numeber calculated:"+sa+"<p>");

        let array= j.check_legth(sa);
   let lengmax=0,index=0,hash=0;
            lengmax=array[0];
            index=array[1];
            hash=array[2];

    if (lengmax>=3){
        h.push("<p> Available length decteted for compression:"+lengmax+" Index->"+ index+" Hash->" +hash+"</p>");

        file.push('¨',lengmax.toString(),index.toString(),hash.toString());
            j.move_Index(result,i,lengmax);
            i=i+lengmax-1;
        h.push("<p> Resulting lookup</p>"+j.Look_Up);

    }else {
        h.push("<p> Available length Not decteted for compression:"+lengmax+" Index->"+ index+" Hash->" +hash+"</p>");
        h.push("<p> We need to store the lookup to the hash dictonary</p>");
            j.Place_hash(sa,j.Look_Up);

        file.push( j.move_Index(result,i,1));
        h.push("<p> Resulting lookup</p>"+j.Look_Up);

    }


    }


return [file,j,h];
}
/*
*    let hash = 0;
    let boo=false;
    let num=0;
    if (result[i]==='¨') {
        num+=128;
        hash = result[i + 3];
        boo=true;

    }else{
        hash=result[i];
    }

        let b=ABC.toBinary(hash,0);
        const chars = b.split('');

        for (let k = 0; k <array2.length ; k++) {
            if (array2[k]!=='0') {
                num += Math.pow(2,7 -k-1);
            }
        }
        for (let k = 0 ; k<chars.length-array2.length-2; k++) {
            if (chars[k]!=='0') {
                num += Math.pow(2,7 - k-array2.length-1);
            }

        }
      let size=array2.length;
        array2.length=0;
        for (let k = chars.length-size-1; k <chars.length ; k++) {
            array2.push(chars[k]);
        }
        array.push(num);
        if (array2.length===8){
            for (let k =0; k <8; k++) {
                array2.push(chars[k]);
            }
            array2.length=0;
        }
        if (boo){
            for (let k = i+3; k <result.length-1 ; k++) {
                result[k]=result[k+1];
            }
            result.pop();
        }
        *   for (let k = 0; k <array2.length ; k++) {
        if (array2[k]!=='0') {
            num += Math.pow(2,7 -k-1);
        }
    }
    array.push(num);

*/


function file_write(result,j) {

    let array=[];
    let array2=[];
    for (let i = 0; i <result.length ; i++) {
if (result[i]==='¨'){
array.push('1');
let h1=result[i+3]-'0';
    for (let k = 0; k <8 ; k++) {
      if (h1>=Math.pow(2,7-k)){
h1-=Math.pow(2,7-k);
array.push('1');
h1=h1-Math.pow(2,7-k);
      }else {
          array.push('0');
      }
    }
    result.splice(i+3,1);
}else {
    array.push('0');
    let b= ABC.toBinary(result[i],0);
    const chars = b.split('');
    for (let k = 0; k <chars.length ; k++) {
        array.push(chars[k]);
    }
}
    }
    let num=0;
    for (let i = 0; i <array.length ; i++) {
        if (i%8===0 && i!==0){
     array2.push(num);
num=0;
        }
        if (array[i]!=='0'){
            num+=Math.pow(2,7-i%8);
        }

    }


    let array3=[];
    for (let i = 0; i <j.nHash ; i++) {
        let ga=j.Dic_[i];
       array3.push('|');
        for (let k = 0; k <ga.length ; k++) {
            let c=ga[k];
             if (c.length!==0){
                 for (let l = 0; l <c.length ; l++) {
                array3.push(c[l]);

                 }
         array3.push(',');
             }

        }


    }
    let array4=[];
    for (let i = 0; i <array3.length ; i++) {
        let h=ABC.toBinary(array3[i],0);
        const chars2 = h.split('');
        let numb2=0;
        for (let k = 0; k <chars2.length ; k++) {
            if (chars2[k]!=='0')
            numb2 += Math.pow(2,7 -k);
        }
        array4.push(numb2);
    }
    let hello = new Uint8Array(array2);
    let hello2=new Uint8Array(array4);
    const blob = new Blob([hello], {type: "text/plain;charset=utf-8"});
    const blob2 = new Blob([hello2], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "1filecompressed.txt");
    saveAs(blob2,"0Tablecompremidada.txt");
}

class Dic {
    Dic_  ;
    Look_Up ;
    nHash;
    nLook;
    Index;
    Hashweight;
    constructor(dic_, look_Up, hash, nLook, index,hashweight) {
        this.Dic_ = dic_;//Dicionario conteudo
        this.Look_Up = look_Up;//Window conteudo
        this.nHash = hash;//Numero de hash que existem no dicionarios
        this.nLook = nLook;//Numero de posiçoes que existe no Window Look up
        this.Index = index;//Index do proximo char na fila
        this.Hashweight=hashweight;//Hashweight numero de capacidade de cada hash
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
        if (this.Hashweight>=newCapacity){
            return;
        }
        for (let i = 0; i <this.nHash ; i++) {
            let v=this.Dic_[i];
            for (let j = this.Hashweight; j <newCapacity ; j++) {
                v.push([]);
            }
        }
this.Hashweight=newCapacity;
    }

}



