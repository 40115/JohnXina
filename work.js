import * as fs from "fs";

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
                   let n= f(result,[0,255]);

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

function f(result,ran) {
    let j = new Dictionary([], [ran[0],ran[1]]);
  //  result=['0','0','0','0','0','1','0','0','0'];
    let array_file=[];

    for (let i = 0; i <result.length-1 ; i++) {
   let k= j.check([result[i],result[i+1]]);
   if(k===false){
       j.create_Node([result[i],result[i+1]]);
       array_file.push(result[i]);
   }else {
       let m=[result[i],result[i+1]];
       let ax=k.key;
       for (let l = i+2; l <result.length ; l++) {
           let k1=m.concat(result[l]);
           let n=j.check(k1 );

        if(n===false){
            array_file.push(ax);
            j.create_Node(k1);
            i=l-1;
            break;
        }else {
            ax=n.key;
            m=k1;
        }
       }
     if(i===result.length-2){
         let k1=m.concat(result[i+1]);
         let n=j.check(k1);
         if(k1!==null){
     array_file.push(n.key);}else{
             array_file.push(ax,result[i+1]);
         }
     break;
     }

   }
    }

console.log(j );
    console.log( array_file);
    return array_file;
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

class Dictionary {
    _array_Node=[] ;
    _range=[];


    constructor(array_Node, range) {
        this._array_Node = array_Node;
        this._range = range;
    }
   check(g){
       for (let i = 0; i <this._array_Node.length ; i++) {
           let l=this._array_Node[i];
            let j;
           if(g.length===l.Pat.Patter_List.length) {
               for (j = 0; j < l.Pat.Patter_List.length; j++) {

                   if (g[j] !== l.Pat.Patter_List[j]) {
                       break;
                   }

               }
               if (j === l.Pat.Patter_List.length) {
                   return this._array_Node[i];
               }
           }

       }
       return false;

   }
    check_key(key){
        for (let i = 0; i <this._array_Node.length ; i++) {
            let l=this._array_Node[i];
            if(l.key===key){
                return l;
            }

        }
        return false;

    }
   create_Node(g){
        let k=new Pattern(g);
        let j=new Node_Dic(this._range[1]+this._array_Node.length+1,k);
        this._array_Node.push(j);

   }
}
class Node_Dic{
    key;
    Pat=Pattern;
    constructor(key, Pat) {
        this.key = key;
        this.Pat = Pat;
    }
}
class Pattern{

    Patter_List=[];
    constructor(Patter_List) {
        this.Patter_List = Patter_List;
    }
}