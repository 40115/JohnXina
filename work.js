
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

    for (let i = 0; i <result.length ; i++) {
if (j.Index===' '){

}

    }

console.log(j );
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


