import fs from 'fs';

let textData:string = fs.readFileSync(__dirname + '/data.txt','utf8');
let jsonData: {[key:string]: any} = {};
let Arr:Array<any> = [];
let Arr2:Array<string[]> = [];
try { jsonData = require(__dirname + `/tutorial.json`); } catch (er) {}

Arr = textData.toString().split('\r\n');
Arr.forEach((v,index,array) => {
    Arr2.push(array[index].split(' '));
})
console.log(Arr2);
let scenes = jsonData['minecraft:npc_dialogue'].scenes;
Arr2.forEach((v,index,array)=>{
    let struct = {
        "scene_tag": v[0],
        "npc_name": {"rawtext": [{"translate": "dialog." + v[1]}]},
        "text": {"rawtext": [{"translate": "dialog." + v[0]}]},
        "on_open_commands": [v[2]],
        "on_close_commands": [v[3]],
        "buttons": new Array<Object>()
    }//귀찮
    for (let i=0;i<18;i+=3){
        if (v[4+i]!==undefined) struct.buttons.push({
            "name": {"rawtext": [{"text": v[4+i]}]},
            "commands": [`/dialogue open @e[type=lim:dialogue,name=${v[6+i]}] @initiator ${v[5+i]}`]
        })
    }
    console.log(v);
    scenes.push(struct);
});
jsonData['minecraft:npc_dialogue'].scenes = scenes;
console.log('j');

fs.writeFileSync(__dirname + `/tutorial.json`, JSON.stringify(jsonData,null,2));
fs.writeFileSync(__dirname + `/data.txt`, textData, 'utf-8');
