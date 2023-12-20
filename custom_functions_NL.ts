enum Plastic_NL {
    //% block="blauw plastic"
    Blue,
    //% block="roze plastic"
    Pink,
    //% block="groen plastic"
    Green,
    //% block="geel plastic"
    Yellow
}

enum Plastic_Extra_NL {
    //% block="blauw plastic"
    Blue,
    //% block="roze plastic"
    Pink,
    //% block="groen plastic"
    Green,
    //% block="geel plastic"
    Yellow,
    //% block="bevroren vis"
    Fish_Block
}

//% color=190 weight=100 icon="\uf20a" block="CodeCosmos"
namespace CodeCosmos_NL {
    //% block="plastic laten vallen" weight=100 
    export function dropBlock_Level1() {
        randomBlock_NL = Plastic_NL.Blue
        blocks.place(GOLD_BLOCK, world(2557, 75, 27))
        player.execute("/function drop_block")
        loops.pause(2000)
    }

    //% block="plastic laten vallen" weight=100
    export function dropBlock_Level2() {
        randomBlock_NL = randint(0, 1) ? Plastic_NL.Blue : Plastic_NL.Pink;
        blocks.place(randomBlock_NL === Plastic_NL.Pink ? DIAMOND_BLOCK : GOLD_BLOCK, world(2557, 75, 27))
        player.execute("/function drop_block")
        loops.pause(2000)
    }

    //% block="plastic laten vallen" weight=100
    export function dropBlock_Level3() {
        let block
        switch (randint(0, 3)) {
            case 0: randomBlock_NL = Plastic_NL.Blue; block = GOLD_BLOCK; break;
            case 1: randomBlock_NL = Plastic_NL.Pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock_NL = Plastic_NL.Green; block = IRON_BLOCK; break;
            case 3: randomBlock_NL = Plastic_NL.Yellow; block = REDSTONE_BLOCK; break;
        }
        blocks.place(block, world(2557, 75, 27))
        player.execute("/function drop_block")
        loops.pause(2000)
    }

    //% block="blok laten vallen" weight=100
    export function dropBlock_Extra() {
        fishBlockMoves = 0
        let block
        switch (randint(0, 4)) {
            case 0: randomBlock_Extra_NL = Plastic_Extra_NL.Blue; block = GOLD_BLOCK; break;
            case 1: randomBlock_Extra_NL = Plastic_Extra_NL.Pink; block = DIAMOND_BLOCK; break;
            case 2: randomBlock_Extra_NL = Plastic_Extra_NL.Green; block = IRON_BLOCK; break;
            case 3: randomBlock_Extra_NL = Plastic_Extra_NL.Yellow; block = REDSTONE_BLOCK; break;
            case 4: randomBlock_Extra_NL = Plastic_Extra_NL.Fish_Block; block = LAPIS_LAZULI_BLOCK; break;
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
            loops.pause(50)
            player.execute(`scoreboard players set @a level_timer 0`)
        }

        switch (direction) {
            case FourDirection.Forward: if (randomBlock_NL === Plastic_NL.Green || randomBlock_Extra_NL === Plastic_Extra_NL.Green) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 28), NORTH); break;
            case FourDirection.Back: if (randomBlock_NL === Plastic_NL.Yellow || randomBlock_Extra_NL === Plastic_Extra_NL.Yellow) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2557, 69, 26), SOUTH); break;
            case FourDirection.Left: if (randomBlock_NL === Plastic_NL.Blue || randomBlock_Extra_NL === Plastic_Extra_NL.Blue) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2558, 69, 27), WEST); break;
            case FourDirection.Right: if (randomBlock_NL === Plastic_NL.Pink || randomBlock_Extra_NL === Plastic_Extra_NL.Pink) { player.execute("/scoreboard players add @a correctBlocks 1"); player.execute(`execute @c ~ ~ ~ particle rwm:checkmark ~ ~1 ~`); } else { player.execute(`execute @c ~ ~ ~ particle rwm:barrier ~ ~1 ~`) }; agent.teleport(world(2556, 69, 27), EAST); break;
        }
    }




    //% block="agent verplaats blok $direction met 1" color="#D83B01" weight=100
    export function moveBlock_WithOne(direction: FourDirection) {
        if (fishBlockMoves == 0) {
            switch (direction) {
                case FourDirection.Forward: agent.teleport(world(2557, 69, 28), NORTH); lastDirection = FourDirection.Forward; break;
                case FourDirection.Back: agent.teleport(world(2557, 69, 26), SOUTH); lastDirection = FourDirection.Back; break;
                case FourDirection.Left: agent.teleport(world(2558, 69, 27), WEST); lastDirection = FourDirection.Left; break;
                case FourDirection.Right: agent.teleport(world(2556, 69, 27), EAST); lastDirection = FourDirection.Right; break;
            }
        }

        if (fishBlockMoves > 0 && fishBlockMoves < 20) {
            switch (direction) {
                case FourDirection.Forward:
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/function levels/extra/agent_forward_b")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/function levels/extra/agent_forward_l")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/function levels/extra/agent_forward_r")
                    }

                    player.execute("/function levels/extra/agent_forward");
                    lastDirection = FourDirection.Forward
                    break;

                case FourDirection.Back:
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/function levels/extra/agent_back_f")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/function levels/extra/agent_back_l")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/function levels/extra/agent_back_r")
                    }

                    player.execute("/function levels/extra/agent_back");
                    lastDirection = FourDirection.Back
                    break;

                case FourDirection.Left:
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/function levels/extra/agent_left_f")
                    }
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/function levels/extra/agent_left_b")
                    }
                    if (lastDirection == FourDirection.Right) {
                        player.execute("/function levels/extra/agent_left_r")
                    }

                    player.execute("/function levels/extra/agent_left");
                    lastDirection = FourDirection.Left
                    break;

                case FourDirection.Right:
                    if (lastDirection == FourDirection.Forward) {
                        player.execute("/function levels/extra/agent_right_f")
                    }
                    if (lastDirection == FourDirection.Back) {
                        player.execute("/function levels/extra/agent_right_b")
                    }
                    if (lastDirection == FourDirection.Left) {
                        player.execute("/function levels/extra/agent_right_l")
                    }

                    player.execute("/function levels/extra/agent_right");
                    lastDirection = FourDirection.Right
                    break;

            }
        }

        player.execute("/function levels/extra/agent_clone_and_move")
        fishBlockMoves++
        player.execute(`scoreboard players set @a level_timer 0`)

        loops.pause(50)

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
    export function detectBlock(block: Plastic_NL = null) {
        return randomBlock_NL === block;
    }

    //% block="detecteer $block"
    export function detectBlock_Extra(block: Plastic_Extra_NL = null) {
        return randomBlock_Extra_NL === block;
    }
}