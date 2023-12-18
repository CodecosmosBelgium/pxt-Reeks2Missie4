enum Plastic {
    //% block="blue plastic"
    Blue,
    //% block="pink plastic"
    Pink,
    //% block="yellow plastic"
    Yellow,
    //% block="green plastic"
    Green
}

enum Plastic_Extra {
    //% block="blue plastic"
    Blue,
    //% block="pink plastic"
    Pink,
    //% block="yellow plastic"
    Yellow,
    //% block="green plastic"
    Green,
    //% block="frozen fish"
    Fish_Block
}

//% color=190 weight=100 icon="\uf20a" block="CodeCosmos"
namespace CodeCosmos {
    //% block="drop plastic" weight=100 
    export function dropBlock_Level1() {
        randomBlock = Plastic.Blue
        blocks.place(GOLD_BLOCK, world(2557, 75, 27))
        player.execute("/function drop_block")
        loops.pause(2000)
    }

    //% block="drop plastic" weight=100
    export function dropBlock_Level2() {
        randomBlock = randint(0, 1) ? Plastic.Blue : Plastic.Pink;
        blocks.place(randomBlock === Plastic.Pink ? DIAMOND_BLOCK : GOLD_BLOCK, world(2557, 75, 27))
        player.execute("/function drop_block")
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
        player.execute("/function drop_block")
        loops.pause(2000)
    }

    //% block="drop block" weight=100
    export function dropBlock_Extra() {
        fishBlockMoves = 0
        let block
        switch (randint(0, 4)) {
            case 0: randomBlock_Extra = Plastic_Extra.Blue; block = GOLD_BLOCK; break;
            case 1: randomBlock_Extra = Plastic_Extra.Pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock_Extra = Plastic_Extra.Green; block = IRON_BLOCK; break;
            case 3: randomBlock_Extra = Plastic_Extra.Yellow; block = REDSTONE_BLOCK; break;
            case 4: randomBlock_Extra = Plastic_Extra.Fish_Block; block = LAPIS_LAZULI_BLOCK; break;
        }
        blocks.place(block, world(2557, 75, 27))
        player.execute("/function drop_block")
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
            player.execute(`scoreboard players set @a level_timer 0`)
        }

        switch (direction) {
            case FourDirection.Forward: if (randomBlock === Plastic.Green) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 28), NORTH); break;
            case FourDirection.Back: if (randomBlock === Plastic.Yellow) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 26), SOUTH); break;
            case FourDirection.Left: if (randomBlock === Plastic.Blue) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2558, 69, 27), WEST); break;
            case FourDirection.Right: if (randomBlock === Plastic.Pink) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2556, 69, 27), EAST); break;
        }
    }


    

    //% block="agent verplaats blok $direction met 1" color="#D83B01" weight=100
    export function moveBlock_WithOne(direction: FourDirection) {
        if (fishBlockMoves == 0) {
            switch (direction) {
                case FourDirection.Forward: agent.teleport(world(2557, 69, 28), NORTH); lastDirection = FourDirection.Forward; break;
                case FourDirection.Back: agent.teleport(world(2557, 69, 26), SOUTH); lastDirection = FourDirection.Back ; break;
                case FourDirection.Left: agent.teleport(world(2558, 69, 27), WEST); lastDirection = FourDirection.Left ; break;
                case FourDirection.Right: agent.teleport(world(2556, 69, 27), EAST); lastDirection = FourDirection.Right ; break;
            }
        }

        if (fishBlockMoves > 0 && fishBlockMoves < 20) {
            switch (direction) {
                case FourDirection.Forward: 
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/execute as @s at @v run tp @v ^^^2")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/execute as @s at @v run tp @v ~-1 ~ ~1")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/execute as @s at @v run tp @v ~1 ~ ~1")
                    }
                    
                    player.execute("/execute as @s at @v run tp @v ~ ~ ~ facing ~ ~ ~-1");
                    lastDirection = FourDirection.Forward
                    break;

                case FourDirection.Back: 
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/execute as @s at @v run tp @v ^^^2")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/execute as @s at @v run tp @v ~-1 ~ ~-1")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/execute as @s at @v run tp @v ~1 ~ ~-1")
                    }

                    player.execute("/execute as @s at @v run tp @v ~ ~ ~ facing ~ ~ ~1");
                    lastDirection = FourDirection.Back
                    break;

                case FourDirection.Left: 
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/execute as @s at @v run tp @v ~1 ~ ~-1")
                    }
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/execute as @s at @v run tp @v ~1 ~ ~1")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/execute as @s at @v run tp @v ^^^2")
                    }

                    player.execute("/execute as @s at @v run tp @v ~ ~ ~ facing ~-1 ~ ~");
                    lastDirection = FourDirection.Left
                    break;

                case FourDirection.Right: 
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/execute as @s at @v run tp @v ~-1 ~ ~-1")
                    }
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/execute as @s at @v run tp @v ~-1 ~ ~1")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/execute as @s at @v run tp @v ^^^2")
                    }
                    
                    player.execute("/execute as @s at @v run tp @v ~ ~ ~ facing ~1 ~ ~");
                    lastDirection = FourDirection.Right
                    break;

            }
        }
        
        player.execute("/execute as @s at @v run clone ^^^1 ^^^1 ^^^2 replace move")
        player.execute("/execute as @s at @v run tp @v ^^^1")
        fishBlockMoves++
        player.execute(`scoreboard players set @a level_timer 0`)

        if (fishBlockMoves == 20 && blocks.testForBlock(LAPIS_LAZULI_BLOCK, world(2547, 69, 17))) {
            player.execute("/scoreboard players add @a correctBlocks 1")
            player.execute("/execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~")
            agent.teleport(world(2557, 69, 28), NORTH);
        } else if (fishBlockMoves == 20 && !blocks.testForBlock(LAPIS_LAZULI_BLOCK, world(2547, 69, 17))) {
            player.execute("/execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~")
            player.execute("/fill 2540 69 0 2575 69 50 air replace lapis_block")
            agent.teleport(world(2557, 69, 28), NORTH);
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