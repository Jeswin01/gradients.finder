function hexToRgb(hex,rgb)
{
    console.log("Inside hexToRgb fun");
    console.log("input:"+hex);
r = "0x" + hex[1] + hex[2];
g = "0x" + hex[3] + hex[4];
b = "0x" + hex[5] + hex[6];
rgb[0]=+r;
rgb[1]=+g;
rgb[2]=+b;
console.log("Op");
console.log(rgb);
return rgb;
}

function rgbToHex(rgb)
{
    console.log("Inside rgbToHex fun");
    console.log("input:");
    console.log(rgb);
    let r =(+rgb[0]).toString(16);
    let g = (+rgb[1]).toString(16);
    let b = (+rgb[2]).toString(16);

if (r.length == 1)
  r = "0" + r;
if (g.length == 1)
  g = "0" + g;
if (b.length == 1)
  b = "0" + b;
console.log("Output:#"+r+g+b);
return "#" + r + g + b;
}

function getGradients()
{
let res_rgbs=[];    
const operation=document.getElementById("operation").value;
var input_colour_1=document.getElementById("colour_picker1").value;
var input_colour_2=document.getElementById("colour_picker2").value;
const output_gradient_count=document.getElementById("gradient_count").value;
const colour_system=document.getElementById("colour_system").value;
console.log(operation +" "+input_colour_1+" "+input_colour_2+" "+output_gradient_count+" "+colour_system);
var rgb=[];
input_colour_1_rgb=hexToRgb(input_colour_1,rgb);
rgb=[];
input_colour_2_rgb=hexToRgb(input_colour_2,rgb);
if(operation==="ahead")
    {
        let rdiff,gdiff,bdiff;
        rdiff=input_colour_2_rgb[0]-input_colour_1_rgb[0];
        gdiff=input_colour_2_rgb[1]-input_colour_1_rgb[1];
        bdiff=input_colour_2_rgb[2]-input_colour_1_rgb[2];
   
        let tempr=input_colour_2_rgb[0];
        let tempg=input_colour_2_rgb[1];
        let tempb=input_colour_2_rgb[2];
        for(let index=0;index<output_gradient_count;index++)
        {
            let cur_rgb=[];
            cur_rgb[0]=Math.round(tempr+rdiff);
            cur_rgb[1]=Math.round(tempg+gdiff);
            cur_rgb[2]=Math.round(tempb+bdiff);
            for(let index in cur_rgb)
            {
                cur_rgb[index]=cur_rgb[index]>255?255:cur_rgb[index];
                cur_rgb[index]=cur_rgb[index]<0?0:cur_rgb[index];
            }
            
            tempr=cur_rgb[0];
            tempg=cur_rgb[1];
            tempb=cur_rgb[2];

            res_rgbs.push(rgbToHex(cur_rgb));
        }
        console.log("Output")
        console.log(res_rgbs);
    }
   else if(operation==="behind")
    {
        let rdiff,gdiff,bdiff;
        rdiff=input_colour_2_rgb[0]-input_colour_1_rgb[0];
        gdiff=input_colour_2_rgb[1]-input_colour_1_rgb[1];
        bdiff=input_colour_2_rgb[2]-input_colour_1_rgb[2];
        let tempr=input_colour_1_rgb[0];
        let tempg=input_colour_1_rgb[1];
        let tempb=input_colour_1_rgb[2];
        for(let index=0;index<output_gradient_count;index++)
        {
            let cur_rgb=[];
            cur_rgb[0]=Math.round(tempr-rdiff);
            cur_rgb[1]=Math.round(tempg-gdiff);
            cur_rgb[2]=Math.round(tempb-bdiff);
            
            for(let index in cur_rgb)
            {
                cur_rgb[index]=cur_rgb[index]>255?255:cur_rgb[index];
                cur_rgb[index]=cur_rgb[index]<0?0:cur_rgb[index];
            }
            tempr=cur_rgb[0];
            tempg=cur_rgb[1];
            tempb=cur_rgb[2];
            res_rgbs.push(rgbToHex(cur_rgb));
            
        }
        console.log("Output")
        console.log(res_rgbs);

    }
    else 
    {
        let rdiff,gdiff,bdiff;
        rdiff=input_colour_2_rgb[0]-input_colour_1_rgb[0];
        gdiff=input_colour_2_rgb[1]-input_colour_1_rgb[1];
        bdiff=input_colour_2_rgb[2]-input_colour_1_rgb[2];
        let tempr=input_colour_1_rgb[0];
        let tempg=input_colour_1_rgb[1];
        let tempb=input_colour_1_rgb[2];
        for(let index=0;index<output_gradient_count;index++)
        {
            let cur_rgb=[];
            cur_rgb[0]=Math.round(tempr+(rdiff/output_gradient_count));
            cur_rgb[1]=Math.round(tempg+(gdiff/output_gradient_count));
            cur_rgb[2]=Math.round(tempb+(bdiff/output_gradient_count));
            
            for(let index in cur_rgb)
            {
                cur_rgb[index]=cur_rgb[index]>255?255:cur_rgb[index];
                cur_rgb[index]=cur_rgb[index]<0?0:cur_rgb[index];
            }
            tempr=cur_rgb[0];
            tempg=cur_rgb[1];
            tempb=cur_rgb[2];
            res_rgbs.push(rgbToHex(cur_rgb));
        }
        console.log("Output")
            console.log(res_rgbs);
    }
let output_section=$("#Output_Section");
output_section.css("display","revert");

let output_table=document.getElementById("output_table");
$(output_table).empty();
let row=output_table.insertRow(-1);
let cell=row.insertCell(-1);
cell.innerHTML="Sl No.";
cell=row.insertCell(-1);
cell.innerHTML="Colour";
cell=row.insertCell(-1);
cell.innerHTML="Colour Code";

//$(output_table).append(tempHtml);
//$("#tableHeaderRow").append("<th></th><th>Colour</th> <th>Colour Code</th>");
//console.log(tempHtml);
for(let index=0;index<output_gradient_count;index++)
    {
    let row=output_table.insertRow(-1);
    let cell1=row.insertCell(-1);
    cell1.innerHTML=index+1;
    
    //let cell2=row.insertCell(-1);
    let tdElement = document.createElement("td");
    let colourViewHtml="<input type='color' value='"+ res_rgbs[index]+"' disabled/>";
    console.log(colourViewHtml);
    $(tdElement).append(colourViewHtml)
    row.appendChild(tdElement);
    
    //cell2.append("<input type='color' value='"+ res_rgbs[index]+"' />");

    let cell3=row.insertCell(-1);
    cell3.innerHTML=res_rgbs[index];

    }
}

$("#colour_picker1_text").on("keypress",function(){
    let colour_picker1_text=$("#colour_picker1_text")[0].value;
    if(colour_picker1_text.length===6 || colour_picker1_text.length===7)
    {
        if(colour_picker1_text.length===6) 
            {
                colour_picker1_text="#"+colour_picker1_text;
                $("#colour_picker1_text")[0].value=colour_picker1_text;
            }
        $("#colour_picker1")[0].value=colour_picker1_text;
    }
});

$("#colour_picker2_text").on("keypress",function(){
    let colour_picker2_text=$("#colour_picker2_text")[0].value;
    if(colour_picker2_text.length===6 || colour_picker2_text.length===7)
    {
        if(colour_picker2_text.length===6) 
            {
                colour_picker2_text="#"+colour_picker2_text;
                $("#colour_picker2_text")[0].value=colour_picker2_text;
            }
        $("#colour_picker2")[0].value=colour_picker2_text;
    }
});

$("#get_gradients_button").on("click",getGradients);