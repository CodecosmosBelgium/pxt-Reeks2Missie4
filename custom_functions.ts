enum Plastic {
    //% block="blue plastic"
    Blue,
    //% block="pink plastic"
    Pink,
    //% block="green plastic"
    Green,
    //% block="yellow plastic"
    Yellow
}

enum Plastic_Extra {
    //% block="blue plastic"
    Blue,
    //% block="pink plastic"
    Pink,
    //% block="green plastic"
    Green,
    //% block="yellow plastic"
    Yellow,
    //% block="frozen fish"
    Fish_Block
}

enum FiveDirection{
    //% block="forward"
    Forward,
    //% block="back"
    Back,
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="diagonal"
    Diagonal
}

//% color=190 weight=100 icon="\uf20a" block="CodeCosmos"
namespace CodeCosmos {
    //% block="drop plastic" weight=100 
    export function dropBlock_Level1() {
        randomBlock = Plastic.Blue
        blocks.place(GOLD_BLOCK, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }
    
    //% block="drop plastic" weight=100
    export function dropBlock_Level2() {
        randomBlock = randint(0, 1) ? Plastic.Blue : Plastic.Pink;
        blocks.place(randomBlock === Plastic.Pink ? DIAMOND_BLOCK : GOLD_BLOCK, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="drop plastic" weight=100
    export function dropBlock_Level3() {
        let block
        switch (randint(0, 3)) {
            case 0: randomBlock = Plastic.Blue; block = GOLD_BLOCK; break;
            case 1: randomBlock = Plastic.Pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock = Plastic.Green; block = IRON_BLOCK; break;
            case 3: randomBlock = Plastic.Yellow; block = REDSTONE_BLOCK; break;
        }
        blocks.place(block, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="drop plastic" weight=100
    export function dropBlock_Extra() {
        let block
        switch (randint(0, 4)) {
            case 0: randomBlock_Extra = Plastic_Extra.Blue; block = GOLD_BLOCK; break;
            case 1: randomBlock_Extra = Plastic_Extra.Pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock_Extra = Plastic_Extra.Green; block = IRON_BLOCK; break;
            case 3: randomBlock_Extra = Plastic_Extra.Yellow; block = REDSTONE_BLOCK; break;
            case 4: randomBlock_Extra = Plastic_Extra.Fish_Block; block = LAPIS_LAZULI_BLOCK; break;
        }
        blocks.place(block, world(2557, 75, 27))
        player.execute(
            "/function drop_block"
        )
        loops.pause(2000)
    }

    //% block="agent verplaats blok $direction" color="#D83B01" weight=100
    export function moveBlock(direction: FourDirection) {
        switch (direction) {
            case FourDirection.Forward: agent.teleport(world(2557, 69, 28), NORTH); break;
            case FourDirection.Back: agent.teleport(world(2557, 69, 26), SOUTH); break;
            case FourDirection.Left: agent.teleport(world(2558, 69, 27), WEST); break;
            case FourDirection.Right: agent.teleport(world(2556, 69, 27), EAST); break;
        }

        for (let i = 0; i < 12; i++) {
            let clonePosition
            let destination
            switch (direction) {
                case FourDirection.Forward: clonePosition = world(2557, 69, 27 - i); destination = world(2557, 69, 27 - i - 1); break;
                case FourDirection.Back: clonePosition = world(2557, 69, 27 + i); destination = world(2557, 69, 27 + i + 1); break;
                case FourDirection.Left: clonePosition = world(2557 - i, 69, 27); destination = world(2557 - i - 1, 69, 27); break;
                case FourDirection.Right: clonePosition = world(2557 + i, 69, 27); destination = world(2557 + i + 1, 69, 27); break;
            }
            blocks.clone(
                clonePosition,
                clonePosition,
                destination,
                CloneMask.Replace,
                CloneMode.Move
            )
            agent.move(FORWARD, 1)
            loops.pause(250)
        }

        switch (direction) {
            case FourDirection.Forward: if (randomBlock === Plastic.Green) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 28), NORTH); break;
            case FourDirection.Left: if (randomBlock === Plastic.Blue) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 26), SOUTH); break;
            case FourDirection.Right: if (randomBlock === Plastic.Pink) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2558, 69, 27), WEST); break;
            case FourDirection.Back: if (randomBlock === Plastic.Yellow) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2556, 69, 27), EAST); break;
        }
    }

    function moveSide_Extra(direction: FiveDirection){
        for (let i = 0; i < 12; i++) {
            let clonePosition
            let destination
            switch (direction) {
                case FiveDirection.Forward: clonePosition = world(2557, 69, 27 - i); destination = world(2557, 69, 27 - i - 1); break;
                case FiveDirection.Back: clonePosition = world(2557, 69, 27 + i); destination = world(2557, 69, 27 + i + 1); break;
                case FiveDirection.Left: clonePosition = world(2557 - i, 69, 27); destination = world(2557 - i - 1, 69, 27); break;
                case FiveDirection.Right: clonePosition = world(2557 + i, 69, 27); destination = world(2557 + i + 1, 69, 27); break;
            }
            blocks.clone(
                clonePosition,
                clonePosition,
                destination,
                CloneMask.Replace,
                CloneMode.Move
            )
            agent.move(FORWARD, 1)
            loops.pause(250)
        }
    }

    function moveDiagonal_Extra(direction: FiveDirection) {
        let clonePosition
        let destination
        let x_from = 2557
        let z_from = 27
        let x_destination= 2557
        let z_destination= 27
        for (let i = 0; i < 20; i++) {
            switch (i%2) {
                case 0: z_destination--; break;
                case 1: x_destination--; break;
            }
            clonePosition = world(x_from, 69, z_from); 
            destination = world(x_destination, 69, z_destination); break;
            
            blocks.clone(
                clonePosition,
                clonePosition,
                destination,
                CloneMask.Replace,
                CloneMode.Move
            )
            agent.move(FORWARD,1);
            switch (i % 2) {
                case 0: agent.turn(TurnDirection.Right); break;
                case 1: agent.turn(TurnDirection.Left); break;
            }
            
            loops.pause(250)
        }
    }


    //% block="agent verplaats blok $direction" color="#D83B01" weight=100
    export function moveBlock_Extra(direction: FiveDirection) {
        switch (direction) {
            case FiveDirection.Forward: agent.teleport(world(2557, 69, 28), NORTH); moveSide_Extra(direction); if (randomBlock_Extra === Plastic_Extra.Green) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 28), NORTH); break;
            case FiveDirection.Back: agent.teleport(world(2557, 69, 26), SOUTH); moveSide_Extra(direction); if (randomBlock_Extra === Plastic_Extra.Blue) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 26), SOUTH); break;
            case FiveDirection.Left: agent.teleport(world(2558, 69, 27), WEST); moveSide_Extra(direction); if (randomBlock_Extra === Plastic_Extra.Pink) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2558, 69, 27), WEST); break;
            case FiveDirection.Right: agent.teleport(world(2556, 69, 27), EAST); moveSide_Extra(direction); if (randomBlock_Extra === Plastic_Extra.Yellow) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2556, 69, 27), EAST); break;
            case FiveDirection.Diagonal: agent.teleport(world(2558, 69, 27), WEST); moveDiagonal_Extra(direction); if (randomBlock_Extra === Plastic_Extra.Fish_Block) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`)}; agent.teleport(world(2558, 69, 27), WEST); break;
        }
    }


    //% block="detecteer $block"
    export function detectBlock(block: Plastic = null) {
        return randomBlock === block;
    }

    //% block="detecteer $block"
    export function detectBlock_Extra(block: Plastic_Extra = null) {
        return randomBlock_Extra === block;
    }
}