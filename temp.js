let x = [1,2,3,4,5]
let randomIndex 

for(let i=1;i<100;i++){
  
randomIndex = Math.floor(Math.random() * x.length) + 1;
console.log(randomIndex,i)
}