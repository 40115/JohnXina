

function bye() {
    let result =document.getElementById("Input").value;
    let show =document.getElementById("Result");
    show.innerHTML="<br>Uncompressed String-";
      show.innerHTML+=result+"<br>";
    let d = new Date();
    let years = Math.round(d.getTime());
   let n=f(result,6,6,6);
   let d1=new Date();
    let years2 = Math.round(d1.getTime());
    show.innerHTML+=years2-years;
    show.innerHTML+="<br>Compressed file-";
  show.innerHTML+=n[0];
    show.innerHTML+=n[2];

  let h="<table><thead>";
    for (let i = 0; i <n[1].Dic_.length ; i++) {
        h+="<th> "+i+"</th>";
    }
  h+="</thead><tbody>"
    for (let i = 0; i <n[1].Hashweight; i++) {
       h+="<tr>"
        for (let j = 0; j <n[1].nHash ; j++) {
            let fd=n[1].Dic_[j];
            h+="<td>"+fd[i]+"</td>";
        }
        h+="</tr>";
    }
    h+="</tbody>";
    h+="<br>Racio Normal="+result.length+"/"+n[0].length+"="+result.length/n[0].length+"<br>";


    show.innerHTML+=h;
    let c=convertion_bin(n[0],n[1]);
show.innerHTML+=c[2];
    show.innerHTML+=c[0]+"<br>"+c[1]+"<br>";

}
function convertion_bin(result,j){
    let array=[];
    let array2=[];
    let h=[];
    h.push("<h3>Inciallizaing the writting to binnary and then write the resulting 8 bit number to the file</h3>")
    for (let i = 0; i <result.length ; i++) {
        if (result[i]==='¨'){
            h.push("<p>Special char found , adding a 1 at the begging to signnel it as speacial later on in the decommpression</p>")

            array.push('1');
            let h1=result[i+3]-'0';
            h.push("<p>the speacial char is actually a neceary waste of space, in 9 bits its 100000000 , we can use the other 8 bits to represent the hash so:"+result[i+3]+" is actually going to be used in the other 8 bits.")
            for (let k = 0; k <8 ; k++) {
                if (h1>=Math.pow(2,7-k)){
                    h.push("1")

                    h1-=Math.pow(2,7-k);
                    array.push('1');
                    h1=h1-Math.pow(2,7-k);
                }else {
                    h.push("0")

                    array.push('0');
                }
            }
            h.push("<p>Calculated the binary of the number and added it to the compressed file</p>")
        result.splice(i+3,1);
            h.push("<p>Removed the hash number now irrelavent</p>")

        }else {
            h.push("<p>Added the 0 for "+ result[i]+" is litteral sign</p>");

            array.push('0');
            let b= ABC.toBinary(result[i],0);
            h.push("<p>"+b+" REsulting binary</p>")

            const chars = b.split('');
            for (let k = 0; k <chars.length ; k++) {
                array.push(chars[k]);
            }
        }
    }
    let num=0;
    h.push("<p>Convertion to numbs for the files</p>");

    for (let i = 0; i <array.length ; i++) {
        if (i%8===0 && i!==0){
            array2.push(num);
            num=0;
        }
        if (array[i]!=='0'){
            num+=Math.pow(2,7-i%8);
        }

    }

    h.push("<p>Adding the table by sepparing it in | per hash level and , per hashweight</p>")

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
return[array2,array4,h];

}