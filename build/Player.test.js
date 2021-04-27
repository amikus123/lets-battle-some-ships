import Player from "./Player";


const human = new Player(false)
const computer = new Player(true)
test("checking setting enemies",()=>{
    console.log(human)
    expect(human.enemy).toBe(null)
    expect(computer.enemy).toBe(null)

    human.setEnemy(computer);
    computer.setEnemy(human);
    expect(human.enemy).toBe(computer)
    expect(computer.enemy).toBe(human)

})

